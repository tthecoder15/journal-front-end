import React, { useState } from "react";
import { useParams, redirect, useNavigate } from "react-router-dom";
import useStore from "./store";

useParams;

const NewEntry = () => {
  const { categories, addEntry } = useStore((state) => ({
    categories: state.categories,
    addEntry: state.addEntry,
  }));



  const nav = useNavigate();
  const { cat_id } = useParams();
  const cat = categories.find((c) => c._id == cat_id);

  const [content, setContent] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add entry to the list of entries
    const id = await addEntry(cat._id, content);
    // Return a success message or redirect to the entry
    nav(`/entry/${id}`);
  };

  return cat ? (
    <div className="container is-fluid">
      <h2 className="my-2 is-size-5">New Entry in category {cat.name}</h2>
      <form action="">
        <div className="field">
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Type your entry here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="control">
          <button className="button is-primary" onClick={handleSubmit}>
            Create Entry
          </button>
        </div>
      </form>
    </div>
  ) : (
    <h3>No such category</h3>
  );
};

export default NewEntry;
