import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import shop from '../src/assets/shop.svg'
import user from '../src/assets/user.svg'

function AppNav( ) {

  const purchases = useSelector(state => state.purchases);
  const token = localStorage.getItem("token")

  return (
    <Navbar className="navigation" >
      <Container className='navigation__container'>
        <Navbar.Brand as={ Link } className="navigation__title" to="/">e-commerce</Navbar.Brand>
          <Nav className="navigation-nav">
            <Nav.Link as={ Link } className='navigation-nav__link' to="/login"><img src={user} alt='user' /></Nav.Link>
            <Nav.Link as={ Link } className='navigation-nav__link'  to={ token ? "/purchases" : "/login"} ><img src={shop} alt='shop' /></Nav.Link> 
            <Nav.Link as={ Link } className='navigation-nav__link' to={token ? null : "/login" } >
              <Sidebar/>
              {purchases.length !== 0 ? 
              <div className='number-cart'>
              <span className='number-style'>
                {purchases.length}
                </span>
              </div>
              : ""}
              </Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}
export default AppNav;