import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'

function App() {
	const isCartVisible = useSelector(state => state.ui.isCartVisible)
	const cart = useSelector(state => state.cart)

	useEffect(() => {
		fetch(
			'https://redux-cart-demo1-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
			{
				method: 'PUT',
				body: JSON.stringify(cart),
			},
		)
	}, [cart])

	return (
		<Layout>
			{isCartVisible && <Cart />}
			<Products />
		</Layout>
	)
}

export default App
