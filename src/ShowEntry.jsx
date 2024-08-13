import React from "react";

const ShowEntry = ({ entry, category }) => {
  return (
    <>
      <p>Posted in {category}</p>
      <h2 className="my-5 is-size-5">{entry}</h2>
    </>
  );
};

export default ShowEntry;
