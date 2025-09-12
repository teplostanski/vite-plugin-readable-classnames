export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export interface Separator {
  beforeHash: string
  beforeClassName: string
  beforeLineNumber: string
}

export interface Options {
  lineNumber: boolean
  separator: Separator
}

export interface BuildClassname {
  isDevMode: boolean
  filename: string
  classname: string
  pathHash: string
  options: Options
  lineNumber: number
  getHash: (input: string) => string
}
