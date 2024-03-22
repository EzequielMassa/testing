import { Schema, model } from 'mongoose'
const bookingSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
		},
		soccerField: {
			type: Schema.Types.ObjectId,
			ref: 'SoccerFields',
		},
		entrada: String,
		salida: String,
		fecha: Date,

		// turnos: {
		// 	horarios: [String],
		// 	fechas: [Date],
		// },
	},

	{
		timestamps: true,
	}
)

export const BookingModel = model('Booking', bookingSchema)
