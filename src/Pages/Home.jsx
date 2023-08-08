import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductsCard from '/Components/ProductsCard'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProductsThunk, filterProductsByCategoryThunk, filterProductsByNameThunk  } from '../store/slices/products';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

const Home = () => {
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    const [ categories, setCategories ] = useState([])
    const [ searchValue, setSearchValue ] = useState("")
    

    useEffect(() =>{
        dispatch( getProductsThunk())
        getCategories()
    }, [] )

    const getCategories = () => {

        axios
        .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
        .then( resp => setCategories(resp?.data))
        .catch(error => console.error(error))
    }

    return(
        <main>
            <Row className='home-row'>
                <Col md={4} lg={3}>
                    <ListGroup>
                        {
                            categories?.map( category => (
                                <ListGroup.Item key={category.id}
                                onClick={() => dispatch(filterProductsByCategoryThunk(category.id) )}>
                                    {category.name}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>
                <Col md={8} lg={9} className='col-product-list'>
                    <Row>
                        <Col>
                            <InputGroup className="searcher">
                                <Form.Control
                                placeholder="What are you looking for?"
                                id='IdSearch'
                                value={searchValue}
                                onChange={e => setSearchValue(e.target.value)}
                                />
                            <Button  onClick={() => dispatch(filterProductsByNameThunk(searchValue) )} className='searcher-button'><i className='bx bx-search'></i></Button>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row  xs={1} md={2} lg={3}>
                            {products?.map(product => (
                                <Col className="li-products"  key={product.id}>
                                    <Card className="card-product__detail" >
                                        <a className="card-product__anchor" href={`#/products/${product.id}`} > 
                                        <div className="card-product__images">
                                        <Card.Img className="card-detail__img1" variant="top" src={product?.images[0]?.url} />
                                        <Card.Img className="card-detail__img2" variant="top" src={product?.images[1]?.url} />
                                        </div>
                                        <Card.Body className="card-product__body">
                                            <Card.Title> <span className="card-body__gray card-body__gray--brand">{product?.brand}</span> </Card.Title>
                                            <Card.Text>
                                            <span className="card-body__bold">{product?.title}</span> 
                                            </Card.Text>
                                            <div className="card-product__price">
                                                <Card.Text>
                                                    <span className="card-body__gray">Price</span>
                                                </Card.Text>
                                                <Card.Text>
                                                    <span className="card-body__bold">{product?.price}</span> 
                                                </Card.Text>
                                            </div>
                                        </Card.Body>
                                        </a>
                                        <div className="card-product__button" >
                                        <Button variant="primary"><i className='bx bx-cart'></i></Button>
                                        </div>
                                     </Card>
                                </Col>
                                    )
                                )
                            }
                    </Row>
                 </Col>
            </Row>
            
        </main>
    )
}

export default Home