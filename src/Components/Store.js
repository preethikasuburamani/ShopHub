import {configureStore} from "@reduxjs/toolkit"
import cartSliceReducer from "./CartSlice"
import WishlistSliceReducer from "./WishlistSlice"


export const store = configureStore({
    reducer: {
        cart : cartSliceReducer,

        Wishlist: WishlistSliceReducer
    }
})