<template>
    <v-app>
        <v-row>
            <v-col>
                <h1 class="text-center">Cropify</h1>
                <v-chip color="purple" outlined>📍 {{this.city}}, {{ this.county }}</v-chip>
                <!-- add tabs -->
                <v-tabs>
                    <v-tab>Weather</v-tab>
                    <v-tab>Humidity</v-tab>
                </v-tabs>
                <!-- a card for the current weather -->
                <v-card
                    outlined
                    elevation="2"
                    max-width=""
                    class="temperature-card"
                >
                    <v-img :src="weather.weatherIconUrl" width="50%" class="img"></v-img>
                    <v-card-title>
                        <h2>{{ weather.temperature }}°C</h2>
                    </v-card-title>
                    <v-card-subtitle>
                        <h3>{{ this.weather.weatherDescription }}</h3>
                        <h3>Max: {{ this.weather.temperatureMax }}ºC</h3> <h3>Min: {{ this.weather.temperatureMin }}ºC</h3>
                    </v-card-subtitle>
                </v-card>

                <v-card
                outlined
                elevation="2"
                max-width=""
                class="humidity-card"
            >
                <v-row style="height: fit-content;" align="center">
                    <v-col>
                        <v-card-title>
                            <h2>Humidity: {{ weather.humidity }}%</h2>
                        </v-card-title>
                    </v-col>
                </v-row>
                <v-card-subtitle>
                    <h3>Wind Speed: {{ this.weather.windSpeed }}</h3> 
                    <h3>Wind Direction: {{ this.weather.windDirection }}°</h3>
                </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-app>
</template>

<!-- TO-DO: 
 Location: how it works
 Weather / Humidity Indicator API
 Imminent Danger Indicator (notifications), extreme heat or cold, etc. 

 Local area general data:
 Drought/Floods/Pests Average Sections: Use flood data pathfinder, drought monitor, and Crop-CASMA
 Harvest recommendations for the region: Use Agriculture and Water Management Pathfinder, NASA Harvest (Climate Risk Assesment)
 Diagrams: floods registered weekly-->

<script>
import axios from 'axios';

export default {
    name: 'DashboardPage',
    data: () => ({
        latitude: '',
        longitude: '',
        county: '',
        city: '',
        weather: {
            weatherDescription: '',
            weatherIconUrl: '',
            temperature: '',
            humidity: '',
            temperatureMin: '',
            temperatureMax: '',
            windSpeed: '',
            windDirection: '',
        },
    }),
    methods: {
        // Get the geographical location of the user
        getLocationAndWeather() {
            if (navigator.geolocation) {
                // if geolocation is supported by the browser
                // get it and save it in a variable
                navigator.geolocation.getCurrentPosition((position) => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    // get the county of the user
                    axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${this.latitude}&lon=${this.longitude}&format=json`)
                        .then((response) => {
                            this.county = response.data.address.county;
                            this.city = response.data.address.city;

                            // get the weather from the openweathermap api
                            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units=metric&appid=856058ff31b17aab0b98bdc1dc4af077`)
                                .then((response) => {
                                    this.weather.weatherDescription = response.data.weather[0].description;
                                    this.weather.weatherIconUrl = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
                                    this.weather.temperature = response.data.main.temp;
                                    this.weather.humidity = response.data.main.humidity;
                                    this.weather.temperatureMin = response.data.main.temp_min;
                                    this.weather.temperatureMax = response.data.main.temp_max;
                                    this.weather.windSpeed = response.data.wind.speed;
                                    this.weather.windDirection = response.data.wind.deg;
                                    console.log(this.weather);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }, (error) => {
                    console.log(error);
                }, {
                    enableHighAccuracy: true,
                    maximumAge: 10000,
                });
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        },
    },
    mounted() {
        this.getLocationAndWeather();
    },
    components: {
    },
};
</script>


<style>
body {
    background-color: #FFFBE6;
}
.temperature-card {
    margin: 0 auto;
    padding: 10px;
    width: 80%;
    text-align: center;
    background-color: #DCEDC8;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
}

.humidity-card {
    margin: 0 auto;
    padding: 10px;
    width: 80%;
    text-align: center;
    background-color: #A7C7E7;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
}
.img {
    display: block;
    margin-left: auto;
    margin-right: auto;
}

h2 {
    font-size: 2em;
    color: #ffffff;
    font-weight: bold;
}

</style>