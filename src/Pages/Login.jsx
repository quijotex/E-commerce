import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import UserLogIn from '../assets/UserLogIn.svg'
import getConfig from '../helpers/getConfig';
import { useState } from 'react';

const Login = () => {

        const { register, handleSubmit } = useForm()
        const navigate = useNavigate()
        const [ user, setUser ] = useState({})

        const submit = data => {
            axios
            .post( "https://e-commerce-api-v2.academlo.tech/api/v1/users/login", data)
            .then( resp => {
                localStorage.setItem("token", resp?.data?.token)
                navigate("/")
            })
            .catch(error => {console.error(error)
            if(error.response.status === 401){
                alert("Incorrect credentials")
            }
            })
        }

        axios
        .get("https://e-commerce-api-v2.academlo.tech/api/v1/users/me", getConfig())
        .then(resp => setUser(resp?.data))
        .catch((error) => console.error(error))

        const token = localStorage.getItem("token")

        const deleteToken = () => {
            localStorage.removeItem("token")
        }

    return(
        <main className='form-login'>
            {token ? 
            <div className="logout-view">
                <div className='info-logout info-logout--adjust'>
                <div>
                    <img src={UserLogIn} alt=''/>
                </div>
                <b>{user.firstName} {user.lastName}</b>
                <Link to='/login' onClick={deleteToken}>Log out</Link>
                </div>
            </div>
                :
          <Form className="form-login__data" onSubmit={handleSubmit(submit)}>
            <strong>Welcome! Enter your email and password to continue</strong>
            <p className='login-message'>You have to Log In to access to your cart</p>
            <div className='test-data'>
                <b>Test data</b>
                <div className='data-access'>
                    <p><i className='bx bx-envelope'></i> john@gmail.com</p>
                    <p><i className='bx bx-lock-alt' ></i>john1234</p>
                </div>
            </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='input-label'>Email</Form.Label>
                    <Form.Control className="input-login" type="email" 
                    { ...register("email")} />
                    <Form.Text className="text-muted">
                  
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='input-label'>Password</Form.Label>
                    <Form.Control  className="input-login" type="password"
                     {...register("password")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    
                </Form.Group>
                <Button className="button-login" variant="primary" type="submit">
                    Login
                </Button>
    </Form> 
}
        </main>
    )
}

export default Login