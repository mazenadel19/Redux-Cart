import { useDispatch, useSelector } from 'react-redux'
import classes from './CartButton.module.css'
import { uiActions } from '../Store/ui-slice'

const CartButton = props => {
	const dispatch = useDispatch()
	const totalQuantity = useSelector(state => state.cart.totalQuantity)

	const cartVisisblityHandler = () => {
		dispatch(uiActions.toggleCartVisibility())
	}

	return (
		<button className={classes.button} onClick={cartVisisblityHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>{totalQuantity}</span>
		</button>
	)
}

export default CartButton
