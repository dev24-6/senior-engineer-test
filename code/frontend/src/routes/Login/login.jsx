import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from 'bcryptjs'

function Login() {
    const [email, setEmail]       = useState();
    const [password, setPassword] = useState();
    const [error, setError]       = useState(null);

    const baseURL = `${import.meta.env.VITE_SERVER_URL}/api/login`;
    const navigate = useNavigate();

    const fetchUser = (e) => {
        e.preventDefault();

        // Hash the password before submit
        bcrypt.hash(password, 10)
        .then(hashedPassword => {
            setPassword(hashedPassword)
            console.log(hashedPassword);
        }).catch(err => console.log(err.message))

        axios.post(baseURL, { email, password })
        .then(result => {
            if (result.status === 200 & result.data !== "IC" ) {
                console.log("Login success"); // TODO: Dev time only

                // Use the browswer's local storage to keep the user ID. The user ID, and in plain text. Yikes!
                localStorage.setItem('user', result.data);

                navigate("/home");
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            <form onSubmit={fetchUser}>
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
                        placeholder="Enter password"
                        autoComplete="off"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" className="button-submit">Login</button>
                </div>
            </form>
                <div>
                    <p>Don't have an account?&nbsp; 
                        <Link to="/register">Register</Link>
                    </p>
                </div>
        </div>
    )    
}

export default Login;