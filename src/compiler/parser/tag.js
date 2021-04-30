const { assert, isTagCloser, isTagName, isValidName } = require('../../utils/index.js')
const Parser = require('./parser.js')

class TagParser extends Parser {
  constructor(code, index) {
    super(code, index)

    this.name = ''
    this.parameters = {}

    this.insideParameters = false
    this.insideParametersAt = -1

    this.parameterValueStarted = false
    this.parameterValueStartedAt = -1

    this.startedClosing = false
    this.startedClosingAt = -1

    this.currentParameter = ''

    this.selfClosing = false
    this.closing = false
  }

  parse() {
    this.skipWhiteSpaces()

    assert(this.current === '<', 'Tag not started')

    let initialCursor = this.cursor
    this.started = true
    this.contentStarted = true

    while (this.current) {
      this.current = this.next()

      if (!this.current) {
        break
      }

      if (!this.contentStarted && !this.insideParameters && this.current.match(/[a-zA-Z]/) && !isTagCloser(this.current)) {
        this.insideParameters = true
        this.insideParametersAt = this.cursor - 1
      }

      assert(this.current !== '<', 'Tag already started')

      if (this.contentStarted && !this.insideParameters) {
        if (isValidName(this.current, this.name)) {
          this.name += this.current
          continue
        }
        this.contentStarted = false
        assert(isTagName(this.name), 'Invalid tag name')
      }

      if (this.insideParameters) {
        if (isValidName(this.current, this.currentParameter) && !this.parameterValueStarted) {
          this.currentParameter += this.current
          continue
        }

        if (this.current === "=" && !this.parameterValueStarted) {
          this.parameterValueStarted = true
          this.parameterValueStartedAt = this.cursor

          if (this.parameters[this.currentParameter]) this.parameters[this.currentParameter] = ''
          continue
        }

        if (!this.parameters[this.currentParameter] && this.currentParameter) this.parameters[this.currentParameter] = ''
      
        if (this.parameterValueStarted && this.parameterValueStartedAt) {
          if (this.current !== "\"") this.parameters[this.currentParameter] += this.current
          if (this.current === "\"" && this.parameterValueStartedAt < this.cursor -1) {
            this.parameterValueStarted = false
            this.parameterValueStartedAt = -1
            this.currentParameter = ''
            continue
          }
        }
        continue
      }

      if (this.current === '/') {
        assert(this.startedClosing === false, 'Invalid syntax')

        this.startedClosing = true
        this.startedClosingAt = this.cursor

        this.closing = initialCursor === this.cursor - 1

        assert(isTagName(this.name), 'Invalid tag name')
        continue
      }
      if (this.current === '>') {
        assert(isTagName(this.name), 'Invalid tag name')

        if (this.startedClosing && !this.closing) {
          assert(this.startedClosingAt === this.cursor - 1, 'Tag not closed properly')
          this.selfClosing = true
        }
        break
      }
    }
    assert(!this.currentParameter.length, 'Parameter not closed properly')
  }
}

module.exports = TagParser
