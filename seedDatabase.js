import SeedDataScripts from "./scripts/Seed.js";
import config from './configurations/Configurations.js'

await config.connectToDatabase()
SeedDataScripts.seedToDatabase()
