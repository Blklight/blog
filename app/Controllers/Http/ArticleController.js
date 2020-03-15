'use strict'

class ArticleController {
  async index({ response }) {
    response.json(await Post.all())
  }
}

module.exports = ArticleController
