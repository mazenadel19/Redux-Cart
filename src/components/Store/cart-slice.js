import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
	items: [],
	totalQuantity: 0,
	changed: false,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		replaceCart(state, action) {
			state.totalQuantity = action.payload.totalQuantity
			state.items = action.payload.items
		},

		addItemtoCart(state, action) {
			state.changed = true
			const newItem = action.payload
			const existingItem = state.items.find(item => {
				console.log(current(item), 'item', newItem, 'newItem')
				return item.id === newItem.id
			})
			state.totalQuantity++
			if (!existingItem) {
				console.log('!existingItem')
				state.items.push({
					id: newItem.id,
					name: newItem.title,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
				})
			} else {
				// console.log(current(existingItem), 'existingItem')
				existingItem.quantity++
				existingItem.totalPrice = existingItem.price * existingItem.quantity
			}
			// console.log('state', current(state))
		},

		removeItemtoCart(state, action) {
			state.changed = true
			const id = action.payload
			const existingItem = state.items.find(item => item.id === id)
			state.totalQuantity--
			// console.log(current(existingItem), 'existingItem')
			if (existingItem.quantity !== 1) {
				existingItem.quantity--
				existingItem.totalPrice = existingItem.price * existingItem.quantity
			} else {
				state.items = state.items.filter(item => item.id !== id)
			}
		},
	},
})

export const cartActions = cartSlice.actions
export default cartSlice
