import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Input from './components/Input';

export default function App() {
    const [user, setUser] = useState({ username: '', password: '' });
    const [registerResponse, setRegisterResponse] = useState('');
    const [loginResponse, setLoginResponse] = useState('');

    const register = async (e) => {
        e.preventDefault();
        // Write your register code here
        console.log("event", user)

        const {username, password} = user

        const userDetails = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        })

        const res = await userDetails.json()

        // console.log("res", res.user.username)

        const registeredUsername = await res.user.username

        setRegisterResponse(`Welcome ${registeredUsername}`)

        // console.log("userdetails" ,userDetails)

        // console.log("registerresponse", registerResponse)
    };

    const login = async (e) => {
        e.preventDefault();
        // Write your login code here
        const {username, password} = user

        const res = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        })

        // console.log("response", res)

        const token = await res.json()

        setLoginResponse(token)

        localStorage.setItem('password', token)

        console.log("storage", localStorage.getItem('password'))

        // console.log("token?", token)
        
    };

    // QUESTION 1 - The user has logged in and now has a valid bearer token saved in local storage. Which header do we need to put this token into when requesting a protected resource from a server?
    // ANSWER - Authorization

    // QUESTION 2 - Imagine the below code gets profile information for a user by ID but requires a valid token to access. What would you add to include the token from local storage?
    // ANSWER - Below 

    // const JWT = localStorage.getItem('password')
    // fetch('http://localhost:4000/user-profile/1', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json', 'Authorization': JWT
        //     }
        // })




    // You can safely ignore everything below this line, it's just boilerplate
    // so you can focus on the exercise requirements

    const handleChange = (e) => {
        const { value, name } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    }

    return (
        <div className="App">

            <h1>Register</h1>

            <Form
                handleSubmit={register}
                inputs={[
                    <Input
                        key={1}
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={user.username}
                        handleChange={handleChange}
                    />,
                    <Input
                        key={2}
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={user.password}
                        handleChange={handleChange}
                    />
                ]}
            />

            {registerResponse && <p>{registerResponse}</p>}

            <h1>Login</h1>

            <Form
                handleSubmit={login}
                inputs={[
                    <Input
                        key={1}
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={user.username}
                        handleChange={handleChange}
                    />,
                    <Input
                        key={2}
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={user.password}
                        handleChange={handleChange}
                    />
                ]}
            />

            {loginResponse && <p>{loginResponse}</p>}

        </div>
    );
}
