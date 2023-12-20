import { useState, useEffect } from 'react';
import axios from 'axios';
import { setIsLoading } from '../store/slices/isLoading';
import { useDispatch } from 'react-redux';
import  getConfig  from '../helpers/getConfig'
import { Link } from 'react-router-dom';

const Purchases = () => {
    const dispatch = useDispatch()
    const [ purchases, setPurchases ] = useState([])

    useEffect(() => {
        dispatch(setIsLoading(true))
        axios
            .get("https://app-ecommerce-0oc8.onrender.com/purchases", getConfig())
            .then(resp => setPurchases(resp.data))
            .catch(error => console.error(error))
            .finally(() => dispatch(setIsLoading(false)))
    }, [])
    //Funcion cambio de formato de fecha
    const changeDate=(date)=>{
        let  changed= new Date(date)
        let mounth = changed.getUTCMonth() + 1;
    let day= changed.getUTCDate();
    let year = changed.getUTCFullYear();
//retorna nuevo formato de fecha
    return  mounth + '/' + day + '/' + year;
    }
    return(
        <main>
            <div className='divContTitlePurchases'>
            <nav className="nav nav-purchases">
                <Link to="/" className="home-link">
                <p>Home</p>
                </Link>
                <div className="separator"/>
                <p className="name-product">purchases</p>
                </nav>
                <div className='my-purchases'><b>My Purchases</b></div>
           
            </div>
            <ul className='ulPurchases'>
                {
                    purchases?.map( item => (
                   
                        <li className="li-purchases" key={item?.id} >
                             <div className='liPurchases'>
                            <div className='conteImgPurchases'>
                                 <img src={item?.product?.images[0]?.url} alt='' />
                            </div>
                           <div className='divTitlePurchases'>
                                 <h6>{item?.product?.title}</h6>
                            </div>
                            <div className='divDatePurcheses'>  {/* se ejecuta la funcion para cambiar el formato de la fecha */}
                                <p className="cart-product--brand">{changeDate(item?.product?.updatedAt)}</p>
                            </div>
                            <div className='quantity-purchases'><span>{item?.quantity}</span></div>
                            <div className='divPricePurchese'>
                                 <p className="cart-product cart-product--amount"> {item?.product?.price}</p>
                            </div>
                            </div>
                        </li>
                    
                    ))
                }
            </ul>
        </main>
    )
}
export default Purchases