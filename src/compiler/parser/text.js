const { assert, isIgnorable } = require('../../utils/index.js')
const Parser = require('./parser.js')

class TextParser extends Parser {
  constructor(code, index) {
    super(code, index)

    this.binding = false
    this.bindingStartedAt = -1
  }

  parse() {
    this.started = true
    this.contentStarted = true
    this.current = this.code[this.cursor]

    while (true) {
      if (!this.binding) {
        this.skipWhiteSpaces()
      }

      if (!this.current) {
        if (!this.contentStarted) break

        assert(!this.binding, 'Binding not ended')
        break
      }

      if (isIgnorable(this.current)) {
        this.skipWhiteSpaces()
      }

      if (this.current === '<') { }
      if (this.binding && this.current !== '}') {}
      if (this.current !== '{' && this.current !== '}') {
        const lastToken = this.getLastToken()
        const hasWhiteSpaceToInsert = lastToken && lastToken.where === this.cursor - 1
        const configuredValue = hasWhiteSpaceToInsert ? ` ${this.current}` : this.current
        const configuredWhere = hasWhiteSpaceToInsert ? this.cursor - 1 : this.cursor

        if (!this.lexemes.length) {
          this.lexemes.push({ type: 'text', value: configuredValue, where: configuredWhere })
        } else {
          this.lexemes[this.lexemes.length - 1].value += configuredValue
        }
      }
      if (this.current === '{') {}
      if (this.current === '}') {}

      this.current = this.next()
    }
  }
}

module.exports = TextParser
