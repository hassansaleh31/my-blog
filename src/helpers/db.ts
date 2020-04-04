import { Pool, QueryArrayResult } from 'pg';

export class DBConnection {
    private pool: Pool;

    constructor() {
        this.pool = new Pool();
    }

    query(query: string, params: any[]): Promise<QueryArrayResult> {
        return new Promise<QueryArrayResult>((resolve, reject) => {
            this.pool.query(query, params, (err, result) => {
                if (err) reject(err)
                else resolve(result)
            })
        })
    }
}