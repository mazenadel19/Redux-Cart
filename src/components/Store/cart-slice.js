import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isCartVisible: true,
}

const cartSlice = createSlice({
	name: 'cartSlice',
	initialState,
	reducers: {
		toggleCartVisibilit(state) {
			state.isCartVisible = !state.isCartVisible
		},
	},
})

console.log(cartSlice)

export const cartActions = cartSlice.actions
export default cartSlice.reducer
