import {createSlice} from "@reduxjs/toolkit"

let datafromWeb = JSON.parse(localStorage.getItem("cart")) || []

const cartSlice =  createSlice({
    name: "cart",
    initialState : datafromWeb,
    reducers :{

        addcart(state,action){
            //puch product to cart
            state.push(action.payload)

            //local storage for cart
            localStorage.setItem("cart", JSON.stringify([...state]))

           
        },

        removecart(state,action){
            let removeId = action.payload
            let newcart = state.filter((product)=> product.id !== removeId)

            //local storage for cart
            localStorage.setItem("cart",JSON.stringify([...newcart]))

            return newcart  
        }

        
    }
    
})

export default cartSlice.reducer 
export const {addcart,removecart} = cartSlice.actions
export const totalCart = (state) => state.cart.length