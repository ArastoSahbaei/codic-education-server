import SeedDataScripts from "./scripts/Seed.js";
import config from './configurations/Configurations.js'

config.connectToDatabase()
SeedDataScripts.seedToDatabase()
