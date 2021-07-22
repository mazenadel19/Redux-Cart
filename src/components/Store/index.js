import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cart-slice'
import uiSlice from './ui-slice'

//state
const store = configureStore(
	{ reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer } },
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // <-- redux devtools
)

export default store
