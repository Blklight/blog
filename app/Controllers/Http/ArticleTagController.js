'use strict'

const Tag = use('App/Models/Tag')
const Article = use('App/Models/Article')
const ArticleTag = use('App/Models/ArticleTag')
const { validate } = use('Validator')

class ArticleTagController {

  async store({ params, response }){

    const articleId = Number(params.id)

    const tagId = Number(params.tagId)

    const article = await Article.find(articleId)
    const tag = await Tag.find(tagId)

    if(!article || !tag) {
      response.badRequest()
      return
    }

    const hasArticleTag = await ArticleTag
    .query()
    .where('article_id', articleId)
    .where('tag_id', tagId)
    .first()

    if(hasArticleTag) {
      response.badRequest()
      return
    }

    response.status(201).send(
      await article.tags().attach([tag.id])
    )
  }


  async delete({ params, response }) {

    const articleId = Number(params.id)
    const tagId = Number(params.tagId)

    const article = await Article.find(articleId)
    const tag = await Tag.find(tagId)

    const hasArticleTag = await ArticleTag
    .query()
    .where('article_id', articleId)
    .where('tag_id', tagId)
    .first()

    response.status(200).send(hasArticleTag.delete())
  }

}

module.exports = ArticleTagController
