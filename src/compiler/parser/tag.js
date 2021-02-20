const { assert, isTagCloser, isTagName } = require('../../utils/index.js')
const Parser = require('./parser.js')

class TagParser extends Parser {
  constructor(code, index) {
    super(code, index)

    this.name = ''
    this.parameters = {}

    this.insideParameters = false
    this.insideParametersAt = -1

    this.startedClosing = false
    this.startedClosingAt = -1

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

      if (!this.contentStarted && !this.insideParameters && this.current.match(/[a-zA-Z]/) && !isTagCloser(next)) {
        this.insideParameters = true
        this.insideParametersAt = this.cursor - 1
      }

      assert(this.current !== '<', 'Tag already started')

      if (this.current === '/') {
        this.startedClosing = true
        this.startedClosingAt = this.cursor
      }
      if (this.current === '>') {
        if (this.startedClosing) {
          assert(this.startedClosingAt === this.cursor - 1, 'Tag not closed properly')
          this.selfClosing = true
          this.startedClosing = false
          this.startedClosingAt = -1
        }
      }

      if (this.contentStarted) {
        const currentIsValid = this.current.match(/[a-zA-Z]/)
        const nameIsValid = this.name.length >= 1 && this.current === '-'

        if (currentIsValid || nameIsValid) {
          this.name += this.current
          continue
        }
        this.contentStarted = false
        assert(isTagName(this.name), 'Invalid tag name')
      }
      else if (this.insideParameters) {}
      else {}
      // parse with name and no parameters
      // parse / with name and no parameters
      // parse tag name with parameters
    }
  }
}

module.exports = TagParser
