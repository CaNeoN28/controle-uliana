import mongoose from "mongoose";
import * as dotenv from "dotenv"

dotenv.config()

const {DB_URL = ""} = process.env

async function dbConnect() {
	await mongoose.connect(DB_URL)
}

export default dbConnect