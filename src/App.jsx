import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Home from "./Home";
import CategorySelection from "./CategorySelection";
import NewEntry from "./NewEntry";
import NavBar from "./NavBar";
import ShowEntry from "./ShowEntry";

let newEntryId = 4;

const App = () => {
  const [entries, setEntries] = useState([
    // { id: 1, category: 1, content: "Pizza is yummy!" },
    // { id: 2, category: 2, content: "Fortnite" },
    // { id: 3, category: 3, content: "I liike to code" },
  ]);

  const [categories, setCategory] = useState([
    //   { id: 1, name: "Food" },
    //   { id: 2, name: "Gaming" },
    //   { id: 3, name: "Coding" },
    //   { id: 4, name: "Other" },
  ]);

  useEffect(() => {
    fetch("https://class-journal-api.onrender.com/categories")
      .then((res) => res.json())
      .then((data) => setCategory(data));

    fetch("https://class-journal-api.onrender.com/entries")
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, []);

  const addEntry = async (cat_id, content) => {
    // TODO: Sanitise and validate entry data
    // Create a new entry
    const NewEntry = { id: newEntryId++, category: cat_id, content: content };
    // Post newEntry to the API and receive returnedEntry
    const res = await fetch("https://class-journal-api.onrender.com/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewEntry),
    });
    const returnedEntry = await res.json();
    // Save entry to the 'local' list of entries
    setEntries([...entries, returnedEntry]);
    return returnedEntry._id;
  };

  // Higher-order Component
  const ShowEntryWrapper = () => {
    // Get id from useParams
    const { id } = useParams();
    // Get entry with the given id
    const entry = entries.find((e) => e._id == id);
    const cat = categories.find((c) => c._id == entry.category);
    return entry ? (
      <ShowEntry entry={entry.content} category={cat.name} />
    ) : (
      <h3>Entry not found!</h3>
    );
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home entries={entries} />} />
        <Route
          path="/category"
          element={<CategorySelection categories={categories} />}
        />
        <Route path="/entry">
          <Route path=":id" element={<ShowEntryWrapper />} />
          <Route
            path="new/:cat_id"
            element={<NewEntry categories={categories} addEntry={addEntry} />}
          />
        </Route>
        <Route path="*" element={<h3>Page not found!</h3>} />
      </Routes>
    </>
  );
};

export default App;
