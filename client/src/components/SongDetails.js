import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

import { SONG_BY_ID_QUERY } from "../queries/fetchSongById";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

const SongDetails = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(SONG_BY_ID_QUERY, { variables: { id } });

  return (
    <div className="container">
      <Link to="/">Back</Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>{data.song.title}</h3>
          <LyricList lyrics={data.song.lyrics} id={id}/>
          <LyricCreate songId={id} />
        </>
      )}
    </div>
  );
};

export default SongDetails;
