const graphql = require("graphql");
const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} = graphql;
const { GraphQLSchema } = graphql;

const SongType = new GraphQLObjectType({
  name: "SongType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve(parent) {
        return axios
          .get(`http://localhost:3000/songs/${parent.id}/lyrics`)
          .then((res) => res.data);
      },
    },
  }),
});

const LyricType = new GraphQLObjectType({
  name: "LyricType",
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLBoolean },
    content: { type: GraphQLString },
    song: {
      type: SongType,
      resolve(parent) {
        return axios
          .get(`http://localhost:3000/songs/${parent.songId}`)
          .then((res) => res.data);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return axios.get("http://localhost:3000/songs").then((res) => res.data);
      },
    },
    song: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, { id }) {
        return axios
          .get(`http://localhost:3000/songs/${id}`)
          .then((res) => res.data);
      },
    },
    lyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnet, { id }) {
        return axios
          .get(`http://localhost:3000/lyrics/${id}`)
          .then((res) => res.data);
      },
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString },
      },
      resolve(parent, { title }) {
        return axios
          .post("http://localhost:3000/songs", { title })
          .then((res) => res.data);
      },
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID },
      },
      resolve(parent, { content, songId }) {
        console.log("parent", parent);
        console.log("content", content);

        return axios
          .post("http://localhost:3000/lyrics", { content, songId })
          .then((res) => res.data);
      },
    },
    likeLyric: {
      type: LyricType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, { id }) {
        return axios
          .patch(`http://localhost:3000/lyrics/${id}`, {
            likes: true,
          })
          .then((res) => res.data);
      },
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return axios
          .delete(`http://localhost:3000/songs/${id}`)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
