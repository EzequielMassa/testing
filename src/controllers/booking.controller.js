import { BookingModel } from '../models/Booking.model.js'
import { ProductModel } from '../models/Product.model.js'
import { SoccerFieldModel } from '../models/SoccerField.model.js'
import { UserModel } from '../models/User.model.js'
export const getAllBookings = async (req, res) => {
	try {
		const bookings = await BookingModel.find()
		return res.status(200).json(bookings)
	} catch (error) {
		return res.status(404).json({ message: error.message })
	}
}

export const createBooking = async (req, res) => {
	try {
		const user = await UserModel.findById(req.body.user)
		console.log(user)
		const soccerField = await SoccerFieldModel.findById(req.body.soccerField)
		console.log(soccerField)
		const entrada = req.body.entrada
		const salida = req.body.salida
		const fecha = req.body.fecha
		console.log(entrada)
		const reserva = await BookingModel.create({
			user,
			soccerField,
			entrada,
			salida,
			fecha,
		})
		res.json(reserva)
	} catch (error) {
		console.log(error)
		return res.status(400).json({ message: error.message })
	}
}

export const getBookingsByDate = async (req, res) => {
	const { date } = req.params
	try {
		const bookings = await BookingModel.find({ fecha: date })
		const horasDisponibles = []
		for (let hora = 10; hora < 24; hora++) {
			horasDisponibles.push(`${hora.toString().padStart(2, '0')}:00`)
		}

		// Eliminar las horas cubiertas por las reservas existentes
		for (const reserva of bookings) {
			const indexEntrada = horasDisponibles.indexOf(reserva.entrada)
			const indexSalida = horasDisponibles.indexOf(reserva.salida)
			horasDisponibles.splice(indexEntrada, indexSalida - indexEntrada)
		}

		console.log('Horarios disponibles:', horasDisponibles)
		res.send('hola')
		// const productFound = await ProductModel.findById(id)
		// return res.status(200).json(productFound)
	} catch (error) {
		return res
			.status(404)
			.json({ message: 'No hemos podido encontrar el producto solicitado' })
	}
}

export const getProductByCategory = async (req, res) => {
	const { category } = req.params
	try {
		const productsByCategory = await ProductModel.find({
			categoria: category,
		})
		return res.status(200).json(productsByCategory)
	} catch (error) {
		return res.status(404).json({ message: error.message })
	}
}

export const getProductsSortedByPrice = async (req, res) => {
	const { sortOrder } = req.params
	try {
		const sortedProductsByPrice = await ProductModel.find().sort({
			precio: sortOrder,
		})
		return res.status(200).json(sortedProductsByPrice)
	} catch (error) {
		return res
			.status(400)
			.json({ message: `${sortOrder} no es un parametro valido` })
	}
}

export const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params
		const productFound = await ProductModel.findById(id)
		if (!productFound) {
			return res
				.status(400)
				.json({ message: `No se encontro el producto con id ${id}` })
		}
		await ProductModel.deleteOne({ _id: id })
		return res
			.status(200)
			.json({ message: `El producto con id ${id} se elimino con exito` })
	} catch (error) {
		res
			.status(400)
			.json({ message: `No se encontro el producto con id ${req.params.id}` })
	}
}

export const updateProduct = async (req, res) => {
	const { id } = req.params
	try {
		const product = await ProductModel.findById(id)
		console.log(product)
		if (!product) {
			return res.status(404).json({ message: 'Producto no encontrado' })
		}
		product.set(req.body)
		await product.save()
		res.status(200).json(product)
	} catch (error) {
		if (error.name === 'CastError') {
			return res
				.status(404)
				.json({ message: `No se encontraron productos con el id ${id}` })
		}
		res.status(500).json({ message: error.message })
	}
}
