import { configDotenv } from "dotenv"

configDotenv({quiet:true})

export const ENV = {
    MONGO_URI:process.env.MONGO_URI,
    PORT:process.env.PORT,
    JWT_SECRET:process.env.JWT_SECRET,
    ADMIN:process.env.ADMIN,
    Admin_Password:process.env.Admin_Password,
    CLOUD_NAME:process.env.CLOUD_NAME,
    CLOUD_API_KEY:process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET:process.env.CLOUD_API_SECRET,
    GEMINI_API_KEY:process.env.GEMINI_API_KEY,
    CLIENT_URL:process.env.CLIENT_URL

}