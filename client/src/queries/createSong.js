import { gql } from "@apollo/client";

export const ADD_SONG_QUERY = gql`
  mutation AddSongQuery($title: String!) {
    addSong(title: $title) {
      title
    }
  }
`;
