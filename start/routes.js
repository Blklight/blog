'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.resource('articles', 'ArticleController').apiOnly()
Route.resource('tags', 'TagController').apiOnly()
Route.get('/articles/tags/', 'ArticleTagController.createTag')
Route.post('/articles/:id/tags/:tagId', 'ArticleTagController.store')
Route.delete('/articles/:id/tags-delete/:tagId', 'ArticleTagController.delete')
