
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector, useDispatch } from 'react-redux';
import { getPurchasesThunk, updatePurchasesThunk } from '../src/store/slices/purchases';

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const purchases = useSelector(state => state.purchases)
  const dispatch = useDispatch()
  

  useEffect(() => {
    dispatch(getPurchasesThunk())
  }, [])

  const incrementProduct = updateProducts => {
    dispatch( updatePurchasesThunk( updateProducts.id, updateProducts.quantity + 1 ))
  }
  const decrementProduct = updateProducts => {
    if( updateProducts.quantity > 1) {
    dispatch( updatePurchasesThunk( updateProducts.id, updateProducts.quantity - 1 ))
    }
  }
  return (
    <>
      <Button className='button-cart' onClick={handleShow}>
      <i className='bx bx-cart bx-sm'></i>
      </Button>

      <Offcanvas  classNam="shopping-cart" show={show} onHide={handleClose} placement='end'>
       
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
                                <Button className='cart__quantity' onClick={() => decrementProduct(product)}><i className='bx bx-minus'></i></Button>
                                <span className="cart__amount">
                                    {product?.quantity}
                                </span>
                                <Button className='cart__quantity' onClick={() => incrementProduct(product)}><i className='bx bx-plus' ></i></Button>
                            </div>
                        </div>
                    <button className='modal-button__delete'><i className='bx bx-trash' style={{color: "#eb0d0d"}} ></i></button>
                    </div>
                    <div className='total-cart'>
                        <p>Total:</p>
                        <b>Cantidad</b>
                    </div>
                </li>
             
                ))
            }
            <div className='checkout'>
                <div className='checkout-total'>
                    <p>Total:</p>
                    <b>cantidad</b>
                </div>
            <button className='checkout-button'>Checkout</button>
             </div>
        </Offcanvas.Body>
        
      </Offcanvas>
    </>
  );
}

export default Sidebar;