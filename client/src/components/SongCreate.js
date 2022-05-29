import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { SONG_QUERY } from "../queries/fetchSongs";
import { ADD_SONG_QUERY } from "../queries/createSong";

const SongCreate = () => {
  const [title, setTitle] = useState("");
  const [addSong] = useMutation(ADD_SONG_QUERY, {
    refetchQueries: [{ query: SONG_QUERY }],
  });

  const handleSetTitle = (e) => setTitle(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    addSong({ variables: { title } });
    setTitle("");
  };

  return (
    <div className="container">
      <Link to="/">Back</Link>
      <h3>Create a new song</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Song Title:</label>
        <input value={title} onChange={(e) => handleSetTitle(e)} />
      </form>
    </div>
  );
};

export default SongCreate;
