import { useMutation } from "@apollo/client";
import { useState } from "react";

import { ADD_LYRIC_QUERY } from "../queries/createLyric";
import { SONG_BY_ID_QUERY } from "../queries/fetchSongById";

const LyricCreate = ({ songId }) => {
  const [content, setContent] = useState("");
  const [createLyric] = useMutation(ADD_LYRIC_QUERY, {
    refetchQueries: [{ query: SONG_BY_ID_QUERY, variables: { id: songId } }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createLyric({ variables: { content, songId } });
    setContent("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>Add a lyric</label>
      <input value={content} onChange={(ev) => setContent(ev.target.value)} />
    </form>
  );
};

export default LyricCreate;
