import { Navigate } from "react-router-dom";

const Logout = () => {
    // logout and clear user data
    localStorage.clear();
    console.log("User logged out. Redirecting to login page.");
    
    return (
        <div><Navigate to="/" /></div>
    )
}

export default Logout