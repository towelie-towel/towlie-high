import { Pool } from 'pg';

let conn: Pool;

// @ts-expect-error shut-up
if (!conn) {
    conn = new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? "5432"),
        database: process.env.DB_DATABASE,
    });
}

export { conn };