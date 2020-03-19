'use strict'

const User = use('App/Models/User')

class UserController {

  async store({ request, response }) {

    const NewUserData = request.only(['username', 'email', 'password'])

    const rules = {
      username: 'required|string',
      email: 'required|string',
      password: 'required|string'
    }

    const validation = await ValidityState(NewUserData, rules)
    if(validation.fails()) {
      response.badRequest(validation.messages())
      return
    }

    const user = new User()
    user.username = NewUserData.username
    user.email = NewUserData.email
    user.password = NewUserData.password

    await user.save()
    response.json(user)
  }

  async login ({ auth, request }) {

    const { email, password } = request.all()
    await auth.attempt(email, password)

    return 'Logged in sucessfully'
  }

  async show({ auth, params }){
    if(auth.user.id !==Number(params.id)) {
      return "you cannot see someone else's profile"
    }
    return auth.user
  }
}

module.exports = UserController
