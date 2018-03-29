import 'reflect-metadata'
import { createKoaServer, Action } from "routing-controllers"
import TargetController from "./targeturls/controller";
import EventController from "./events/controller";

//const port = process.env.PORT || 4008

export const app = createKoaServer({
    controllers: [
        TargetController,
        EventController
    ],
    authorizationChecker: (action: Action) => {
      return action.request.headers["x-user-role"] === 'teacher'
  }
})
