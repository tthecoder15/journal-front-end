import React from "react";
import { Link } from "react-router-dom";
import useStore from "./store";

const Home = () => {
  const entries = useStore(state => state.entries)

  return (
    <>
      <h2 className="my-2">Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li>
            <Link to={`/entry/${entry._id}`}>{entry.content}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
