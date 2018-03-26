import {BadRequestError, Body, Get, JsonController, Post} from "routing-controllers"
import * as request from 'superagent'
import {Subscription, Target} from "../targeturls/entities";

@JsonController()
export default class TestController {

  @Get('/subs')
  async getSubs() {
    const sub = await Subscription.find({name: 'response'})
    if (!sub) throw new BadRequestError('No sub found')

    return sub.map(sub => sub.target.url)
  }

  @Post('/hook')
  async createHook(
    @Body() hook: Target
  ) {
    const entity = await Target.create(hook).save()

    await Subscription.create({
      name: 'response',
      target: entity
    }).save()

    return Target.findOneById(entity.id)
  }

  @Post('')
  async testHook(@Body() body: object) {

    try {
      await request
        .post('http://postb.in/NRQVD2Js')
        .send(body)
      return {message: 'All went well'}
    } catch (err) {
      return {message: err.message}
    }

  }

}