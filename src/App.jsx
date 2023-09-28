import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login';
import Purchases from './Pages/Purchases';
import ProductsDetail from './Pages/ProductsDetail';
import AppNav from '../Components/AppNav';
import Container from "react-bootstrap/Container";
import Loader from '../Components/Loader'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProtectedRoutes from '../Components/ProtectedRoutes';
import FooterLayout from '../Components/FooterLayout';
import Signup from './Pages/Signup';

function App() {

  const isLoading = useSelector(state => state.isLoading)
  

  return (
    <HashRouter>
         <AppNav />
      <Container>
        <Routes>
            <Route element={<FooterLayout/>}>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login />} />
              <Route path='/signup' element={<Signup/>} />
              <Route path="/products/:id" element={<ProductsDetail />} />
              <Route element={ <ProtectedRoutes/> }> 
                <Route path="/purchases" element={<Purchases />} />
              </Route>
          </Route>
          
        </Routes>
      </Container>

      {isLoading && <Loader />}
    </HashRouter>
  )
}

export default App