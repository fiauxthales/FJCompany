var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://api.adviceslip.com/advice',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
