import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

  const { register, handleSubmit } = useForm();
 const navigate = useNavigate()

  const submit = data => {
    axios
    .post( "https://ecommerce-app-backend-ezn6.onrender.com/users/", data)
    .then( resp => {
        resp?.data
        alert('User was created succesfully. Now, you can log in!')
        navigate("/")
    })
    .catch(error => {console.error(error) })
}


  return (
    <Form className="form-login__data signup_data" onSubmit={handleSubmit(submit)}>
    <h2 className='signup-title'>Sign Up</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='input-label'>Email</Form.Label>
            <Form.Control className="input-login" type="email" 
            { ...register("email")} />
        
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label className='input-label'>First Name</Form.Label>
            <Form.Control  className="input-login" type="text"
             {...register("firstName")} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasiclastName">
            <Form.Label className='input-label'>Last Name</Form.Label>
            <Form.Control  className="input-login" type="text"
             {...register("lastName")} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='input-label'>Password</Form.Label>
                    <Form.Control  className="input-login" type="password"
                     {...register("password")} />
         </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label className='input-label'>Phone</Form.Label>
            <Form.Control  className="input-login" type="text"
             {...register("phone")} />
        </Form.Group>

        <Button className="button-login" variant="primary" type="submit">
            Create
        </Button>
        <div className='signup-account'><p>Already have an account? </p>
        <Link to='/login'>Login</Link></div>
</Form> 
  );
};

export default Signup;