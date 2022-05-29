import { useMutation } from "@apollo/client";

import { SONG_BY_ID_QUERY } from "../queries/fetchSongById";
import { LIKE_LYRIC_QUERY } from "../queries/likeLyric";

const LyricList = ({ lyrics, id }) => {
  const [likeLyric] = useMutation(LIKE_LYRIC_QUERY, {
    refetchQueries: [{ query: SONG_BY_ID_QUERY, variables: { id } }],
  });

  const handleLike = ({ id }) => {
    likeLyric({ variables: { id } });
  };

  return (
    <ul className="collection">
      {lyrics.map(({ content, id, likes }) => (
        <li key={id} className="collection-item">
          {content}
          <i
            className="material-icons"
            onClick={() => handleLike({ id })}
            style={{ color: likes ? "green" : "grey" }}
          >
            thumb_up
          </i>
        </li>
      ))}
    </ul>
  );
};

export default LyricList;
