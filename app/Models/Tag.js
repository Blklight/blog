'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {

  articles() {
    return this
      .belongsToMany('App/Models/Article')
      .pivotModel('App/Models/ArticleTag')
  }
}

module.exports = Tag
