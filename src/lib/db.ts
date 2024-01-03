import postgres from 'postgres'

let sql: postgres.Sql;

// @ts-expect-error - day 2 of the year and i dont want to miss a green square
if (!sql) {
    sql = postgres({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        // neon does'nt have port
        port: parseInt(process.env.DB_PORT ?? "5432"),
        database: process.env.DB_DATABASE,
        ssl: 'allow'
    });
}

export default sql;