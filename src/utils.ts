import { createHash } from 'crypto'
import type { BuildClassname, DeepPartial } from './types'
import { ERROR_MSG_INVALID_TYPE, ERROR_MSG_INVALID_NAME } from './constants'

export function getHash(input: string): string {
  return createHash('sha256').update(input).digest('hex').slice(0, 5)
}

export function getLineNumber(cssData: string, className: string): number {
  const lines = cssData.split('\n')
  const match = new RegExp(`\\.${className}\\b`)
  return lines.findIndex((line) => match.test(line)) + 1
}

export function deepMerge<T>(
  defaultOptions: T,
  userOptions: DeepPartial<T>,
): T {
  const result = { ...defaultOptions }

  for (const key in userOptions) {
    const value = userOptions[key]

    if (value != null && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = deepMerge(defaultOptions[key], value) as T[typeof key]
    } else if (value !== undefined) {
      result[key] = value as T[typeof key]
    }
  }

  return result
}

export function sanitizeClassname(filename: string): string {
  if (typeof filename !== 'string') {
    throw new Error(ERROR_MSG_INVALID_TYPE)
  }

  const parts = filename.split('?')[0].split('/')
  const lastSegment = parts.pop()

  if (!lastSegment) {
    throw new Error(ERROR_MSG_INVALID_NAME)
  }

  const cleanFilename = lastSegment.replace(/(\.vue|\.module)?(\.\w+)$/, '')

  return cleanFilename
}

export function buildClassname({
  isDevMode,
  filename,
  classname,
  cssHash,
  options,
  lineNumber,
  getHash,
}: BuildClassname): string {
  const normalizedClassname = `${filename}${options.separator.beforeClassName}${classname}`
  const hash = `${options.separator.beforeHash}${getHash(`${cssHash}-${classname}`)}`
  const lineInfo = options.lineNumber
    ? `${options.separator.beforeLineNumber}${lineNumber}`
    : ''

  return isDevMode ? `${normalizedClassname}${hash}${lineInfo}` : `${hash}`
}
