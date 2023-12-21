import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../helpers/getConfig';
import { setIsLoading } from './isLoading';

export const purchasesSlice = createSlice( {
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            return action.payload
        }
    }
}
)
export const getPurchasesThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios
    .get("https://app-ecommerce-0oc8.onrender.com/cart", getConfig())
    .then(resp => dispatch( setPurchases(resp?.data)))
    .catch(error => console.error(error))
    .finally(() => dispatch(setIsLoading(false)))
}
export const addPurchaseThunk = data  => dispatch => {
    dispatch(setIsLoading(true))
        axios
        .post('https://app-ecommerce-0oc8.onrender.com/cart/', data,    getConfig())
        .then(() => dispatch(getPurchasesThunk()))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
   }
export const updatePurchasesThunk = (id, newQuantity) => dispatch => 
{
    dispatch(setIsLoading(true))
    const body = {
        quantity : newQuantity
    }
    axios
    .put(`https://app-ecommerce-0oc8.onrender.com/cart/${id}`, body, getConfig())
    .then(() => dispatch(getPurchasesThunk() ))
    .catch(error => console.error(error))
    .finally(() => dispatch(setIsLoading(false)))
}
export const deletePurchasesThunk = (id) => dispatch =>
{
    dispatch(setIsLoading(true))
    axios
    .delete(`https://app-ecommerce-0oc8.onrender.com/cart/${id}`, getConfig())
    .then(() => dispatch(getPurchasesThunk() ))
    .catch(error => console.error(error))
    .finally(() => dispatch(setIsLoading(false)))
}
export const purchaseCartThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios
        .post("https://app-ecommerce-0oc8.onrender.com/purchases", {}, getConfig())
        .then(() => dispatch(getPurchasesThunk()))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}
export const { setPurchases } = purchasesSlice.actions;
export default purchasesSlice.reducer; 