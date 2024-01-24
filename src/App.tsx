import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import TodoList from "./components/ExpenseList";

import axios from 'axios';

const initializeAxios = () => {
  const token = localStorage.getItem('x-auth-token');
  if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
  }
};
initializeAxios();

const App = () => {
  return (
    // <LoginPage />
    <div className="container">
      <div className="mb-4">
        <ExpenseForm />
      </div>
      <div className="mb-4">
        <ExpenseFilter />
      </div>
      <div>
        <TodoList />
      </div>
    </div>
  );
};

export default App;
