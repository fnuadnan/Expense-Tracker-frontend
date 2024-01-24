import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Expense, NewExpense } from "./useExpense";

const useAddExpense = () => {
    const queryClient = useQueryClient();

    return useMutation<Expense, Error, NewExpense>({
        mutationFn: (newExpense: NewExpense) =>
            axios
                .post('http://localhost:3000/api/expenses/', newExpense)
                .then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['expenses']});
        }
    });
};

export default useAddExpense;