import { DBConnection } from "../helpers/db";
import { User } from "../models/user";
import { compare } from 'bcrypt';
import { APIException } from "../models/api_exception";

export class UserService {
    constructor(private db: DBConnection) { }

    async authenticate(body: any): Promise<User> {
        if (!body) throw new APIException('Username or Password is missing', 400);
        const { username, password } = body;
        if (!username || !password) throw new APIException('Username or Password is missing', 400);

        const query = await this.db.query(
            'SELECT * FROM admins WHERE username = $1 LIMIT 1;',
            [username]
        )

        if (query.rowCount == 0) throw new APIException('Wrong username or password', 400);

        const user: User = User.fromQuery(query)[0];

        const isMatched = await compare(password, user.password);
        if (isMatched) return user;
        throw new APIException('Wrong username or password', 400);
    }
}