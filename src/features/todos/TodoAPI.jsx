export function fetchTodoList() {
  console.log("im being called ");
  var axios = require("axios");
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

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  return "hey there";
}
