const axios = require("axios");

const knex = require("../database/connection");

const { returnIdFromUsername } = require("../model/User");

const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAxLCJlbWFpbCI6ImNhZHVtYXZlcmlja0BlbWFpbC5jb20iLCJyb2xlIjoxLCJpYXQiOjE2MjA0Mjc1Nzd9.XpzU9eeA-Z_GcmtSgtStkSYgMR855sOLrwRESEMWpjw";

test("Should FIND ALL users, return an array of users greater than zero and status true", async () => {
  const axiosResult = await axios({
    headers: {
      Authorization: `Bearer ${bearerToken}`
    },
    url: "http://localhost:5001/users",
    method: "get",
  });

  const userData = axiosResult.data;
  // console.log(userData);
  // console.log(userData.status);
  // console.log(userData.users);

  expect(userData.users.length).toBeGreaterThan(0);
  expect(userData.status).toEqual(true);
});

test("Should FIND ONE user, return only an user and array must be equals to one and status true", async () => {
  const axiosResult = await axios({
    headers: {
      Authorization: `Bearer ${bearerToken}`
    },
    url: "http://localhost:5001/user/201",
    method: "get"
  });

  const userData = axiosResult.data;
  // console.log(userData);

  expect(userData.userById.length).toEqual(1);
  expect(userData.status).toEqual(true);
});

test("Should CREATE an user and return status true", async () => {
  const axiosResult = await axios({
    headers: {
      Authorization: `Bearer ${bearerToken}`
    },
    url: "http://localhost:5001/user",
    method: "post",
    data: {
      firstName: "Jest",
      lastName: "Test",
      username: "jesttest",
      email: "jesttest@email.com",
      password: "jest",
      role: -1
    }
  });

  const userData = axiosResult.data;

  // console.log(userData);

  expect(userData.success).toEqual("User has been registered");
  expect(userData.status).toEqual(true);
});

test("Should UPDATE an user and return status true", async () => {
  const username = "jesttest";

  const idReturned = await returnIdFromUsername(username);
  // console.log(idReturned);

  const axiosResult = await axios({
    headers: {
      Authorization: `Bearer ${bearerToken}`
    },
    url: `http://localhost:5001/user/${idReturned}`,
    method: "put",
    data: {
      firstName: "test test",
      lastName: "jest jest",
      role: 1,
    }
  });

  const userData = axiosResult.data;
  // console.log(userData);

  expect(userData.success).toEqual("User has been updated");
  expect(userData.status).toEqual(true);
});

test("Should DELETE an user and return status true", async () => {
  const username = "jesttest";

  const idReturned = await returnIdFromUsername(username);
  // console.log(idReturned);

  const axiosResult = await axios({
    headers: {
      Authorization: `Bearer ${bearerToken}`
    },
    url: `http://localhost:5001/user/${idReturned}`,
    method: "delete"
  });

  const userData = axiosResult.data;
  // console.log(userData.status);

  //jest don't finish the execution without database connection was closed
  await knex.destroy();

  expect(userData.status).toEqual(true);
});