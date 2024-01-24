import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Category } from "../store";

export interface Expense {
    id: number,
    description: string,
    amount: number,
    category: typeof Category[number] 
}
export type NewExpense = Omit<Expense, 'id'>;

const useExpense = () => {
    return useQuery<Expense[], Error, Expense[]>({
        queryKey: ['expenses'],
        queryFn: () => 
            axios
                .get<Expense[]>('http://localhost:3000/api/expenses')
                .then(res => res.data)
        });
};

export default useExpense;