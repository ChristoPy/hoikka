const Parser = require('../../../../src/compiler/parser/text.js')

test('[BINDING] Tokenize binding with one word binding', () => {
  const text = '{binding}'
  const expected = { type: 'binding', value: 'binding', where: 0 }

  const GenericParser = new Parser(text)
  GenericParser.parse()

  expect(GenericParser.binding).toBe(false)
  expect(GenericParser.cursor).toBe(9)
  expect(GenericParser.lexemes.length).toBe(1)
  expect(GenericParser.lexemes[0]).toEqual(expected)
})

test('[BINDING] Tokenize binding with one word binding and spaces', () => {
  const text = '{ binding }'
  const expected = { type: 'binding', value: 'binding', where: 0 }

  const GenericParser = new Parser(text)
  GenericParser.parse()

  expect(GenericParser.binding).toBe(false)
  expect(GenericParser.cursor).toBe(11)
  expect(GenericParser.lexemes.length).toBe(1)
  expect(GenericParser.lexemes[0]).toEqual(expected)
})

test('[WRONG BINDING] Raise exception for no expressions', () => {
  const text = '{ }'
  const GenericParser = new Parser(text)

  const parse = () => {
    GenericParser.parse()
  }

  expect(parse).toThrow('Please, provide a value to bind')
})

test('[WRONG BINDING] Raise exception for any other expression type', () => {
  const text = '{ binding.getContext() }'
  const GenericParser = new Parser(text)

  const parse = () => {
    GenericParser.parse()
  }

  expect(parse).toThrow('Sorry, bindings can only be for variables')
})

test('[WRONG BINDING] Raise exception for a wrong expression', () => {
  const text = '{ document. }'
  const GenericParser = new Parser(text)

  const parse = () => {
    GenericParser.parse()
  }

  expect(parse).toThrow(/Unexpected token/)
})
