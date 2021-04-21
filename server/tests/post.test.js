const axios = require("axios");

const knex = require("../database/connection");

const { findPostByTitle } = require("../model/Post")

const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcmxvc0BlbWFpbC5jb20iLCJyb2xlIjoxLCJpYXQiOjE2MTg2NjYxNTh9.TzrgJWj71LF_8AoStF25VYg2nHYuOJJsHTFKBI07pPg"

test("Should FIND ALL posts, return an array greater than zero and status true", async () => {
  const axiosResult = await axios({
    url: "http://localhost:5001/posts",
    method: "get"
  });
  // console.log(axiosResult);

  const axiosResultArray = axiosResult.data.result;
  // console.log(axiosResultArray.length);

  const axiosResultStatus = axiosResult.data.status;
  // console.log(axiosResultStatus);

  expect(axiosResultArray.length).toBeGreaterThan(0);
  expect(axiosResultStatus).toEqual(true);
});

test("Should FIND ONE post, return an object and status true", async () => {
  const axiosResult = await axios({
    url: "http://localhost:5001/post/5",
    method: "get"
  });
  // console.log(axiosResult);

  const axiosResultArray = axiosResult.data.postById;
  // console.log(axiosResultArray);

  const axiosResultStatus = axiosResult.data.status;
  // console.log(axiosResultStatus);

  expect(axiosResultArray.length).toEqual(1);
  expect(axiosResultStatus).toEqual(true);
});

test("Should CREATE a post and return status true", async () => {
  const axiosResult = await axios({
    headers: {
      Authorization: `Bearer ${bearerToken}`
    },
    url: "http://localhost:5001/post",
    method: "post",
    data: {
      title: "Titulo Teste",
      slug: "Slug Teste",
      body: "Corpo teste",
      user_id: 29
    }
  });
  // console.log(axiosResult);

  const axiosResultMessage = axiosResult.data.success;
  // console.log(axiosResultMessage);

  const axiosResultStatus = axiosResult.data.status;
  // console.log(axiosResultStatus);

  expect(axiosResultStatus).toEqual(true);
  expect(axiosResultMessage).toEqual("Post has been created");
});

test("Should UPDATE a post and return status true", async () => {
  const idReturned = await findPostByTitle("Titulo Teste");
  // console.log(idReturned);

  const axiosResult = await axios({
    headers: {
      Authorization: `Bearer ${bearerToken}`
    },
    url: `http://localhost:5001/post/${idReturned}`,
    method: "put",
    data: {
      title: "titulozinho",
      slug: "slug",
      body: "corpo do post atualizado"
    }
  });
  // console.log(axiosResult);

  const axiosResultMessage = axiosResult.data.success;
  // console.log(axiosResultMessage);

  const axiosResultStatus = axiosResult.data.status;
  // console.log(axiosResultStatus);

  expect(parseInt(idReturned)).toBeGreaterThan(0);
  expect(axiosResultStatus).toEqual(true);
  expect(axiosResultMessage).toEqual("Post has been updated");
});

test("Should DELETE a post and return status true", async () => {
  const idReturned = await findPostByTitle("titulozinho");
  console.log(idReturned);

  const axiosResult = await axios({
    headers: {
      Authorization: `Bearer ${bearerToken}`
    },
    url: `http://localhost:5001/post/${idReturned}`,
    method: "delete"
  });
  console.log(axiosResult);

  const axiosResultMessage = axiosResult.data.success;
  // console.log(axiosResultMessage);

  const axiosResultStatus = axiosResult.data.status;
  // console.log(axiosResultStatus);

  await knex.destroy();

  expect(parseInt(idReturned)).toBeGreaterThan(0);
  expect(axiosResultStatus).toEqual(true);
  expect(axiosResultMessage).toEqual("Post has been deleted")
});