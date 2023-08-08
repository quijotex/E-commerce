
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

      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='render-cart'>
           
          {
            purchases?.map( product => (
                <li  key={product?.id}>
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
                    <p>Total</p>
                    <span>Cantidad</span>

                   
                </li>
                
            ))
          }
         
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;