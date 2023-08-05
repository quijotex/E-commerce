import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductsCard from '/Components/ProductsCard'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProductsThunk, filterProductsByCategoryThunk  } from '../store/slices/products';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

const Home = () => {
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    const [ categories, setCategories ] = useState([])
    const [ searchValue, setSearchValue ] =useState("")
    
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
                <Row>

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
                    <Col md={8} lg={9}>Lista de productos
                    <Row>
                        <Col>
                        <InputGroup className="mb-3">
                            <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            
                            />
                           <Button>Buscar</Button>
                        </InputGroup>
                        </Col>
                    </Row>
                        <Row xs={1} md={2} lg={3}>
                            {
                                products?.map(item => (
                                    <Col key={item.id}>
                                    <ProductsCard data={item}/>
                                    </Col>
                                    )
                                )
                            }
                            <Col>
                            <ProductsCard />
                            </Col>
                            <Col>
                            <ProductsCard />
                            </Col>
                            <Col>
                            <ProductsCard />
                            </Col>
                        </Row>
                   </Col>
                </Row>
            
        </main>
    )
}

export default Home