import { createHash } from 'node:crypto'
import { posix } from 'node:path'
import {
  BASE_FILENAME_STRIP_REGEX,
  Css,
  Errors,
  Hash,
  Path,
  WINDOWS_PATH_SEPARATOR_REGEX,
} from './constants'
import type { DeepPartial } from './types'

function getHash(input: string): string {
  return createHash(Hash.Algorithm)
    .update(input)
    .digest('hex')
    .slice(0, Hash.Length)
}

export function getLineNumber(cssData: string, className: string): number {
  const lines = cssData.split(Css.LineSeparator)
  const match = new RegExp(`\\.${className}\\b`)
  return (
    lines.findIndex((line) => match.test(line)) + Css.OneBasedLineNumberOffset
  )
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

export function sanitizeModuleClassname(
  name: string,
  filename: string | undefined,
  separator: {
    beforeHash: string
    beforeClassName: string
    beforeLineNumber: string
  },
  lineNumber?: number,
): string {
  if (typeof filename !== 'string') {
    throw new Error(Errors.InvalidType)
  }

  const pathname = filename
    .split(Path.FilenameQuerySeparator)[0]
    .replace(WINDOWS_PATH_SEPARATOR_REGEX, Path.PosixSeparator)
  const { dir, base } = posix.parse(pathname)

  if (!base) {
    throw new Error(Errors.InvalidName)
  }

  const baseFilename = base.replace(BASE_FILENAME_STRIP_REGEX, '')
  const pathHash = getHash(dir)
  const classname = `${baseFilename}${separator.beforeClassName}${name}`
  const hash = `${separator.beforeHash}${getHash(`${pathHash}${Hash.InputSeparator}${classname}`)}`
  const lineInfo =
    lineNumber !== undefined ? `${separator.beforeLineNumber}${lineNumber}` : ''

  return `${classname}${hash}${lineInfo}`
}
