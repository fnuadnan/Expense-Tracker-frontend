import axios from "axios";
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = localStorage.getItem('x-auth-token');
                if (!token) {
                    setIsAuthenticated(false);
                    setIsLoading(false);  // Update loading state
                    return;  // Break out of the function
                }

                const response = await axios.get('http://localhost:3000/api/auth/verifytoken', {headers: {'x-auth-token': token}});

                setIsAuthenticated(response.data.isValid);

            } catch (error) {
                console.error('Error verifying token', error);
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        }
        verifyToken();
    }, []);

    if (isLoading) return <div>Loading...</div>; 
    if (!isAuthenticated) return <Navigate to='/login' />;
    return <Outlet />;
  
}

export default PrivateRoutes