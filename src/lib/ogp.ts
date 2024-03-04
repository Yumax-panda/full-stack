import { parse } from 'node-html-parser'

export async function fetchOgp(url: string): Promise<string | undefined> {
  const response = await fetch(url, {
    headers: {
      'Allow-Cross-Origin-Origin': '*',
    },
    next: { revalidate: 259200 }, // 1month
  })
  const text = await response.text()
  const doc = parse(text)
  const ogImage = doc.querySelector('meta[property="og:image"]')
  if (ogImage) {
    return ogImage.getAttribute('content')
  }
  return undefined
}

type SiteData = {
  title?: string
  image?: string
  favicon?: string
  siteName?: string
  url: string
}

export async function fetchSiteData(url: string): Promise<SiteData> {
  // const response = await fetch(url, {
  //   headers: {
  //     'Allow-Cross-Origin-Origin': '*',
  //   },
  //   next: { revalidate: 259200 }, // 1month
  // })
  // const text = await response.text()
  // const doc = parse(text)
  // const title = doc.querySelector('meta[property="og:title"]')
  // const image = doc.querySelector('meta[property="og:image"]')
  // const favicon = doc.querySelector('link[rel="icon"]')
  // const siteName = doc.querySelector('meta[property="og:site_name"]')

  // return {
  //   image: image?.getAttribute('content'),
  //   favicon: favicon?.getAttribute('href'),
  //   siteName: siteName?.getAttribute('content'),
  //   title: title?.getAttribute('content'),
  //   url,
  // }

  return {
    image:
      'https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png?ixlib=rb-4.0.0&w=1200&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTkxNiZoPTMzNiZ0eHQ9JUUzJTgwJTkwUmVhY3QlRTMlODAlOTElRTMlODIlQTQlRTMlODMlOTklRTMlODMlQjMlRTMlODMlODglRTMlODMlOEYlRTMlODMlQjMlRTMlODMlODklRTMlODMlQTklRTMlODMlOTclRTMlODMlQUQlRTMlODMlOTElRTMlODMlODYlRTMlODIlQTMlRTQlQjglODAlRTglQTYlQTclRTMlODAlOTBKYXZhU2NyaXB0JUUzJTgwJTkxJnR4dC1jb2xvcj0lMjMyMTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9NTYmdHh0LWNsaXA9ZWxsaXBzaXMmdHh0LWFsaWduPWxlZnQlMkN0b3Amcz1jZTYwN2JlNmZmZWIzZGI0OTU1ODFmMGYzYjhmYzE0Nw&mark-x=142&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTcxNiZ0eHQ9JTQwUC1tYW5fQnJvd24mdHh0LWNvbG9yPSUyMzIxMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zMiZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZzPTExNGY3YTU2NmYxYWMwMTU2Nzg1MDQ5MzhmMDhmNmY1&blend-x=142&blend-y=491&blend-mode=normal&s=faf6d0e6d9a7eaa51a2d7eae4eee0abd',
    favicon:
      'https://cdn.qiita.com/assets/favicons/public/production-c620d3e403342b1022967ba5e3db1aaa.ico',
    siteName: 'Qiita',
    title: 'Qiita',
    url,
  }
}
