import {Body, JsonController, Post} from "routing-controllers"
import * as request from 'superagent'

@JsonController()
export default class TestController {

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