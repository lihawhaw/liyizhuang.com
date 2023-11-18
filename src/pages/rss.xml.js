import rss, { pagesGlobToRssItems } from '@astrojs/rss'

export async function GET(context) {
  return rss({
    title: '前端技术记录 | Blog',
    description: '极致源于梦想',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.{md,mdx}')),
    customData: `<language>zh-CN</language>`,
  })
}
