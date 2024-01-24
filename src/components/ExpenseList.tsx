import useDeleteExpense from "../hooks/useDeleteExpense";
import useExpense from "../hooks/useExpense"
import useCategoryStore from "../store";


const TodoList = () => {
    const {data: expenses, error, isLoading} = useExpense();
    const onDelete = useDeleteExpense();
    const selectedCategory = useCategoryStore(s => s.selectedCategory);

    if (isLoading) return <div className="spinner-circle"></div>
    if (error) return <p className="text-danger">{error.message}</p>

    const visibleExpenses = selectedCategory ? expenses?.filter(expense => expense.category === selectedCategory) : expenses;

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {visibleExpenses?.map(expense => <tr key={expense.id}>
          <td>{expense.description}</td>
          <td>{expense.amount} $</td>
          <td>{expense.category}</td>
          <td><button className="btn btn-outline-primary">Update</button></td>
          <td><button className="btn btn-outline-danger" onClick={() => onDelete.mutate(expense)}>Delete</button></td>
        </tr>)}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td colSpan={4}>{visibleExpenses?.reduce((acc, expense) => acc + expense.amount, 0)} $</td>
        </tr>
      </tfoot>
    </table>
  )
}

export default TodoList