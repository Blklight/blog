'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ArticleTag extends Model {
  static get table () {
    return "articles_tags"
  }
}

module.exports = ArticleTag
