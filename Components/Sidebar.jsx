
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
        <Offcanvas.Body >
           
          {
            purchases?.map( product => (
                <ol  key={product?.id}>
                    <img src={product?.product?.images[0]?.url} alt=''/>
                    <Button onClick={() => decrementProduct(product)}>-</Button>
                    {product?.quantity}
                    <Button onClick={() => incrementProduct(product)}>+</Button>
                </ol>
                
            ))
          }
         
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;