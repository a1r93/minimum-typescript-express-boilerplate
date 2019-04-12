import * as bodyParser from "body-parser"
import * as errorHandler from "errorhandler"
import * as express from "express"
import { Logger, HttpStatus, loadEnvironment } from "./utils"

const DEFAULT_PORT = 8000

// Load environment variables from .env file
loadEnvironment()

// Create Express server
const app = express()

// Express configuration
app.set("port", process.env.PORT || DEFAULT_PORT)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(errorHandler())

const logger = new Logger()

/**
 * Default app route.
 */
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(HttpStatus.Ok).send("Hello World")
})

const server = app.listen(app.get("port"), () => {
  logger.info(
    `  App is running at http://localhost:${app.get("port")} in ${app.get(
      "env"
    )} mode`
  )
  logger.info("  Press CTRL-C to stop\n")
})

export default server
