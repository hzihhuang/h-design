import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  logo: '/logo.png',
  favicons: ['/favicon.png'],
  themeConfig: {
    name: 'Design',
    socialLinks: {
      github: 'https://github.com/Super-ZiHao/HDesign',
    },
    nav: {
      'zh-CN': [
        { title: '组件', link: '/components' },
        { title: 'Hooks', link: '/hooks' },
      ],
      'en-US': [
        { title: 'Components', link: '/en-US/components' },
        { title: 'Hooks', link: '/en-US/hooks' },
      ],
    },
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: '英文' },
  ],
  resolve: {
    entryFile: './src/index.ts',
    atomDirs: [
      { type: 'components', dir: 'src/components' },
      { type: 'hooks', dir: 'src/hooks' },
    ],
  },
  apiParser: {}, // 开启自动识别 API 功能
  plugins: ['@umijs/plugins/dist/tailwindcss'], // 实现 tailwindcss 能力
  tailwindcss: {},
});
