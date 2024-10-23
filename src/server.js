import express from "express"
import exitHook from "async-exit-hook"
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/config/mongodb"
import "dotenv/config"
import { env } from "~/config/environment"

const START_SERVER = () => {
  const app = express()

  app.get("/", async (req, res) => {
    // console.log(await GET_DB().listCollections().toArray())
    res.end("<h1>Hello !</h1><hr>")
  })
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3.Hello ${env.AUTHOR} I am running at http://${env.APP_HOST}:${env.APP_PORT}/`
    )
  })
  exitHook(() => {
    console.log("4.Closing server...")
    CLOSE_DB()
  })
}

;(async () => {
  try {
    console.log("1.Connecting to MongoDB...")
    await CONNECT_DB()
    console.log("2.Connected to success")

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log("Connected to success"))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error)
//     process.exit(0)
//   })
