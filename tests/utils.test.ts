import { describe, it, expect } from 'vitest'
import { defaultOptions } from '../src/constants.js'
import { sanitizeClassname, buildClassname, getHash } from '../src/utils.js'

const params = {
  isDevMode: true,
  filename: 'Button',
  classname: 'test',
  cssHash: 'a03d6',
  lineNumber: 42,
  getHash,
}

describe('sanitizeClassname', () => {
  it('should handle files with .vue extension correctly', () => {
    const result = sanitizeClassname('src/components/Button.vue')
    expect(result).toMatch(/^Button$/)
  })

  it('should handle files with .module suffix correctly', () => {
    const result = sanitizeClassname('src/styles/Layout.module.css')
    expect(result).toMatch(/^Layout$/)
  })

  it('should throw error for invalid file path', () => {
    expect(() => {
      sanitizeClassname('/')
    }).toThrow('Filename must include a valid file name.')
  })
})

describe('buildClassname', () => {
  it('should generate correct class name with line number', () => {
    const result = buildClassname({...params, options: { ...defaultOptions, lineNumber: true }})
    expect(result).toMatch(/^Button__test_[a-z0-9]+-42$/)
  })

  it('should generate correct class name without line number', () => {
    const result = buildClassname({...params, options: { ...defaultOptions }})
    expect(result).toMatch(/^Button__test_[a-z0-9]+$/)
  })

  it('should generate same hash for same input', () => {
    const result1 = buildClassname({...params, options: { ...defaultOptions }})
    const result2 = buildClassname({...params, options: { ...defaultOptions }})
    expect(result1).toBe(result2)
  })

  it('should generate different hashes for different paths', () => {
    const result1 = buildClassname({...params, options: { ...defaultOptions }})
    const result2 = buildClassname({...params, options: { ...defaultOptions }, filename: 'Header'})
    expect(result1).not.toBe(result2)
  })
})
