
import {Body, JsonController, Post, Patch, Get,Param, NotFoundError} from "routing-controllers";

import {Target} from "./entities";

@JsonController()
export default class TargetController {

  @Post('/targets')
  createHook(
    @Body() body: Target
  ) {
    return Target.create(body).save()
  }

  // @Get('./targets')
  //   getAllHooks(){
  //     return Target.find()
  //   }

  @Patch('/targets/:id')
  async updateHook(
    @Param('id') id: number,
    @Body() update: Partial<Target>
  ) {
    const target = await Target.findOneById(id)
    if(!target) throw new NotFoundError('Cannot find target')

    return Target.merge(target, update).save()
  }

  @Get('/targets')
  async getHooks() {
    const targets = await Target.find()
    return { targets }
  }

  @Get('/targets/:id')
  async getHook(
    @Param('id') id: number
  ) {
    const target = await Target.findOneById(id)
    if(!target) throw new NotFoundError('Cannot find target')
    return target
  }

}
