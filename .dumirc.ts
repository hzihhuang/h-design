import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'HDesign',
    nav: [
      { title: '组件', link: '/components/auto-ratio-container' }
    ]
  },
});
