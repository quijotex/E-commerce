import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../helpers/getConfig';

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


export const addPurchaseThunk = data  => dispatch => {
        axios
        .post('https://e-commerce-api-v2.academlo.tech/api/v1/cart/', data,    getConfig())
        .then(resp => console.log(resp?.data))
        .catch(error => console.error(error))
}

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer; 