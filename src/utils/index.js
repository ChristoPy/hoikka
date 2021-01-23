const CODE_FORMAT = ['\t', '\n']
const WHITE_SPACE = ' '

const assert = (value, errorName) => {
  if (!value) throw errorName || (new Error('AssertError'));
}

const isCodeFormat = (token) => CODE_FORMAT.includes(token)
const isWhiteSpace = (token) => token === WHITE_SPACE
const isIgnorable = (token) => isCodeFormat(token) || isWhiteSpace(token)

module.exports = {
  assert,
  isCodeFormat,
  isWhiteSpace,
  isIgnorable,
}
