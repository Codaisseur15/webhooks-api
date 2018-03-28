import {Body, JsonController, Post} from "routing-controllers";
import {Target} from "../targeturls/entities";
import {getRepository} from "typeorm";
import * as request from 'superagent'
import {SentEvent} from "./entity";

interface EventObject {
  event: string
  data: object
}

@JsonController()
export default class EventController {

  @Post('/events')
  async sendEvent(
    @Body() body: EventObject
  ) {
    const hooks = await getRepository(Target)
      .createQueryBuilder("hook")
      .where("hook.events like :event", {event: `%${body.event}%`})
      .getMany()

    const promises = hooks.map(hook => {
      return request
        .post(hook.url)
        .send(body)
        .then(res => {
          return {hook, status: res.status, event: body}
        })
        .catch(err => {
          return {hook, status: err.status, event: body}
        })
    })

    const requestResults = await Promise.all(promises)

    const dbPromises = requestResults.map(res => {
      const {status, event, hook} = res

      return SentEvent.create({
        target: hook,
        status,
        event
      }).save()
    })

     return Promise.all(dbPromises)
  }
}