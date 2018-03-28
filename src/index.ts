//import setupDb from './db'
//import {app} from './app'
import 'reflect-metadata'
import { createKoaServer } from "routing-controllers"
import setupDb from './db'
import TargetController from "./targeturls/controller";
import EventController from "./events/controller";

const port = process.env.PORT || 4008

export const app = createKoaServer({
  controllers: [
    TargetController,
    EventController
  ]
})


setupDb()
  .then(_ =>
    app.listen(4008, () => console.log('Listening on port 4008'))
  )
  .catch(err => console.error(err))