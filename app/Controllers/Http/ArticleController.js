'use strict'

const Article = use('App/Models/Article')
const { validate } = use('Validator')
const Tag = use('App/Models/Tag')
class ArticleController {
  async index({ response }) {
    // response.json(await Article.all())
    return await Article.all()
  }

  async show({ params, response }) {
    const id = Number(params.id)
    const post = await Article.find(id)

    if(!post) {
      response.notFound({
        error: 'Not Found'
      })
      return
    }
    response.json(post)
  }

  async store({ request, response }){
    // vai receber os dados para cadastrar o artigo
    // criar um objeto
    const newArticleData = request.only(['title', 'body'])
    // const newTagData = request.only(['title'])

    //valida o mesmo post
    const rules = {
      title: 'required|string',
      body: 'required|string'
    }

    const validation = await validate(newArticleData, rules)

    if(validation.fails()) {
      response.badRequest(validation.messages())
      return
    }

    const article = new Article()
    article.title = newArticleData.title
    article.body = newArticleData.body

    // const tag = new Tag()
    // tag.tag

    await article.save()

    //retorna o novo article
    response.json(article)
  }

  async update ({ params, request, response }) {
    //pegar o id do url
    const id = Number(params.id)
    //pegar os artigos com o devido ID
    const article = await Article.find(id)

    if(!article) {
      response.notFound({
        error: 'Artigo não encontrado.'
      })
      return
    }

    //pegar os dados novos
    const updates = request.only(['title', 'body', 'published'])
    //atualizar a postagem
    const newArticle = {
      ...article,
      ...updates
    }

    //valida o artigo atualizado
    const rules = {
      title: 'required|string',
      body: 'required|string',
      published: 'boolean'
    }

    const validation = await validate (newArticle, rules)
    if(validation.fails()) {
      response.badRequest(validation.messages())
      return
    }

    article.merge(updates)
    await article.save()

    // retorna a postagem já atualizada
    response.json(article)
  }

  async destroy({ params, response }) {
    //pegar o ID do URL
    const id = Number(params.id)
    //encontrar a postagem
    const article = await Article.find(id)

    if(!article) {
      response.notFound({
        error: 'Não encontrado.'
      })
      return
    }
    //deletar a postagem desse ID
    await article.delete()
    //retornar nada com o código no Content
    response.noContent({})
  }

  // async createTag({ response }) {
  //   // const id = Number(params.id)
  //   const article = await Article.last()

  //   if(!article) {
  //     response.notFound({
  //       error: 'Not Found'
  //     })
  //     return
  //   }
  //   response.json(article)
  // }


}

module.exports = ArticleController
