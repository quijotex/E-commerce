import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { setIsLoading } from './isLoading'

export const productsSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        setProducts: (state, action ) => {
          return action.payload
          
        }

    }

})


export const getProductsThunk = () => (dispatch) => {
dispatch(setIsLoading(true))

  axios
  .get("https://app-ecommerce-0oc8.onrender.com/products")
  .then(resp => dispatch(setProducts(resp?.data)))
  .catch(error => console.error(error))
  .finally(() => dispatch(setIsLoading(false))) 

}

export const filterProductsByCategoryThunk =  id => dispatch => { 
  dispatch(setIsLoading(true))
  axios
  .get(`https://app-ecommerce-0oc8.onrender.com/products?categoryId=${id}`)
  .then(resp => dispatch(setProducts(resp?.data)))
  .catch(error => console.error(error))
  .finally(() => dispatch(setIsLoading(false)))
}

export const filterProductsByNameThunk = name => dispatch => {
  dispatch(setIsLoading(true))
  axios
  .get(`https://app-ecommerce-0oc8.onrender.com/products?title=${name}`)
  .then(resp => dispatch(setProducts(resp.data)))
  .catch(error => console.error(error))
  .finally(() => dispatch(setIsLoading(false)))
}
export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;