'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticlesSchema extends Schema {
  up () {
    this.create('articles', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('title', 255).notNullable()
      table.string('slug', 191).notNullable().unique()
      table.text('body').nullable()
      table.boolean('published').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('articles')
  }
}

module.exports = ArticlesSchema
