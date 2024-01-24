import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import useAuth from "../hooks/useAuth";
import useStore from "../store";

const LoginPage = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<LoginForm>({resolver: zodResolver(schema)});
    const error = useStore(s => s.error);
    const clearError = useStore(s => s.clearError);
    const {mutate} = useAuth();

    const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(data => {
        mutate(data, { onSuccess: () => {
            reset();
            clearError();
            navigate('/expenses')
        }})
    })}>
        <h2>Login</h2>
        <div className="mb-3">
          <input {...register('email')} type="text" placeholder="Email" />
        </div>
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
        <div className="mb-3">
          <input {...register('password')} type="text" placeholder="Password" />
        </div>
        {errors.password && <p className="text-danger">{errors.password.message}</p>}
        <div>
          <button className="btn btn-primary">Login</button>
        </div>
        {error && <p className="text-danger">{error}</p>}
        <div>Don't have an account? <NavLink to='/signup'>Sign Up</NavLink></div>
      </form>
  )
}

// validation
const schema = z.object({
    email: z.string().min(5, {message: 'Email must have at least 5 characters'}).max(30).email(),
    password: z.string().min(5, {message: 'Password must have at least 5 characters'}).max(15)
});
export type LoginForm = z.infer<typeof schema>;

export default LoginPage;