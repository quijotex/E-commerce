import { useState, useEffect } from 'react';
import axios from 'axios';
import { setIsLoading } from '../store/slices/isLoading';
import { useDispatch } from 'react-redux';
import  getConfig  from '../helpers/getConfig'

const Purchases = () => {

    const dispatch = useDispatch()
    const [ purchases, setPurchases ] = useState([])

    useEffect(() => {
        dispatch(setIsLoading(true))
        axios
            .get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", getConfig())
            .then(resp => setPurchases(resp.data))
            .catch(error => console.error(error))
            .finally(() =>   dispatch(setIsLoading(false)))
    }, [])
    return(
        <main>
            <h1>Purchases</h1>
            <ul>
                {
                    purchases?.map( item => (
                        <li key={item.id}>
                            <img src={item?.product?.images[0]?.url} />
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}

export default Purchases