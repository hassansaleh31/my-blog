import { DBConnection } from "../helpers/db";
import { Router } from "express";
import { UserService } from "../services/user_service";

export class UserRoutes {
    public router: Router;
    private userService: UserService;

    constructor(private db: DBConnection) {
        this.router = Router();
        this.userService = new UserService(this.db);
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.post('/authenticate', (req, res) => {
            this.userService.authenticate(req.body)
                .then(user => res.json(user.toJsonSigned()))
                .catch(e => res.status(e.status || 500).send(e.message))
        })
    }
}