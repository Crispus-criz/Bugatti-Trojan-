import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  try {
    let res = await fetch(
      'https://ndtvapi.vercel.app/general?category=latest&field=headline,description,url'
    )
    if (!res.ok) throw await res.text()
    let data = await res.json()
    if (!data.news || !data.news.length) throw new Error('No news available.')

    let randomCategoryIndex = Math.floor(Math.random() * data.news.length)
    let newsCategory = data.news[randomCategoryIndex]
    let articles = newsCategory.articles

    if (!articles.length) throw new Error('No news available in the selected category.')

    let randomArticleIndex = Math.floor(Math.random() * articles.length)
    let newsItem = articles[randomArticleIndex]

    let newsInfo = `•───── ୨❀୧ ─────•
    ❖ Status: Active
    ㋡ Moderator: Marisel
    ☞ Headline: ${newsItem.headline}
    ${newsItem.description}
    🔗 Readmore: ${newsItem.url}
    •───── ୨❀୧ ─────•`

    let thumbnail =
      'https://api.shannmoderz.xyz/server/file/XyjKP6IA0VnyFZF.jpg'

    conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', newsInfo, m)

    m.react('✅')
  } catch (e) {
    console.error(e)
    m.react('❌')
  }
}

handler.help = ['news']
handler.tags = ['news']
handler.command = ['ndtv']

export default handler