import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

function AppNav() {
  return (
    <Navbar className="navigation" >
      <Container className='navigation__container'>
        <Navbar.Brand as={ Link } className="navigation__title" to="/">e-commerce</Navbar.Brand>
          <Nav className="navigation-nav">
            <Nav.Link as={ Link } className='navigation-nav__link' to="/login"><i className='bx bx-user bx-sm'></i></Nav.Link>
            <Nav.Link as={ Link } className='navigation-nav__link' to="/purchases"><i className='bx bx-store bx-sm cart-color' ></i></Nav.Link>
            <Nav.Link as={ Link } className='navigation-nav__link' href="#link"><Sidebar/></Nav.Link>
          </Nav>
       
      </Container>
    </Navbar>
  );
}

export default AppNav;