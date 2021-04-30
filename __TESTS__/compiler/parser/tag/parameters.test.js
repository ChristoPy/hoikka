const Parser = require('../../../../src/compiler/parser/tag.js')

test('[BASIC] Parse a basic parameter', () => {
  const text = '<img src="123">'

  const GenericParser = new Parser(text)
  GenericParser.parse()

  expect(GenericParser.name).toBe('img')
  expect(GenericParser.cursor).toBe(15)
  expect(GenericParser.tokens.length).toBe(0)
  expect(GenericParser.lexemes.length).toBe(0)
  expect(GenericParser.parameters).toStrictEqual({ src: '123' })
  expect(GenericParser.insideParameters).toBe(true)
  expect(GenericParser.insideParametersAt).toBe(4)
  expect(GenericParser.parameterValueStarted).toBe(false)
  expect(GenericParser.parameterValueStartedAt).toBe(-1)
  expect(GenericParser.currentParameter).toBe('')
  expect(GenericParser.closing).toBe(false)
  expect(GenericParser.selfClosing).toBe(false)
})

test('[BASIC] Parse a basic parameter with a dashed name', () => {
  const text = '<img data-src="123">'

  const GenericParser = new Parser(text)
  GenericParser.parse()

  expect(GenericParser.name).toBe('img')
  expect(GenericParser.cursor).toBe(20)
  expect(GenericParser.tokens.length).toBe(0)
  expect(GenericParser.lexemes.length).toBe(0)
  expect(GenericParser.parameters).toStrictEqual({ 'data-src': '123' })
  expect(GenericParser.insideParameters).toBe(true)
  expect(GenericParser.insideParametersAt).toBe(4)
  expect(GenericParser.parameterValueStarted).toBe(false)
  expect(GenericParser.parameterValueStartedAt).toBe(-1)
  expect(GenericParser.currentParameter).toBe('')
  expect(GenericParser.closing).toBe(false)
  expect(GenericParser.selfClosing).toBe(false)
})

test('[COMPLEX] Parse a spaced parameter with a dashed name', () => {
  const text = '<img data-src="123 aa bbb 123 a b c d">'

  const GenericParser = new Parser(text)
  GenericParser.parse()

  expect(GenericParser.name).toBe('img')
  expect(GenericParser.cursor).toBe(39)
  expect(GenericParser.tokens.length).toBe(0)
  expect(GenericParser.lexemes.length).toBe(0)
  expect(GenericParser.parameters).toStrictEqual({ 'data-src': '123 aa bbb 123 a b c d' })
  expect(GenericParser.insideParameters).toBe(true)
  expect(GenericParser.insideParametersAt).toBe(4)
  expect(GenericParser.parameterValueStarted).toBe(false)
  expect(GenericParser.parameterValueStartedAt).toBe(-1)
  expect(GenericParser.currentParameter).toBe('')
  expect(GenericParser.closing).toBe(false)
  expect(GenericParser.selfClosing).toBe(false)
})

test('[COMPLEX] Parse a URL parameter with a dashed name', () => {
  const text = '<img data-src="http://placekitten.com/200/300">'

  const GenericParser = new Parser(text)
  GenericParser.parse()

  expect(GenericParser.name).toBe('img')
  expect(GenericParser.cursor).toBe(47)
  expect(GenericParser.tokens.length).toBe(0)
  expect(GenericParser.lexemes.length).toBe(0)
  expect(GenericParser.parameters).toStrictEqual({ 'data-src': 'http://placekitten.com/200/300' })
  expect(GenericParser.insideParameters).toBe(true)
  expect(GenericParser.insideParametersAt).toBe(4)
  expect(GenericParser.parameterValueStarted).toBe(false)
  expect(GenericParser.parameterValueStartedAt).toBe(-1)
  expect(GenericParser.currentParameter).toBe('')
  expect(GenericParser.closing).toBe(false)
  expect(GenericParser.selfClosing).toBe(false)
})

test('[COMPLEX] Prevent parsing a non terminated parameter', () => {
  const text = '<img data-src="http://placekitten.com/200/300>'

  const GenericParser = new Parser(text)

  const parse = () => {
    GenericParser.parse()
  }

  expect(parse).toThrow('Parameter not closed properly')
})

