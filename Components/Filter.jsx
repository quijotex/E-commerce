import Accordion from 'react-bootstrap/Accordion';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch } from 'react-redux';
import { filterProductsByCategoryThunk } from '../src/store/slices/products';

function Filter( {categories}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => { setShow(true)}
  const dispatch = useDispatch()

  return (
    <>
      <Button className='button-cart button-filter' onClick={handleShow}>
      <i className='bx bx-filter-alt bx-sm'></i>  <span className='name-filter'>Filter</span>
      </Button>
      <Offcanvas  className="filter-modal" show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header className='close-filter' closeButton>
      <h4 className='shopping-cart__title'>Filter</h4>
      </Offcanvas.Header>
        <Offcanvas.Body className='render-cart'>
        <Accordion  alwaysOpen  className='accordion'>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Category</Accordion.Header> 
                        {
                        categories?.map( category => (
                            <Accordion.Body key={category.id } className='accordionBody'
                            onClick={() => dispatch(filterProductsByCategoryThunk(category?.id) )}   >
                            {category.name}
                            </Accordion.Body>
                                ))
                        }
                    </Accordion.Item>
                </Accordion>
        </Offcanvas.Body>
        
      </Offcanvas>
    </>
  );
}

export default Filter;