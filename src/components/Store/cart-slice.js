import { createSlice, current } from '@reduxjs/toolkit'
import { uiActions } from './ui-slice'

const initialState = {
	items: [],
	totalQuantity: 0,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemtoCart(state, action) {
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

export const sendCartData = cart => {
	//custome action creator aka thunk
	return async dispatch => {
		dispatch(
			uiActions.showNotification({
				// <- action creater converted by redux to {type:'UNIQUE_TYPE',payload:'...'}
				status: 'pending',
				title: 'Sending...',
				message: 'Sending cart data!',
			}),
		)

		const sendRequest = async () => {
			const response = await fetch(
				'https://redux-cart-demo1-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
				{
					method: 'PUT',
					body: JSON.stringify(cart),
				},
			)

			if (!response.ok) throw new Error('SENDING CART DATA FAILED!')
		}

		try {
			sendRequest()
			dispatch(
				uiActions.showNotification({
					status: 'succes',
					title: 'Success!',
					message: 'Sent cart data Successfully!',
				}),
			)
		} catch (e) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Fail!',
					message: 'Failed to send cart data!',
				}),
			)
		}
	}
}

export const cartActions = cartSlice.actions
export default cartSlice
