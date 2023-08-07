import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

        const { register, handleSubmit } = useForm()
        const navigate = useNavigate()

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
    return(
        <main className='form-login'>
           <Form className="form-login__data" onSubmit={handleSubmit(submit)}>
            <strong>Welcome! Enter your email and password to continue</strong>
            <p className='login-message'>You have to Log In to access to your cart</p>
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
        </main>
    )
}

export default Login