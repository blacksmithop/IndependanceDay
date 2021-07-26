const express = require('express')
require('dotenv').config()
const axios = require('axios').default
const app = express()



/*async function getPlayerDetails(username, platform) {
    console.log(`User: ${username} (${platform})`)
    let URL = `https://api.mozambiquehe.re/bridge?version=5&platform=${platform}&player=${username}&auth=${process.env.apexKey}`;
    await axios
      .get(URL)
      .then(function (response) {
        // handle success
        console.log(`Status: ${response.status}`)
        console.log(response.data)
        return response.data
      })
  }*/
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


app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})