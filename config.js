import dotenv from "dotenv-safe";

dotenv.config({
    allowEmptyValues: true
})

export default {
    server: {
        port: process.env.PORT || 8080,
        jwtSecret: process.env.JWT_SECRET || "default_token"
    },
    database: {
        dbHost: process.env.DB_HOST || "localhost",
        dbPort: process.env.DB_PORT || 3306,
        dbName: process.env.DB_NAME || "default_database",
        dbUser: process.env.DB_USER || "root",
        dbPass: process.env.DB_PASS || null,
    }
}