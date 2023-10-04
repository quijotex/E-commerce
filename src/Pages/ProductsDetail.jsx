import { useParams, Link } from "react-router-dom"
import axios, { all } from 'axios'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { filterProductsByCategoryThunk } from "../store/slices/products";
import { addPurchaseThunk } from "../store/slices/purchases";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Container }from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

const ProductsDetail = () => {

     const { id } = useParams()
     const [ productDetail, setProductDetail ] = useState({}) 
     const [index, setIndex] = useState(0);
     const [ quantity, setQuantity ] = useState(1)

     const allproducts = useSelector(state => state.products)
     const dispatch = useDispatch()
    
   
     useEffect(() => {
        getDetail()
     }, [id])

     const getDetail = () => {
        axios
        .get( `https://ecommerce-app-backend-ezn6.onrender.com/products/${id}`)
        .then(resp => { setProductDetail(resp?.data);
         dispatch(filterProductsByCategoryThunk(resp?.data?.category?.id))})
        .catch(error => console.error(error))
     }

     const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0})
     }

     const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex)
     }

     const addProduct = () => {
        const data = {
            quantity: quantity,
            productId: productDetail?.id
        }
        dispatch( addPurchaseThunk( data))
     }

     const addCartProduct = ( item ) => {
        const data = {
            quantity: 1,
            productId: item
        }
       
        dispatch( addPurchaseThunk( data ))
    }
     
    
    return(
        <main>
            <Container className="container-detail">
             
                <nav className="nav">
                <Link to="/" className="home-link">
                <p>Home</p>
                </Link>
                <div className="separator"/>
                <p className="name-product">{productDetail.title}</p>
                </nav>
                 <Row className="first-row">
                    <Col className="first-columns">
                        <Carousel className="carousel " interval={null} indicators={false} activeIndex={index} onSelect={handleSelect}>
                                {productDetail?.images?.map(img => (
                                     <Carousel.Item  key={img?.id}>
                                    <img 
                                    className="show-img"
                                    src={img?.url} 
                                    alt=""
                                    />
                                    </Carousel.Item>
                                ))}    
                        </Carousel>
                        <div className="gallery-mini">
                               {productDetail?.images?.map((mini, i) => (
                                   <img  key={mini?.id} className="show-mini"
                                    src={mini?.url} 
                                    alt=""
                                    onClick={() => setIndex(i)}/>
                                ))
                                }
                        </div>
                    </Col>
                    <Col className="first-columns">
                    <div className="view-main">
                        <p className="cart-product--brand">{productDetail?.brand}</p>

                        <h2 className="cart-product cart-product--title">{productDetail?.title}</h2>

                        <p className="cart-description">{productDetail?.description}</p>

                        <div className="price-quantity">
                            <div className="price-quantity--price">
                                <h3>Price</h3>
                                <p className="cart-product cart-product--amount">$ {productDetail?.price}</p>
                            </div>

                            <div className="price-quantity__quantity">
                                <p>Quantity</p>
                                <div className="price-quantity__buttons">
                                    <button onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1 }><i className='bx bx-minus'></i></button>
                                    <span className="quantity__amount">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)}><i className='bx bx-plus' ></i></button>
                                </div>

                            </div>

                        </div>

                        <Button onClick={addProduct}className="cart-product__buy"><span>Add to cart</span><i className='bx bx-cart bx-sm'></i></Button>
             </div>


                <div className="view-responsive">
                <p className="cart-product--brand">{productDetail?.brand}</p>

                        <h2 className="cart-product cart-product--title">{productDetail?.title}</h2>

                        <div className="price-quantity">

                            <div className="price-quantity--price">
                                <h3>Price</h3>
                                <p className="cart-product cart-product--amount">$ {productDetail?.price}</p>
                            </div>
                            <div className="price-quantity__quantity">
                                <p>Quantity</p>
                                <div className="price-quantity__buttons">
                                    <button onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1 }><i className='bx bx-minus'></i></button>
                                    <span className="quantity__amount">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)}><i className='bx bx-plus' ></i></button>
                                </div>

                            </div>

                        </div>
                        <Button onClick={addProduct}className="cart-product__buy"><span>Add to cart</span><i className='bx bx-cart bx-sm'></i></Button>

                        <p className="cart-description">{productDetail?.description}</p>
                </div>
                    </Col>
                </Row>
                 <Row className="second-row">
                    <strong className="related-title"> Discover similar items</strong>
                    {allproducts?.map(product => (
                        <Col lg={6} xl={4}className="card-product" key={product?.id}>
                       
                            <Card className="card-product__detail" >
                                <a className="card-product__anchor" href={`#/products/${product.id}`} onClick={scrollToTop}> 
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
                                    <Button onClick={() => addCartProduct(product?.id)} variant="primary"><i className='bx bx-cart'></i></Button>
                                 </div>
                             </Card>
                         </Col>
                        )
                      )
                    }
                </Row>
            </Container>
        </main>
    )
}

export default ProductsDetail