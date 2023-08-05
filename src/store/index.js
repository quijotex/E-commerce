import { configureStore } from '@reduxjs/toolkit'
import isLoading from './slices/isLoading'
import products from './slices/products'

export default configureStore({
    reducer: {
        isLoading,
        products
    }
})