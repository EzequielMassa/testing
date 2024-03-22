import { Schema, model } from 'mongoose'

const categorySchema = new Schema(
	{
		nombre: {
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

export const CategoryModel = model('Categories', categorySchema)
