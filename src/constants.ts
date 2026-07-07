import type { Options } from './types'

export const PLUGIN_NAME = 'vite-plugin-readable-classnames'

export const GENERATE_SCOPED_NAME = 'generateScopedName'

export const WINDOWS_PATH_SEPARATOR_REGEX: RegExp = /\\/g
export const BASE_FILENAME_STRIP_REGEX: RegExp = /(\.vue|\.module)?(\.\w+)$/

export const Hash = {
  Algorithm: 'sha256',
  Length: 5,
  InputSeparator: '-',
} as const

export const Path = {
  FilenameQuerySeparator: '?',
  PosixSeparator: '/',
} as const

export const Css = {
  LineSeparator: '\n',
  OneBasedLineNumberOffset: 1,
} as const

export const Warnings = {
  GenerateScopedName:
    "[vite-plugin-readable-classnames]:: The 'generateScopedName' configuration has already been set. Your vite.config configuration or other plugins might be attempting to override this setting, which could affect the proper functioning of vite-plugin-readable-classnames.",
} as const

export const Errors = {
  InvalidType: 'The filename must be string and cannot be undefined.',
  InvalidName: 'Filename must include a valid file name.',
} as const

export const defaultOptions: Options = {
  lineNumber: false,
  separator: {
    beforeHash: '_',
    beforeClassName: '__',
    beforeLineNumber: '-',
  },
}
