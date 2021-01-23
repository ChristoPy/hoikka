const Parser = require('../../../../src/compiler/parser/text.js')

test('[WORD] Tokenize text with one word', () => {
  const text = 'text'
  const expected = { type: 'text', value: 'text', where: 0 }

  const GenericParser = new Parser(text)
  GenericParser.parse()

  expect(GenericParser.binding).toBe(false)
  expect(GenericParser.cursor).toBe(4)
  expect(GenericParser.lexemes.length).toBe(1)
  expect(GenericParser.lexemes[0]).toEqual(expected)
})

test('[WHITE SPACE] Tokenize text with white spaces in between words', () => {
  const text = 'sample text ok?'
  const expected = { type: 'text', value: 'sample text ok?', where: 0 }

  const GenericParser = new Parser(text)
  GenericParser.parse()

  expect(GenericParser.binding).toBe(false)
  expect(GenericParser.cursor).toBe(15)
  expect(GenericParser.lexemes.length).toBe(1)
  expect(GenericParser.lexemes[0]).toEqual(expected)
})

test('[WHITE SPACE] Tokenize text with multiple white spaces in between words', () => {
  const text = ' sample  text     ok?  '
  const expected = { type: 'text', value: ' sample text ok? ', where: 0 }

  const GenericParser = new Parser(text)
  GenericParser.parse()

  expect(GenericParser.binding).toBe(false)
  expect(GenericParser.cursor).toBe(23)
  expect(GenericParser.lexemes.length).toBe(1)
  expect(GenericParser.lexemes[0]).toEqual(expected)
})

test('[MIXED] Tokenize text with multiple white spaces, tabs and new lines in between words', () => {
  const text = '\nsample  \ntext  \t\t\t    \n   \tok?  \t'
  const expected = { type: 'text', value: 'sample text ok? ', where: 1 }

  const GenericParser = new Parser(text)
  GenericParser.parse()

  expect(GenericParser.binding).toBe(false)
  expect(GenericParser.cursor).toBe(34)
  expect(GenericParser.lexemes.length).toBe(1)
  expect(GenericParser.lexemes[0]).toEqual(expected)
})
