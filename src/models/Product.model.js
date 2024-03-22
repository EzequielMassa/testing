import { Schema, model } from 'mongoose'
const productSchema = new Schema(
	{
		nombre: {
			type: String,
			required: true,
			minLength: 3,
			maxLength: 150,
		},
		categoria: {
			type: Schema.Types.ObjectId,
			ref: 'Categories',
			required: true,
		},
		precio: {
			type: Number,
			required: true,
			min: [1, 'El precio minimo es de $1, se ingreso ${VALUE}'],
			validate: {
				validator: (v) => v < 999999999,
				message: (props) =>
					`El valor debe ser menor a 999999999, se ingreso ${props.value}`,
			},
		},
		imagen: {
			type: String,
			match: [
				/^.*\.(jpg|jpeg|png|gif|bmp)$/i,
				'Ingrese una ruta de imagen valida',
			],
		},
	},
	{
		timestamps: true,
	}
)

export const ProductModel = model('Product', productSchema)
