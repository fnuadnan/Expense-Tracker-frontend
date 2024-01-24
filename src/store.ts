import { create } from "zustand";

export const Category = ['Entertainment', 'Groceries', 'Utilities'] as const;

interface store {
    // category
    selectedCategory: typeof Category[number] | "",
    setSelectedCategory: (category: typeof Category[number] | "") => void

    // error of creatint user
    error: string,
    setError: (error: string) => void,
    clearError: () => void;
}


const useStore = create<store>(set => ({
    // category
    selectedCategory: '',
    setSelectedCategory: (category) => set(() => ({selectedCategory: category})),

    // error of creatint user
    error: '',
    setError: (error) => set(() => ({ error: error})),
    clearError: () => set({ error: '' })
}));

export default useStore;