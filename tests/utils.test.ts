import { describe, expect, it } from 'vitest'
import { defaultOptions, Errors } from '../src/constants.js'
import { sanitizeModuleClassname } from '../src/utils.js'

describe('sanitizeModuleClassname', () => {
  it('should generate correct class name with line number', () => {
    const result = sanitizeModuleClassname(
      'button',
      'src/components/Button.vue',
      { ...defaultOptions.separator },
      42,
    )
    expect(result).toMatch(/^Button__button_[a-z0-9]+-42$/)
  })

  it('should generate correct class name without line number', () => {
    const result = sanitizeModuleClassname(
      'header',
      'src/components/Header.vue',
      { ...defaultOptions.separator },
    )
    expect(result).toMatch(/^Header__header_[a-z0-9]+$/)
  })

  it('should handle files with .module extension correctly', () => {
    const result = sanitizeModuleClassname(
      'container',
      'src/styles/Layout.module.css',
      { ...defaultOptions.separator },
    )
    expect(result).toMatch(/^Layout__container_[a-z0-9]+$/)
  })

  it('should throw error when filename is undefined', () => {
    expect(() => {
      sanitizeModuleClassname('test', undefined, {
        ...defaultOptions.separator,
      })
    }).toThrow(Errors.InvalidType)
  })

  it('should throw error for invalid file path', () => {
    expect(() => {
      sanitizeModuleClassname('test', '/', { ...defaultOptions.separator })
    }).toThrow(Errors.InvalidName)
  })

  it('should generate same hash for same input', () => {
    const result1 = sanitizeModuleClassname(
      'button',
      'src/components/Button.vue',
      { ...defaultOptions.separator },
    )
    const result2 = sanitizeModuleClassname(
      'button',
      'src/components/Button.vue',
      { ...defaultOptions.separator },
    )
    expect(result1).toBe(result2)
  })

  it('should generate different hashes for different paths', () => {
    const result1 = sanitizeModuleClassname(
      'button',
      'src/components/Button.vue',
      { ...defaultOptions.separator },
    )
    const result2 = sanitizeModuleClassname(
      'button',
      'src/elements/Button.vue',
      { ...defaultOptions.separator },
    )
    expect(result1).not.toBe(result2)
  })

  it('should handle Windows absolute paths with forward slashes from Vite', () => {
    const result = sanitizeModuleClassname(
      'Root',
      'C:/Users/dev/project/src/components/EventCard.module.sass',
      { ...defaultOptions.separator },
    )
    expect(result).toMatch(/^EventCard__Root_[a-z0-9]+$/)
    expect(result).not.toContain('C:')
    expect(result).not.toContain('/')
  })

  it('should handle Windows absolute paths with backslashes', () => {
    const result = sanitizeModuleClassname(
      'Root',
      'C:\\Users\\dev\\project\\src\\components\\EventCard.module.sass',
      { ...defaultOptions.separator },
    )
    expect(result).toMatch(/^EventCard__Root_[a-z0-9]+$/)
    expect(result).not.toContain('C:')
    expect(result).not.toContain('/')
    expect(result).not.toContain('\\')
  })

  it('should produce the same class name regardless of Windows path separator style', () => {
    const separator = { ...defaultOptions.separator }
    const forwardSlashes =
      'C:/Users/dev/project/src/components/EventCard.module.sass'
    const backslashes =
      'C:\\Users\\dev\\project\\src\\components\\EventCard.module.sass'
    const mixedSeparators =
      'C:\\Users\\dev/project\\src\\components\\EventCard.module.sass'

    const forwardResult = sanitizeModuleClassname(
      'Root',
      forwardSlashes,
      separator,
    )
    const backslashResult = sanitizeModuleClassname(
      'Root',
      backslashes,
      separator,
    )
    const mixedResult = sanitizeModuleClassname(
      'Root',
      mixedSeparators,
      separator,
    )

    expect(backslashResult).toBe(forwardResult)
    expect(mixedResult).toBe(forwardResult)
  })

  it('should handle UNC paths', () => {
    const result = sanitizeModuleClassname(
      'Root',
      '\\\\server\\share\\project\\EventCard.module.sass',
      { ...defaultOptions.separator },
    )
    expect(result).toMatch(/^EventCard__Root_[a-z0-9]+$/)
    expect(result).not.toContain('\\')
    expect(result).not.toContain('/')
  })
})
