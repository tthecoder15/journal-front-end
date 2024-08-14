import { create } from "zustand";

const useStore = create(set => {
    return {
        load: async () => {
            const categories = await (await fetch("https://class-journal-api.onrender.com/categories")).json()
            const entries = await (await fetch("https://class-journal-api.onrender.com/entries")).json()
            set({ categories, entries })
        },
        entries: [],
        setEntries: (entries) => {
            // passed in entries is new a list of all entries to set it to
            set(state => ({entries: entries}))
        },
        categories: [],
        setCategories: categories => {
            set (state => ({ categories: categories}))
        },
        addEntry: async (cat_id, content) => {
            // TODO: Sanitise and validate entry data
            // Create a new entry
            const newEntry = { category: cat_id, content: content };
            // Post newEntry to the API and receive returnedEntry
            const res = await fetch("https://class-journal-api.onrender.com/entries", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newEntry),
            });
            const returnedEntry = await res.json();
            // Save entry to the 'local' list of entries
            set(state => ({entries: [...state.entries, returnedEntry]}));
            return returnedEntry._id
        }
    }
})

export default useStore