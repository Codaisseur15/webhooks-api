import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'
import TargetController from "./targeturls/controller";
import EventController from "./events/controller";

const port = process.env.PORT || 4008

const app = createKoaServer({
  controllers: [
    TargetController,
    EventController
  ]
})

setupDb()
  .then(_ => {
    app.listen(port, () => console.log(`Listening on port ${port}`))
  })
  .catch(err => console.error(err))