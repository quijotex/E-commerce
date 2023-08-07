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
        <main>
           <Form onSubmit={handleSubmit(submit)}>
            <h1>Login</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" 
                    placeholder="Enter email"
                    { ...register("email")} />
                    <Form.Text className="text-muted">
                  
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                     placeholder="Password"
                     {...register("password")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
             </Form>
        </main>
    )
}

export default Login