import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCreateUser from "../hooks/useCreateUser";
import useStore from "../store";
import { NavLink, useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const createUser = useCreateUser();
    const error = useStore(s => s.error);
    const clearError = useStore(s => s.clearError);
    const {register, handleSubmit, formState: {errors}, reset} = useForm<SignUpForm>({resolver: zodResolver(schema)});

    const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(data => {
      createUser.mutate(data, { 
        onSuccess: () => {
          clearError();
          reset(); 
          navigate('/expenses');
        }})
      })}>
      <h2>Sign Up</h2>
      <div className="mb-3">
        <input {...register('name')} type="text" placeholder="Name" />
      </div>
      {errors.name && <p className="text-danger">{errors.name.message}</p>}
      <div className="mb-3">
        <input {...register('email')} type="text" placeholder="Email" />
      </div>
      {errors.email && <p className="text-danger">{errors.email.message}</p>}
      <div className="mb-3">
        <input {...register('password')} type="text" placeholder="Password" />
      </div>
      {errors.password && <p className="text-danger">{errors.password.message}</p>}
      <div>
        <button type="submit" className="btn btn-primary">Sign up</button>
        <button className="btn btn-outline-secondary"><NavLink to="/login" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%', width: '100%' }}>Login</NavLink></button>
      </div>
      {error && <p className="text-danger">{error}</p>}
    </form>
  );
};

const schema = z.object({
    name: z.string().min(3, {message: 'Age must have at least 3 characters'}).max(30),
    email: z.string().min(5, {message: 'Email must have at least 5 characters'}).max(30).email(),
    password: z.string().min(5, {message: 'Password must have at least 5 characters'}).max(15)
});
type SignUpForm = z.infer<typeof schema>;

export default SignUpPage;
