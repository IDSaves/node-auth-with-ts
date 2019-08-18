import * as dotenv from 'dotenv'
import app from './app'
import * as http from 'http'

dotenv.config()

const PORT = 3000
http.createServer(app).listen(PORT, function(){
  console.log('Server listening on port ' + PORT)
})