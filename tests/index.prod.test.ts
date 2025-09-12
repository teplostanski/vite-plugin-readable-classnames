/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import readableClassnames from '../src/index.js'
import type { UserConfig } from 'vite'

describe('readableClassnames', () => {
  let consoleSpy: any
  let originalVitest: string | undefined

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    originalVitest = process.env.VITEST
    delete process.env.VITEST
  })

  afterEach(() => {
    process.env.VITEST = originalVitest
    consoleSpy.mockRestore()
    vi.clearAllMocks()
  })

  function callPluginConfig(plugin: any, config: UserConfig) {
    return plugin.config(config, { command: 'serve', mode: 'production' })
  }

  it('should be only hash', () => {
    const plugin = readableClassnames()
    const result = callPluginConfig(plugin, {})
    const generateScopedName = result.css?.modules?.generateScopedName

    expect(generateScopedName).toBeDefined()
    expect(typeof generateScopedName).toBe('function')

    if (generateScopedName) {
      const name = generateScopedName(
        'button',
        'src/Button.vue',
        '.button { color: red; }',
      )
      expect(name).toMatch(/^_[a-z0-9]+$/)
    }
  })

  it('should use custom beforeHash separator', () => {
    const separator = { beforeHash: '--' }
    const plugin = readableClassnames({ separator })
    const result = callPluginConfig(plugin, {})
    const generateScopedName = result.css?.modules?.generateScopedName

    expect(generateScopedName).toBeDefined()
    expect(typeof generateScopedName).toBe('function')

    if (generateScopedName) {
      const name = generateScopedName(
        'button',
        'src/Button.vue',
        '.button { color: red; }',
      )
      expect(name).toMatch(/^--[a-z0-9]+$/)
    }
  })
})
