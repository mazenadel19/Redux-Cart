import { uiActions } from './ui-slice'
import { cartActions } from './cart-slice'

export const fetchCartData = () => {
	return async dispatch => {
		const fetchData = async () => {
			const response = await fetch(
				'https://redux-cart-demo1-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
			)

			if (!response.ok) throw new Error('FETCHING CART DATA FAILED!')

			const data = await response.json()

			return data
		}

		try {
			const cartData = await fetchData()

			dispatch(
				cartActions.replaceCart({
					items: cartData.items || [],
					totalQuantity: cartData.totalQuantity,
				}),
			)
		} catch (e) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Fail!',
					message: 'Fetching cart data failed!',
				}),
			)
		}
	}
}

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
					body: JSON.stringify({
						items: cart.items,
						totalQuantity: cart.totalQuantity,
					}),
				},
			)

			if (!response.ok) throw new Error('SENDING CART DATA FAILED!')
		}

		try {
			await sendRequest()
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
