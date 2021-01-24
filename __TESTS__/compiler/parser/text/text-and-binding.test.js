const Parser = require('../../../../src/compiler/parser/text.js')

test('[TEXT AND BINDING] Tokenize text before binding', () => {
  const text = 'hello { name }'
  const expectedText = { type: 'text', value: 'hello ', where: 0 }
  const expectedBinding = { type: 'binding', value: 'name', where: 6, ended: true }

  const GenericParser = new Parser(text)
  GenericParser.parse()

  expect(GenericParser.binding).toBe(false)
  expect(GenericParser.cursor).toBe(14)
  expect(GenericParser.lexemes.length).toBe(2)
  expect(GenericParser.lexemes[0]).toEqual(expectedText)
  expect(GenericParser.lexemes[1]).toEqual(expectedBinding)
})

test('[TEXT AND BINDING] Tokenize text after binding', () => {
  const text = '{ points } points'
  const expectedBinding = { type: 'binding', value: 'points', where: 0, ended: true }
  const expectedText = { type: 'text', value: ' points', where: 10 }

  const GenericParser = new Parser(text)
  GenericParser.parse()

  expect(GenericParser.binding).toBe(false)
  expect(GenericParser.cursor).toBe(17)
  expect(GenericParser.lexemes.length).toBe(2)
  expect(GenericParser.lexemes[0]).toEqual(expectedBinding)
  expect(GenericParser.lexemes[1]).toEqual(expectedText)
})

test('[TEXT AND BINDING] Tokenize text before and after binding', () => {
  const text = 'Welcome back, { name }!'
  const expectedText0 = { type: 'text', value: 'Welcome back, ', where: 0 }
  const expectedBinding = { type: 'binding', value: 'name', where: 14, ended: true }
  const expectedText1 = { type: 'text', value: '!', where: 22 }

  const GenericParser = new Parser(text)
  GenericParser.parse()

  expect(GenericParser.binding).toBe(false)
  expect(GenericParser.cursor).toBe(23)
  expect(GenericParser.lexemes.length).toBe(3)
  expect(GenericParser.lexemes[0]).toEqual(expectedText0)
  expect(GenericParser.lexemes[1]).toEqual(expectedBinding)
  expect(GenericParser.lexemes[2]).toEqual(expectedText1)
})
