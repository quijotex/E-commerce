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
        .then(resp => { setProductDetail(resp?.data);
         dispatch(filterProductsByCategoryThunk(resp?.data?.category?.id))})
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
                <Row  >
                
             <strong className="related-title"> Discover similar items</strong>
               
                    {
                        allproducts.map(product => (
                            <Col lg={4} className="card-product" key={product?.id}>
                                 <Card className="card-product__detail" >
                             <div className="card-product__images">
                                 <Card.Img className="card-detail__img1" variant="top" src={product?.images[0]?.url} />
                                 <Card.Img className="card-detail__img2" variant="top" src={product?.images[1]?.url} />
                              </div>
                                        <Card.Body className="card-product__body">
                                            <Card.Title> <span className="card-body__gray card-body__gray--brand">{product?.brand}</span> </Card.Title>
                                            <Card.Text>
                                           <span className="card-body__bold">{product?.title}</span> 
                                            </Card.Text>
                                        <div className="card-product__button">
                                            <div className="card-product__price">
                                            <Card.Text>
                                            <span className="card-body__gray">Price</span>
                                            </Card.Text>
                                            <Card.Text>
                                           <span className="card-body__bold">{product?.price}</span> 
                                            </Card.Text>
                                            </div>
                                            <Button variant="primary"><i className='bx bx-cart'></i></Button>
                                        </div> 
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