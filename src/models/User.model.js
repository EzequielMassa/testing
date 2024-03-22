import { Schema, model } from 'mongoose'
const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			minLength: 3,
			maxLength: 150,
		},
	},

	{
		timestamps: true,
	}
)

export const UserModel = model('User', userSchema)
