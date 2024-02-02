import { defineConfig } from 'dumi';

//github仓库名称
const defaultPath = '/h-design';
//打包后gh-pages默认会拼接仓库名称在路径上
const baseUrl = process.env.NODE_ENV === 'production' ? defaultPath : '';

export default defineConfig({
  base: defaultPath,
  publicPath: `${baseUrl}/`,
  outputPath: 'docs-dist',
  logo: `${baseUrl}/logo.png`,
  favicons: [`${baseUrl}/favicon.png`],
  themeConfig: {
    name: 'Design',
    footer: 'Welcome Here',

    nav: {
      'zh-CN': [
        { title: '组件', link: '/components/auto-ratio-container' },
        { title: 'Hooks', link: '/hooks/use-debounce-state' },
        { title: 'Utils', link: '/utils/is-array-string' },
      ],
      'en-US': [
        { title: 'Components', link: '/en-US/components/auto-ratio-container' },
        { title: 'Hooks', link: '/en-US/hooks/use-debounce-state' },
        { title: 'Utils', link: '/en-US/utils/is-array-string' },
      ],
    },
  },
  locales: [
    // 多语言
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: '英文' },
  ],
  resolve: {
    // 设置文件解析入口
    entryFile: './src/index.ts',
    atomDirs: [
      { type: 'components', dir: 'src/components' },
      { type: 'hooks', dir: 'src/hooks' },
      { type: 'utils', dir: 'src/utils' },
    ],
  },
  apiParser: {}, // 开启自动识别 API 功能
  analytics: {
    // 统计访问量
    ga_v2: 'G-abcdefg',
    ga: 'ga_old_key',
    baidu: 'baidu_tongji_key',
  },
  plugins: ['@umijs/plugins/dist/tailwindcss'], // 实现 tailwindcss 能力
  tailwindcss: {},
});
