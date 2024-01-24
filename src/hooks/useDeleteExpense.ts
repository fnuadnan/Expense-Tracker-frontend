import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Expense } from "./useExpense";



const useDeleteExpense = () => {
    const queryClient = useQueryClient();

    return useMutation<Expense, Error, Expense>({
        mutationKey: ['expenses'],
        mutationFn: (expense) => 
            axios
                .delete(`http://localhost:3000/api/expenses/` + expense.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        }

    });
};
export default useDeleteExpense;