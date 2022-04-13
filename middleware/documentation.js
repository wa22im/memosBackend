import express from "express"
import swaggerUi  from "swagger-ui-express"
import yaml from 'js-yaml'
import fs from  "fs"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);
let fileContents = fs.readFileSync(__dirname+'/../api/api.yaml', 'utf8');
const swaggerDocument = yaml.load(fileContents);
export const documentation = express
	.Router()
	.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
	.get("/swagger.json", (req, res) => {
		res.send(swaggerDocument)
	})

