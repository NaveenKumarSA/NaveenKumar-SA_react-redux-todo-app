var axios = require("axios");
var TEAM_LIST, USER;
const axiosRequestAuthenticaion = () => {};
/* This is to get the team  */
export const axiosGetTeam = (params) => {
  var team_list;
  var axios = require("axios");

  var config = {
    method: "get",
    url: "https://stage.api.sloovi.com/team",
    headers: {
      Authorization: `Bearer ${params}`,
    },
  };

  axios(config)
    .then(function (response) {
      console.log("team List ", response.data.results);
      team_list = response.data.results;
    })
    .catch(function (error) {
      console.log(error);
    });
  return team_list;
};
/* This is to get the user  */
const axiosGetUser = (params) => {
  var config = {
    method: "get",
    url: "https://stage.api.sloovi.com/user",
    headers: {
      Authorization: `Bearer ${params}`,
    },
  };

  axios(config)
    .then(function (response) {
      console.log("UserProfile", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
/* This is to get the auth token   */

export const handleAxios = async (params) => {
  var token, x;

  var data = JSON.stringify({
    email: "smithcheryl@yahoo.com",
    password: "12345678",
  });

  var config = {
    method: "post",
    url: "https://stage.api.sloovi.com/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      token = response.data.results.token;
      console.log(token)
      USER = axiosGetUser(token);
      TEAM_LIST = axiosGetTeam(token);
    })
    .then(() => {
      if (params === "TEAMLIST") x = TEAM_LIST;
      if (params === "USER") x = USER;
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log("x object", x);
  return x;
};

export const getApiData = (params) => {};
