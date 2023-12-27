import { configureStore } from '@reduxjs/toolkit'
import isLoading from './slices/isLoading'
import products from './slices/products'
import purchases from './slices/purchases'

export default configureStore({
    reducer: {
        isLoading,
        products,
        purchases
    }
})