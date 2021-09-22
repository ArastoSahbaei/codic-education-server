import {populateDatabase} from "./Populate.js";
import config from '../Configurations.js'
import dotenv from 'dotenv'

dotenv.config(process.env.DEV_DATABASE_URL && config.connectToDatabase())
populateDatabase()
