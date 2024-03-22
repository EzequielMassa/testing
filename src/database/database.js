import mongoose from 'mongoose'
import { MONGODB_URL } from '../config/config.js'
const url = MONGODB_URL

mongoose.connect(url)

const connection = mongoose.connection

connection.once('open', () => {
	console.log('bd connected')
})
