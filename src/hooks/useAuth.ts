import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import type { LoginForm } from '../components/LogInPage';
import useStore from "../store";

interface AuthResponse {
    token: string;
}

const useAuth = () => {
    const setError = useStore(s => s.setError);

    return useMutation<AuthResponse, any, LoginForm>({
        mutationFn: (user: LoginForm) =>
            axios
                .post('http://localhost:3000/api/auth/', user)
                .then(res => {
                    // Save the token in localStorage
                    const token = res.data;
                    localStorage.setItem('x-auth-token', token);
                    
                    // Set the x-auth-token header 
                    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('x-auth-token');

                    return res.data;
                }),
        onError: (error) => {
            if (error && error.response) {
                setError(error.response.data)
            } else {
                setError("An unexpected error occured");
                console.error('Error', error)
            }
        }
    });
};

export default useAuth; 