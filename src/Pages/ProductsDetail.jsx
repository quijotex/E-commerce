import { useParams } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { filterProductsByCategoryThunk } from "../store/slices/products";
import { useSelector, useDispatch } from "react-redux";
import { Col, ListGroup, Row, Container }from "react-bootstrap";
import Card from 'react-bootstrap/Card';

const ProductsDetail = () => {

     const { id } = useParams()
     const [ productDetail, setProductDetail ] = useState({}) 
     const allproducts = useSelector(state => state.products)
     const dispatch = useDispatch()

     useEffect(() => {
        getDetail()
     }, [])

     const getDetail = () => {
        axios
        .get( `https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
        .then(resp => {console.log(resp.data); setProductDetail(resp?.data);
         dispatch(filterProductsByCategoryThunk(resp.data.category.id))})
        .catch(error => console.error(error))
     }
    return(
        <main>

            <Container>
            <h1>{productDetail.title}</h1>
            <p>{productDetail.price}</p>
            <p>{productDetail.brand}</p>
            <p>{productDetail.createdAt}</p>
            <p>{productDetail.updatedAt}</p>
            <Button>Comprar</Button>
        
            <Row>
                <Col>
                <img src={productDetail.images?.[0].url} alt=""/>
                <p className="text-mutd">{productDetail.description}</p>
                </Col>
                </Row>
                <Row>
                
                <h2>Discover similar items</h2>
               
                    {
                        allproducts.map(product => (
                            <Col>
                                 <Card className="card-detail" key={product.id} style={{ width: '18rem' }}>
                                        <Card.Img className="card-detail__img" variant="top" src={product?.images[0]?.url} />
                                        <Card.Body>
                                            <Card.Title>  {product?.brand}</Card.Title>
                                            <Card.Text>
                                            {product?.title}
                                            </Card.Text>
                                            <Card.Text>
                                            Price
                                            </Card.Text>
                                            <Card.Text>
                                            {product?.price}
                                            </Card.Text>
                                            <Button variant="primary">Go somewhere</Button>
                                        </Card.Body>
                                 </Card>
                                 </Col>
                        ))
                    }
           
              
                </Row>
            </Container>
        </main>
    )
}

export default ProductsDetail