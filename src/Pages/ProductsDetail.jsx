import { useParams } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';

import { Col, Row }from "react-bootstrap";

const ProductsDetail = () => {

     const { id } = useParams()
       const [ productDetail, setProductDetail ] = useState({}) 
     useEffect(() => {
        getDetail()
     }, [])

     const getDetail = () => {
        axios
        .get( `https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
        .then(resp => setProductDetail(resp?.data))
        .catch(error => console.error(error))
     }
    return(
        <main>
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
                <Col>
               
                    {productDetail?.images?.map(image => 
                       <img key={image.id} src={image.url} />
                       )
                    }
               
                </Col>
            </Row>

        </main>
    )
}

export default ProductsDetail