'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Article extends Model {
  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/Slugify', {
      fields: {
        slug: 'title'
      },
      strategy: 'dbIncrement'
    })
  }

  tags() {
    return this
      .belongsToMany('App/Models/Tag')
      .pivotModel('App/Models/ArticleTag')
  }
}

module.exports = Article
