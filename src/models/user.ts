import { QueryArrayResult } from "pg";
import { UserRoles } from "./user_roles";
import { sign } from 'jsonwebtoken';

export class User {
    username: string;
    password: string;
    name: string;
    role: UserRoles;
    token: string;

    constructor(userData: UserData) {
        this.username = userData.username;
        this.password = userData.password;
        this.name = userData.name;
        this.role = userData.role;
        this.token = userData.token;
    }

    static fromQuery(query: QueryArrayResult): User[] {
        return query.rows.map(res => {
            return new User({
                username: res['username'],
                password: res['password'],
                name: res['name'],
                role: UserRoles.parse(res['role']),
            });
        })
    }

    toJson() {
        return {
            username: this.username,
            name: this.name,
            role: this.role?.value
        }
    }

    toJsonSigned() {
        const json = this.toJson()
        const _token: string = sign(json, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 });
        return { ...json, token: _token }
    }
}

interface UserData {
    username: string;
    password: string;
    name: string;
    role: UserRoles;
    token?: string;
}