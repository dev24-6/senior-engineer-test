import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
    const [username, setUserName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [retypePassword, setRetypePassword] = useState()

    const baseURL = `${import.meta.env.VITE_SERVER_URL}/api/register`;
    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();

        password === retypePassword ? 
        (
            axios.post(baseURL, { username, email, password })
            .then(result => console.log(result))
            .catch(err => console.log(err))
        ) 
        : alert("Passwords do not match");
    }

    return (
        <div>
            <form onSubmit={registerUser}>
                <div>
                    <input 
                        type="text"
                        name="username"
                        placeholder="Enter a user name"
                        autoComplete="off"
                        required
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Enter a valid email"
                        autoComplete="off"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        autoComplete="off"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                        type="password"
                        name="retype-password"
                        placeholder="Retype the password"
                        autoComplete="off"
                        required
                        onChange={(e) => setRetypePassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" className="button-submit">Register</button>
                </div>
            </form>
                <div>
                    <p>Already have an account?&nbsp;
                        <Link to="/">Login</Link>
                    </p>
                </div>
        </div>
    )    
}

export default Register;