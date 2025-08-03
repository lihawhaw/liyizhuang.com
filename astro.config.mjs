import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import { remarkEndOfMarkdown, viewTransitions } from 'astro-vtbot/starlight-view-transitions'
import { EnumChangefreq } from 'sitemap'

const lastmod = new Date().toString()

// https://astro.build/config
export default defineConfig({
  site: 'https://liyizhuang.com',
  build: {
    assets: 'static',
    // assetsPrefix: 'https://static.lihaha.cn'
  },
  server: {
    port: 6001,
    host: true,
  },
  integrations: [
    react(),
    starlight({
      title: '前端技术记录',
      defaultLocale: 'zh-CN',
      sidebar: [
        {
          label: '文章',
          collapsed: true,
          autogenerate: { directory: 'article' },
        },
        {
          label: '配置',
          collapsed: true,
          // autogenerate: { directory: 'config' },
          items: ['config', 'config/biome', 'config/eslint', 'config/prettier', 'config/zshrc', 'config/git'],
        },
        {
          label: '前端',
          collapsed: true,
          autogenerate: { directory: 'front-end' },
        },
        {
          label: '运维',
          collapsed: true,
          autogenerate: { directory: 'ops' },
        },
      ],
      plugins: [
        //ion()
        viewTransitions(), // { declarativeNames: 'h2 = heading2-' }
      ],
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'expect',
            href: '#below-the-fold',
            blocking: 'render',
          },
        },
      ],
    }),
    mdx(),
    sitemap({
      changefreq: EnumChangefreq.WEEKLY,
      priority: 1,
      serialize(item) {
        if (/tool/.test(item.url)) {
          return undefined
        }
        if (/work/.test(item.url)) {
          item.changefreq = EnumChangefreq.WEEKLY
          item.lastmod = lastmod
          item.priority = 0.7
        }
        if (/post/.test(item.url)) {
          item.changefreq = EnumChangefreq.DAILY
          item.lastmod = lastmod
          item.priority = 0.8
        }
        if (/article/.test(item.url)) {
          item.changefreq = EnumChangefreq.DAILY
          item.lastmod = lastmod
          item.priority = 0.8
        }
        if (/front-end/.test(item.url)) {
          item.changefreq = EnumChangefreq.DAILY
          item.lastmod = lastmod
          item.priority = 0.8
        }
        if (/ops/.test(item.url)) {
          item.changefreq = EnumChangefreq.DAILY
          item.lastmod = lastmod
          item.priority = 0.8
        }
        return item
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: {
    defaultStrategy: 'viewport',
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'min-light',
        dark: 'aurora-x',
      },
    },
    remarkPlugins: [remarkEndOfMarkdown],
  },
})
