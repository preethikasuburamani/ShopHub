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
        },


        //quantity add
        addQuantity(state, action) {
            let product = state.find((item) => item.id === action.payload)
            if (product) {
                product.quantity += 1
                localStorage.setItem("cart", JSON.stringify([...state]))
            }
        },

        //Quantity reduce
        minusQuantity(state, action) {
            let product = state.find((item) => item.id === action.payload)
            if (product) {
                if (product.quantity <= 1) {
                    // Remove item if quantity hits 0
                    let newcart = state.filter((item) => item.id !== action.payload)
                    localStorage.setItem("cart", JSON.stringify(newcart))
                    return newcart
                } else {
                    product.quantity -= 1
                    localStorage.setItem("cart", JSON.stringify([...state]))
                }
            }
        }
        
    }
    
})

export default cartSlice.reducer 
export const {addcart,removecart,addQuantity,minusQuantity} = cartSlice.actions
export const totalCart = (state) => state.cart.length