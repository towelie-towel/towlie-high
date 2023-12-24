import postgres from 'postgres'

const sql = postgres({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "5432"),
    database: process.env.DB_DATABASE,
    ssl: 'allow'
});;

export default sql;