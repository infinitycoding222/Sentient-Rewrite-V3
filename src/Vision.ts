import Client from "./Client/VisionClient";

import { token } from "./Client/Utils/Config";

const client = new Client({ token: token });

client.start();
