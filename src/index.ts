require('dotenv').config()
import express from 'express';
import { AppRoutes } from './routes';
import { DBConnection } from './helpers/db';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.PORT || 3000;

const db: DBConnection = new DBConnection();

const routes: AppRoutes = new AppRoutes(db);

app.use(bodyParser.json())
app.use(routes.router)

app.listen(port, () => {
    console.log(`App started at port ${port}`)
})