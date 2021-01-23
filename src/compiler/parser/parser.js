const { assert, isIgnorable, isCodeFormat, isWhiteSpace } = require('../../utils')
const token = require('../token')

class Parser {
  constructor(code, index = 0) {
    this.code = code.substring(index, code.length)

    this.started = false
    this.contentStarted = false
    this.cursor = 0

    this.last = null
    this.current = null
    this.tokens = []
    this.lexemes = []
  }

  next() {
    assert(this.cursor < this.code.length, 'EOF')
    this.cursor += 1
    return this.code[this.cursor]
  }

  skipWhiteSpaces() {
    this.current = this.code[this.cursor]

    if (isWhiteSpace(this.current) && this.cursor > 0 && !isIgnorable(this.code[this.cursor - 1])) {
      return
    }

    while(isIgnorable(this.current)) {
      if (isWhiteSpace(this.current)) {
        const lastToken = this.getLastToken()
        const lastTokenIsWhiteSpace = lastToken && isWhiteSpace(lastToken.value)
        const lastTokenIsSubsequent = lastToken ? lastTokenIsWhiteSpace && lastToken.where === this.cursor - 1 : null
        const lastCharacterIsWhiteSpace = this.cursor > 0 && isWhiteSpace(this.code[this.cursor - 1])

        if (!lastTokenIsSubsequent && !lastCharacterIsWhiteSpace) {
          this.tokens.push(token(this.current, this.cursor))
        }
      }
      this.last = this.current
      this.current = this.next()
    }
  }

  getLastToken() {
    if (this.tokens.length) {
      return this.tokens[this.tokens.length - 1]
    }
  }
}

module.exports = Parser
