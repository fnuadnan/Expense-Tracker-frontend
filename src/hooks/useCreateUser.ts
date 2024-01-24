import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useStore from "../store";


interface User {
    name: string,
    email: string,
    password: string
}

const useCreateUser = () => {
    const setError = useStore(s => s.setError);

    return useMutation<User, any, User>({
        mutationFn: (user: User) =>
            axios
                .post('http://localhost:3000/api/users', user)
                .then(res => {
                    const token = res.headers['x-auth-token'];
                    console.log(token)
                    localStorage.setItem('x-auth-token', token);
                    axios.defaults.headers.common['x-auth-token'] = token;
                    
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

export default useCreateUser;