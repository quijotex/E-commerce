import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function AppNav() {
  return (
    <Navbar className="navigation" >
      <Container className='navigation__container'>
        <Navbar.Brand className="navigation__title" href="/#/">e-commerce</Navbar.Brand>
          <Nav className="navigation-nav">
            <Nav.Link className='navigation-nav__link' href="#home"><i className='bx bx-user bx-sm'></i></Nav.Link>
            <Nav.Link className='navigation-nav__link' href="#link"><i className='bx bx-store bx-sm' ></i></Nav.Link>
            <Nav.Link  className='navigation-nav__link' href="#link"><i className='bx bx-cart bx-sm' ></i></Nav.Link>
          </Nav>
       
      </Container>
    </Navbar>
  );
}

export default AppNav;