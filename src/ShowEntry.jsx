import React from "react";
import useStore from "./store";
import { useParams } from "react-router-dom";

const ShowEntry = () => {
  const { entries, categories } = useStore((state) => ({
    entries: state.entries,
    categories: state.categories,
  }));

  const { id } = useParams()

  const entry = entries.find((e) => e._id == id);
  const cat = entry ? categories.find((c) => c._id == entry.category) : ""; 

  return entry ? (
    <>
      <p>Posted in {cat.name}</p>
      <h2 className="my-5 is-size-5">{entry.content}</h2>
    </>
  ) : (
    <h3>Entry not found!</h3>
  );
};

export default ShowEntry;
