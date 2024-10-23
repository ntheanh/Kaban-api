import { MongoClient, ServerApiVersion } from "mongodb"
import { env } from "./environment"
// Replace the placeholder with your Atlas connection string
let kabanDatabaseInstance = null
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // serverApi: {
  //   version: ServerApiVersion.v1,
  //   strict: true,
  //   deprecationErrors: true
  // }
})

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()

  kabanDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

export const GET_DB = () => {
  if (!kabanDatabaseInstance) throw new Error("Must connect to Database first")
  return kabanDatabaseInstance
}
