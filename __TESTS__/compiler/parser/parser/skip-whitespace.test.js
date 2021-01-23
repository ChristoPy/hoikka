const Parser = require('../../../../src/compiler/parser/parser.js')

test('[WHITE SPACE] Tokenize first white space', () => {
  const text = ' '
  const expected = { type: 'text', value: ' ', where: 0 }

  const GenericParser = new Parser(text)
  GenericParser.skipWhiteSpaces()

  expect(GenericParser.tokens.length).toBe(1)
  expect(GenericParser.cursor).toBe(1)
  expect(GenericParser.tokens[0]).toEqual(expected)
})

test('[WHITE SPACE] Tokenize last subsequent white space', () => {
  const text = '   '
  const expected = { type: 'text', value: ' ', where: 0 }

  const GenericParser = new Parser(text)
  GenericParser.skipWhiteSpaces()

  expect(GenericParser.tokens.length).toBe(1)
  expect(GenericParser.cursor).toBe(3)
  expect(GenericParser.tokens[0]).toEqual(expected)
})

test('[TAB] Skip tab', () => {
  const text = '\t'

  const GenericParser = new Parser(text)
  GenericParser.skipWhiteSpaces()

  expect(GenericParser.tokens.length).toBe(0)
  expect(GenericParser.cursor).toBe(1)
})

test('[TAB] Skip multiple tabs', () => {
  const text = '\t\t'

  const GenericParser = new Parser(text)
  GenericParser.skipWhiteSpaces()

  expect(GenericParser.tokens.length).toBe(0)
  expect(GenericParser.cursor).toBe(2)
})

test('[NEW LINE] Skip new line', () => {
  const text = '\n'

  const GenericParser = new Parser(text)
  GenericParser.skipWhiteSpaces()

  expect(GenericParser.tokens.length).toBe(0)
  expect(GenericParser.cursor).toBe(1)
})

test('[NEW LINE] Skip multiple new lines', () => {
  const text = '\n\n'

  const GenericParser = new Parser(text)
  GenericParser.skipWhiteSpaces()

  expect(GenericParser.tokens.length).toBe(0)
  expect(GenericParser.cursor).toBe(2)
})

test('[WHITE SPACE AND TAB] Tokenize first white space and skip tab', () => {
  const text = ' \t'
  const expected = { type: 'text', value: ' ', where: 0 }

  const GenericParser = new Parser(text)
  GenericParser.skipWhiteSpaces()

  expect(GenericParser.tokens.length).toBe(1)
  expect(GenericParser.cursor).toBe(2)
  expect(GenericParser.tokens[0]).toEqual(expected)
})

test('[WHITE SPACE AND TAB] Tokenize first subsequent white space and skip tab', () => {
  const text = '  \t'
  const expected = { type: 'text', value: ' ', where: 0 }

  const GenericParser = new Parser(text)
  GenericParser.skipWhiteSpaces()

  expect(GenericParser.tokens.length).toBe(1)
  expect(GenericParser.cursor).toBe(3)
  expect(GenericParser.tokens[0]).toEqual(expected)
})

test('[WHITE SPACE AND NEW LINE] Get first white space and skip new line', () => {
  const text = ' \n'
  const expected = { type: 'text', value: ' ', where: 0 }

  const GenericParser = new Parser(text)
  GenericParser.skipWhiteSpaces()

  expect(GenericParser.tokens.length).toBe(1)
  expect(GenericParser.cursor).toBe(2)
  expect(GenericParser.tokens[0]).toEqual(expected)
})

test('[WHITE SPACE AND NEW LINE] Tokenize first subsequent white space and skip new line', () => {
  const text = '  \n'
  const expected = { type: 'text', value: ' ', where: 0 }

  const GenericParser = new Parser(text)
  GenericParser.skipWhiteSpaces()

  expect(GenericParser.tokens.length).toBe(1)
  expect(GenericParser.cursor).toBe(3)
  expect(GenericParser.tokens[0]).toEqual(expected)
})

test('[WHITE SPACE BETWEEN TABS] Tokenize white space between tabs', () => {
  const text = ' \t \t'
  const expectedFirstToken = { type: 'text', value: ' ', where: 0 }
  const expectedSecondToken = { type: 'text', value: ' ', where: 2 }

  const GenericParser = new Parser(text)
  GenericParser.skipWhiteSpaces()

  expect(GenericParser.tokens.length).toBe(2)
  expect(GenericParser.cursor).toBe(4)
  expect(GenericParser.tokens[0]).toEqual(expectedFirstToken)
  expect(GenericParser.tokens[1]).toEqual(expectedSecondToken)
})

test('[WHITE SPACE BETWEEN NEW LINES] Tokenize white space between new lines', () => {
  const text = ' \n \n'
  const expectedFirstToken = { type: 'text', value: ' ', where: 0 }
  const expectedSecondToken = { type: 'text', value: ' ', where: 2 }

  const GenericParser = new Parser(text)
  GenericParser.skipWhiteSpaces()

  expect(GenericParser.tokens.length).toBe(2)
  expect(GenericParser.cursor).toBe(4)
  expect(GenericParser.tokens[0]).toEqual(expectedFirstToken)
  expect(GenericParser.tokens[1]).toEqual(expectedSecondToken)
})

test('[MIXED] Tokenize white space between new line and tab', () => {
  const text = ' \n \t'
  const expectedFirstToken = { type: 'text', value: ' ', where: 0 }
  const expectedSecondToken = { type: 'text', value: ' ', where: 2 }

  const GenericParser = new Parser(text)
  GenericParser.skipWhiteSpaces()

  expect(GenericParser.tokens.length).toBe(2)
  expect(GenericParser.cursor).toBe(4)
  expect(GenericParser.tokens[0]).toEqual(expectedFirstToken)
  expect(GenericParser.tokens[1]).toEqual(expectedSecondToken)
})
