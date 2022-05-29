import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { SONG_QUERY } from "../queries/fetchSongs";
import { DELETE_SONG_QUERY } from "../queries/deleteSong";

const SongList = () => {
  const { data, loading, refetch } = useQuery(SONG_QUERY);
  const [deleteSong] = useMutation(DELETE_SONG_QUERY);

  const handleDelete = (id) => {
    console.log("id", id);
    deleteSong({ variables: { id } });
    refetch();
  };

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="collection">
          {data.songs.map(({ id, title }) => (
            <li key={id} className="collection-item">
              <Link to={`/songs/${id}`}>{title}</Link>
              <i className="material-icons" onClick={() => handleDelete(id)}>
                delete
              </i>
            </li>
          ))}
        </ul>
      )}
      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default SongList;
