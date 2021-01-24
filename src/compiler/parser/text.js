const { parse } = require('acorn')
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
      if (this.current === '{') {
        assert(!this.binding, 'Sorry, bindings can only occur once')

        this.binding = true
        this.bindingStartedAt = this.cursor

        this.lexemes.push({ type: 'binding', value: '', where: this.cursor })
      }
      if (this.current === '}') {
        if (!this.binding) return

        const bindingAST = parse(this.lexemes[this.lexemes.length - 1].value, {
          sourceType: 'module',
        })

        // console.log(bindingAST);

        assert(bindingAST.body.length > 0, 'Please, provide a value to bind')
        assert(bindingAST.body.length >= 1, 'Sorry, start another binding for multiple values')
        assert(bindingAST.body[0].type === 'ExpressionStatement', 'Sorry, bindings can only be for variables')
        assert(bindingAST.body[0].expression.type === 'Identifier', 'Sorry, bindings can only be for variables')

        this.lexemes[this.lexemes.length - 1].value = bindingAST.body[0].expression.name

        this.binding = false
        this.bindingStartedAt = -1
      }

      this.current = this.next()
    }
  }
}

module.exports = TextParser
