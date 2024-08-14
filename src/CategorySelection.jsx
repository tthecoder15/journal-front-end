import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStore from "./store";

const CategorySelection = () => {
  const categories = useStore(state => state.categories)

  return (
    <>
      <h3>Select a category</h3>
      <ul>
        {categories.map((cat) => (
          <li>
            <Link to={`/entry/new/${cat._id}`}>{cat.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CategorySelection;
