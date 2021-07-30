const express = require('express')
//require('dotenv').config()
const axios = require('axios').default
const app = express()
const cors = require('cors');

app.use(cors());

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const getPlayerDetails = async (username, platform) => {
  try {
      const URL = `https://api.mozambiquehe.re/bridge?version=5&platform=${platform}&player=${username}&auth=${process.env.apexKey}`;
      const resp = await axios.get(URL);
      return {content: resp.data,
            status: resp.status}
  } catch (err) {
      // Handle Error Here
      return {content: {error: "Player not found"},
        status: err.response.status}
  }
};
  
app.get('/', (req, res) => {
    res.send('✌')
  })

app.get('/stats/:username/:platform', async (req, res) => {
    let data = await getPlayerDetails(req.params.username, req.params.platform)
    res.json(data)
  })

const port = (process.env.PORT ||3000)
console.log(`App listening at Port ${port}`)

app.listen(port,"0.0.0.0")