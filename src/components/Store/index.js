import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cart-slice'

//state
const store = configureStore(
	{ reducer: { cart: cartSlice } },
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // <-- redux devtools
)

export default store
