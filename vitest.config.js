import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: ['**/custom-pattern/**', ...coverageConfigDefaults.exclude]
    },
  },
})