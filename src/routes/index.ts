import { Router } from "express";
import { DBConnection } from "../helpers/db";
import { UserRoutes } from "./user_routes";
import { ArticleRoutes } from "./article_routes";

export class AppRoutes {
    router: Router;

    constructor(private db: DBConnection) {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get('/', (req, res) => {
            res.send('Hello World!')
        })

        this.router.use('/api/users', new UserRoutes(this.db).router)
        this.router.use('/api/articles', new ArticleRoutes(this.db).router)

        this.router.use('*', (req, res) => {
            res.sendStatus(404)
        })
    }
}