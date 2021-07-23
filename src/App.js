import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import Notification from './components/UI/Notification'
import { fetchCartData, sendCartData } from './components/Store/cart-actions'

let initalRender = true

function App() {
	const isCartVisible = useSelector(state => state.ui.isCartVisible)
	const notification = useSelector(state => state.ui.notification)
	const cart = useSelector(state => state.cart)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCartData())
	}, [dispatch])

	useEffect(() => {
		if (initalRender) {
			initalRender = false
			return
		}
		if (cart.changed) dispatch(sendCartData(cart))
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
