
import useCategoryStore, { Category } from "../store"

const ExpenseFilter = () => {
    const setSelectedCategory = useCategoryStore(s => s.setSelectedCategory);

  return (
    <select onChange={(event) => setSelectedCategory(event?.target.value as typeof Category[number])} className="form-select" id="category">
        <option value="">All categories</option>
        {Category.map(category => <option value={category} key={category}>{category}</option>)}
    </select>
  )
}

export default ExpenseFilter