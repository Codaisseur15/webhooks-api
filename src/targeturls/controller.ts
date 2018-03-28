import {Body, JsonController, Post, Get} from "routing-controllers";
import {Target} from "./entities";

@JsonController()
export default class TargetController {

  @Get('/targets')
    getAllTargets(){
      return Target.find()
    }

  @Post('/targets')
  createHook(
    @Body() body: Target
  ) {
    return Target.create(body).save()
  }

}