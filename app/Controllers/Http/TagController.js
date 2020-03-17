'use strict'

const Tag = use('App/Models/Tag')
const { validate } = use('Validator')

class TagController {
  async index({ response }) {
    return await Tag.all()
  }

  async show({ params, response }) {
    const id = Number(params.id)
    const tag = await Tag.find(id)

    if(!tag) {
      response.notFound({
        error: 'Not Found'
      })
      return
    }
    response.json(tag)
  }

  async store({ request, response }) {
    const newTagData = request.only('title')

    const rules = {
      title: 'required|string'
    }

    const validation = await validate(newTagData, rules)

    if(validation.fails()) {
      response.badRequest(validation.messages())
      return
    }
    const tag = new Tag()
    tag.title = newTagData.title

    await tag.save()
    response.json(tag)
  }

  async update ({params, request, response}){
    const id = Number(params.id)
    const tag = await Tag.find(id)

    if(!tag) {
      response.notFound({
        error: 'Tag não encontrada.'
      })
      return
    }

    const updates = request.only(['title'])
    const newTag = {
      ...tag,
      ...updates
    }

    const rules = {
      title: 'required|string'
    }

    const validation = await validate (newTag, rules)
    if(validation.fails()) {
      response.badRequest(validation.messages())
      return
    }

    tag.merge(updates)
    await tag.save()
    response.json(tag)
  }

  async destroy({ params, response }) {
    const id = Number(params.id)
    const tag = await Tag.find(id)

    if(!tag) {
      response.notFound({
        error: 'Não encontrado.'
      })
      return
    }

    await tag.delete()
    response.json({})
  }
}

module.exports = TagController
