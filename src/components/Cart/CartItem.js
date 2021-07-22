import classes from './CartItem.module.css'
import { cartActions } from '../Store/cart-slice'
import { useDispatch } from 'react-redux'

const CartItem = props => {
	const { title, quantity, total, price, id } = props.item

	const dispatch = useDispatch()
	// cartActions

	const increaseHandler = () => {
		dispatch(cartActions.addItemtoCart({ title, price, id }))
	}

	const decreseHandler = () => {
		dispatch(cartActions.removeItemtoCart(id))
	}
	return (
		<li className={classes.item}>
			<header>
				<h3>{title}</h3>
				<div className={classes.price}>
					${total.toFixed(2)}{' '}
					<span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
				</div>
			</header>
			<div className={classes.details}>
				<div className={classes.quantity}>
					x <span>{quantity}</span>
				</div>
				<div className={classes.actions}>
					<button onClick={decreseHandler}>-</button>
					<button onClick={increaseHandler}>+</button>
				</div>
			</div>
		</li>
	)
}

export default CartItem
