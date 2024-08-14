import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Home from "./Home";
import CategorySelection from "./CategorySelection";
import NewEntry from "./NewEntry";
import NavBar from "./NavBar";
import ShowEntry from "./ShowEntry";
import useStore from "./store";

const newEntryId = 3

const App = () => {
  const load = useStore(state => state.load);

  useEffect(() => {
    load();
  }, []);

  // useEffect(() => {
  //   fetch("https://class-journal-api.onrender.com/categories")
  //     .then((res) => res.json())
  //     .then((data) => setCategory(data));

  //   fetch("https://class-journal-api.onrender.com/entries")
  //     .then((res) => res.json())
  //     .then((data) => setEntries(data));
  // }, []);

  // const addEntry = async (cat_id, content) => {
  //   // TODO: Sanitise and validate entry data
  //   // Create a new entry
  //   const NewEntry = { id: newEntryId++, category: cat_id, content: content };
  //   // Post newEntry to the API and receive returnedEntry
  //   const res = await fetch("https://class-journal-api.onrender.com/entries", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(NewEntry),
  //   });
  //   const returnedEntry = await res.json();
  //   // Save entry to the 'local' list of entries
  //   setEntries([...entries, returnedEntry]);
  //   return returnedEntry._id;
  // };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route
          path="/category"
          element={<CategorySelection />}
        />
        <Route path="/entry">
          <Route path=":id" element={<ShowEntry/>} />
          <Route
            path="new/:cat_id"
            element={<NewEntry/>}
          />
        </Route>
        <Route path="*" element={<h3>Page not found!</h3>} />
      </Routes>
    </>
  );
};

export default App;
