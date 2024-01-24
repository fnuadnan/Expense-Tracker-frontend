import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAddExpense from "../hooks/useAddExpense";
import { Category } from "../store";


const ExpenseForm = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormData>({ resolver: zodResolver(schema)});
    const addExpense = useAddExpense();

  return (
    <form onSubmit={handleSubmit(data => {addExpense.mutate(data), reset()})}>
        <div>
            <label className="form-label" htmlFor="description">Description</label>
            <input {...register('description')} className="form-control" id="description" type="text" />
        </div>
        {errors.description && <p className="text-danger">{errors.description.message}</p>}
        <div>
            <label className="form-label" htmlFor="amount">Amount</label>
            <input {...register('amount', {valueAsNumber: true})} className="form-control" id="amount" type="number" />
        </div>
        {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
        <div className="mb-3">
            <label className="form-label" htmlFor="category">Category</label>
            <select {...register('category')} className="form-select" id="category">
                <option value=""></option>
                {Category.map(category => <option value={category} key={category}>{category}</option>)}
            </select>
        </div>
        {errors.category && <p className="text-danger">{errors.category.message}</p>}
        <button className="btn btn-primary">Submit</button>
    </form>
  )
};

const schema = z.object({
    description: z.string().min(2, {message: "Description must be at least 2 characters"}).max(20),
    amount: z.number({invalid_type_error: 'Amount is required'}).min(1, {message: "amount should be at least 1 $"}).max(1000),
    category: z.enum(Category, {
        errorMap: () => ({message: 'Category is required'})
    })
});

type FormData = z.infer<typeof schema>;

export default ExpenseForm