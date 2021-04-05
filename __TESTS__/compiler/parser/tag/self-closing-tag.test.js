const Parser = require('../../../../src/compiler/parser/tag.js')

test('[SELF-CLOSING] Parse a self closing tag', () => {
  const text = '<test/>'

  const GenericParser = new Parser(text)
  GenericParser.parse()

  expect(GenericParser.name).toBe('test')
  expect(GenericParser.cursor).toBe(6)
  expect(GenericParser.tokens.length).toBe(0)
  expect(GenericParser.lexemes.length).toBe(0)
  expect(GenericParser.parameters).toStrictEqual({})
  expect(GenericParser.closing).toBe(false)
  expect(GenericParser.selfClosing).toBe(true)
})

test('[SPACES] Parse a self closing tag with spaces before the tag ends', () => {
  const text = '<test    />'

  const GenericParser = new Parser(text)
  GenericParser.parse()

  expect(GenericParser.name).toBe('test')
  expect(GenericParser.cursor).toBe(10)
  expect(GenericParser.tokens.length).toBe(0)
  expect(GenericParser.lexemes.length).toBe(0)
  expect(GenericParser.parameters).toStrictEqual({})
  expect(GenericParser.closing).toBe(false)
  expect(GenericParser.selfClosing).toBe(true)
})

test('[DASHED] Parse a self closing tag with dashed name', () => {
  const text = '<test-tag/>'

  const GenericParser = new Parser(text)
  GenericParser.parse()

  expect(GenericParser.name).toBe('test-tag')
  expect(GenericParser.cursor).toBe(10)
  expect(GenericParser.tokens.length).toBe(0)
  expect(GenericParser.lexemes.length).toBe(0)
  expect(GenericParser.parameters).toStrictEqual({})
  expect(GenericParser.closing).toBe(false)
  expect(GenericParser.selfClosing).toBe(true)
})

test('[WRONG DASHED] Parse and prevent closing a tag with a wrong dashed name', () => {
  const text = '<test-tag-/>'
  const GenericParser = new Parser(text)

  const parse = () => {
    GenericParser.parse()
  }

  expect(parse).toThrow('Invalid tag name')
})
