import { defineConfig } from 'dumi';

//github仓库名称
const defaultPath = '/HDesign';
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
    socialLinks: {
      github: 'https://github.com/Super-ZiHao/HDesign',
    },
    nav: {
      'zh-CN': [
        { title: '组件', link: '/components' },
        { title: 'Hooks', link: '/hooks' },
        { title: 'Utils', link: '/utils' },
      ],
      'en-US': [
        { title: 'Components', link: '/en-US/components' },
        { title: 'Hooks', link: '/en-US/hooks' },
        { title: 'Utils', link: '/en-US/utils' },
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
