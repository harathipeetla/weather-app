const express = require('express')
const axios = require('axios')
const cors = require('cors')
const path = require('path')
const app = express()
const port = 3000 

const API_KEY = 'a4a2865f2504c54b9f626652e89a4f9d'
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/weather', async (req, res)=>{
    const city = req.query.city

    if(!city){
        return res.status(400).json({error: 'City is required'})
    }

    try {

        const response = await axios.get(API_URL, {
            params:{
                q:city,
                appid:API_KEY,
                units:'metric'
            },
        })

        if(response.data.cod !== 200){
            return res.status(response.data.cod).json({error:response.data.message})

        }
        const weatherData = response.data 

        res.json({
            name: weatherData.name,
            sys: weatherData.sys,
            main: weatherData.main,
            weather: weatherData.weather,
            wind: weatherData.wind

        })
        
    } catch (error) {
        console.log('Error fetching weather data: ', error)
        res.status(500).json({error: 'Failed to fetch the data'})
    }
})


app.listen(port, ()=>{
    console.log(`Weather runnign at http://localhost:${port}`)
})