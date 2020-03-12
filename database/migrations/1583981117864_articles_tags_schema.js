'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticlesTagsSchema extends Schema {
  up () {
    this.create('articles_tags', (table) => {
      table.increments()
      table.integer('tag_id').unsigned().references('id').inTable('tags')
      table.integer('article_id').unsigned().references('id').inTable('articles')
      table.timestamps()
    })
  }

  down () {
    this.drop('articles_tags')
  }
}

module.exports = ArticlesTagsSchema
