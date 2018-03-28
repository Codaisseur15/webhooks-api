import {app} from './app'
import setupDb from './db'

setupDb()
  .then(_ =>
    app.listen(4008, () => console.log('Listening on port 4008'))
  )
  .catch(err => console.error(err))