import { useDispatch } from 'react-redux'
import classes from './CartButton.module.css'
import { cartActions } from '../Store/cart-slice'

const CartButton = props => {
	const dispatch = useDispatch()

	const cartVisisblityHandler = () => {
		dispatch(cartActions.toggleCartVisibilit())
	}

	return (
		<button className={classes.button} onClick={cartVisisblityHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>1</span>
		</button>
	)
}

export default CartButton
