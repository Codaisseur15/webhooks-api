import {BadRequestError, Body, Get, JsonController, Post} from "routing-controllers"
import * as request from 'superagent'
import {Target} from "../targeturls/entities";

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
    @Body() body: Target
  ) {
    const newResponse =  Target.create(body).save()

    request
      .post('oururl/events')
      .send({
        eventname: 'response',
        data: newResponse
      })
  }

  @Post('/events')
  async testHook(@Body() body: object) {

    //Check the target that are listening to the event

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

interface HookBody {
  name: string
  active?: boolean
  events: string[]
  url: string
}

const testObject: HookBody = {
  name: 'test',
  active: true,
  events: ['response', 'newquiz'],
  url: 'example.com/test'
}