import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'HDesign',
  },
  resolve: {
    entryFile: './src/index.ts',
  },
  apiParser: {}, // 开启自动识别 API 功能
  plugins: ['@umijs/plugins/dist/tailwindcss'], // 实现 tailwindcss 能力
  tailwindcss: {},
});
