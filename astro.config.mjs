import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { EnumChangefreq } from 'sitemap'
import react from '@astrojs/react'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'

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
          autogenerate: { directory: 'article' },
        },
        {
          label: '前端',
          autogenerate: { directory: 'front-end' },
        },
        {
          label: '运维',
          autogenerate: { directory: 'ops' },
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
  },
})
