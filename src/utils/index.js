const CODE_FORMAT = ['\t', '\n']
const WHITE_SPACE = ' '
const TAG_CLOSER = ['/', '>']
const TAG_NAME = /(^((([a-z])+)([-][a-z]+)*)$)/

const assert = (value, errorName) => {
  if (!value) throw new Error(errorName || 'AssertError');
}

const testRegex = (toTest, regex) => {
  const match = toTest.match(regex)
  if (match) {
    return match.length > 0
  }
  return false
}

const isCodeFormat = (token) => CODE_FORMAT.includes(token)
const isWhiteSpace = (token) => token === WHITE_SPACE
const isIgnorable = (token) => isCodeFormat(token) || isWhiteSpace(token)
const isTagCloser = (token) => TAG_CLOSER.includes(token)
const isTagName = (value) => testRegex(value, TAG_NAME)

module.exports = {
  assert,
  isCodeFormat,
  isWhiteSpace,
  isIgnorable,
  isTagCloser,
  isTagName,
}
