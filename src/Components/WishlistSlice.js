import { createSlice } from "@reduxjs/toolkit";

const datafronWeb = JSON.parse(localStorage.getItem("Wishlist")) || []

const WishlistSlice = createSlice({
    name:"Wishlist",
    initialState: datafronWeb,

    reducers:{
        addWhishlist(state,action){

            state.push(action.payload)
            //localstorage
            localStorage.setItem("Wishlist", JSON.stringify([...state]))

        },

        removeWishlist(state,action){
            let prodId = action.payload
            let newlist = state.filter((product)=>prodId != product.id)

            //localStorage
            localStorage.setItem("Wishlist",JSON.stringify([...newlist]))
                                  
            return newlist
        }
    }
})

export default WishlistSlice.reducer

export const { addWhishlist, removeWishlist} = WishlistSlice.actions