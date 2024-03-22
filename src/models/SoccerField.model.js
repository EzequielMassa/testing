import { Schema, model } from 'mongoose'
const soccerFieldSchema = new Schema(
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

export const SoccerFieldModel = model('SoccerField', soccerFieldSchema)
