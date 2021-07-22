import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import { uiActions } from './components/Store/ui-slice'
import Notification from './components/Store/Notification'

let initalRender = true

function App() {
	const isCartVisible = useSelector(state => state.ui.isCartVisible)
	const notification = useSelector(state => state.ui.notification)
	const cart = useSelector(state => state.cart)

	const dispatch = useDispatch()

	useEffect(() => {
		const sendingCartData = async () => {
			dispatch(
				uiActions.showNotification({
					status: 'pending',
					title: 'Sending...',
					message: 'Sending cart data!',
				}),
			)
			const response = await fetch(
				'https://redux-cart-demo1-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
				{
					method: 'PUT',
					body: JSON.stringify(cart),
				},
			)

			if (!response.ok) throw new Error('SENDING CART DATA FAILED!')

			dispatch(
				uiActions.showNotification({
					status: 'succes',
					title: 'Success!',
					message: 'Sent cart data Successfully!',
				}),
			)
		}
		if (initalRender) {
			initalRender = false
			return
		}

		sendingCartData().catch(e => {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Fail!',
					message: 'Failed to send cart data!',
				}),
			)
		})
	}, [cart, dispatch]) // react-redux ensure that dispatch never change so it won't trigger useEffect

	return (
		<>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{isCartVisible && <Cart />}
				<Products />
			</Layout>
		</>
	)
}

export default App
