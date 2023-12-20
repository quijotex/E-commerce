
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector, useDispatch } from 'react-redux';
import { getPurchasesThunk, updatePurchasesThunk, deletePurchasesThunk, purchaseCartThunk } from '../src/store/slices/purchases';
import { useNavigate } from 'react-router-dom';
import cart from '../src/assets/cart.svg';
import minus from '../src/assets/minus.svg';
import plus from '../src/assets/plus.svg';
import trash from '../src/assets/trash.svg';

function Sidebar() {
  const [show, setShow] = useState(false);

  const purchases = useSelector(state => state.purchases)
  const navigate = useNavigate()
 

  const handleClose = () => setShow(false);
  const handleShow = () => {
    const token = localStorage.getItem("token")
    if(token) {
        setShow(true)
    } else {
        navigate('/')
    }
    
}
  const dispatch = useDispatch()
  

  useEffect(() => {
    dispatch(getPurchasesThunk())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const incrementProduct = updateProducts => {
    dispatch( updatePurchasesThunk( updateProducts?.id, updateProducts?.quantity + 1))
  }
  const decrementProduct = updateProducts => {
    if( updateProducts.quantity > 1) {
    dispatch( updatePurchasesThunk( updateProducts?.id, updateProducts?.quantity - 1 ))
    }
  }

  const amount =  purchases.map(purchase => purchase?.quantity * purchase?.product?.price)
  
  const deletePurchase = (id) => {
    dispatch(deletePurchasesThunk(id))
  }

  return (
    <>
      <Button className='button-cart' onClick={handleShow} >
      <img src={cart} alt='cart' />
      </Button>
      <Offcanvas  className="shopping-cart" show={show} onHide={handleClose} placement='end'>
       
        <Offcanvas.Body className='render-cart'>
           <h4 className='shopping-cart__title'>Shopping cart</h4>
          {
            purchases?.map( product => (
                <li className='render-cart__list' key={product?.id}>
                    <div className='cart-modal'>
                     <img src={product?.product?.images[0]?.url} alt=''/>
                        <div className='cart-modal__buttons'>
                            <p>{product?.product?.title}</p>
                            <div className='cart-modal__quantity'>
                                <Button className='cart__quantity' onClick={() => decrementProduct(product)}><img src={minus} alt='minus'/></Button>
                                <span className="cart__amount">
                                    {product?.quantity}
                                </span>
                                <Button className='cart__quantity' onClick={() => incrementProduct(product)}><img src={plus} alt='plus'/></Button>
                            </div>
                        </div>
                    <button onClick={() => deletePurchase(product?.id)} className='modal-button__delete'><img src={trash} alt='trash'/></button>
                    </div>
                    <div className='total-cart'>
                        <p>Total:</p>
                        <b>{product?.product?.price * product?.quantity}</b>
                    </div>
                </li>
             
                ))
            }
            <div className='checkout'>
                <div className='checkout-total'>
                    <p>Total:</p>
                    <b>{amount?.reduce((a, b) => a + b, 0 )}</b>
                </div>
            <button onClick={() => dispatch( purchaseCartThunk())}className='checkout-button'>Checkout</button>
             </div>
        </Offcanvas.Body>
        
      </Offcanvas>
    </>
  );
}

export default Sidebar;