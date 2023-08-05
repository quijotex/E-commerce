import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function ProductsCard({ data }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top"
       src={data?.images[0].url}
       style={{ height: 200, objectFit : "cover" }} />
      <Card.Body>
        <Card.Title>{data?.title}</Card.Title>
        <Card.Text>
          {data?.description}.
        </Card.Text>
        <Button variant="primary" 
        as={Link}
        to={`/products/${data?.id}`}>Ver detalle</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductsCard;