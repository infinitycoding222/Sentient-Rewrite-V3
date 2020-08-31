import { ConnectionManager } from "typeorm"
import { dbName } from "../Client/Utils/Config"

import { Warns } from "../Models/Warns"
import { Settings } from "../Models/Settings"

const connectionManager: ConnectionManager = new ConnectionManager();
connectionManager.create({
    name: dbName,
    type: "sqlite",
    database: "./sentient.sqlite",
    entities: [
        Warns,
        Settings
    ]
})

export default connectionManager