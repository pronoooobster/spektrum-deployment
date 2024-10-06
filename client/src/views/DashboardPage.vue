<template>
    <v-app style="margin: 0;">
        <v-row style="margin: 0;" class="computer-hide">
            <v-col style="margin: 0;">
                <h1 style="color: #356859; margin-top: 20px" class="dm-serif-display-regular text-center">cropify</h1>
                <v-divider style="color: #356859"></v-divider>
                <v-chip style="margin-left: 40px; margin-top: 30px; margin-bottom: 30px" color="green" outlined>📍 {{this.city}}, {{ this.county }}</v-chip>
                <!-- a card for the current weather -->
                <v-card
                    outlined
                    elevation="2"
                    max-width=""
                    class="temperature-card"
                >
                    <v-card-title>
                        <h2 style="font-size: 1.5em; color: #3b763d; text-align: left">{{ this.city }}</h2>
                    </v-card-title>
                    <v-img :src="weather.weatherIconUrl" width="40%" class="img"></v-img>
                    <v-card-title>
                        <h2 style="font-size: 2em; color: #3b763d; text-align:left">{{ weather.temperature }}°C</h2>
                    </v-card-title>
                    <v-card-subtitle>
                        <h3 style="font-size: 1.5em; color: #3b763d; text-align:left">{{ this.weather.weatherDescription }}</h3>
                        <h3 style="font-size: 1.25em; color: #3b763d; text-align: left">Max: {{ this.weather.temperatureMax }}°C, Min: {{ this.weather.temperatureMin }}°C</h3>
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
                                <h2 style="font-size: 1.5em; color: #135eab; text-align:left">Humidity: {{ weather.humidity }}%</h2>
                            </v-card-title>
                        </v-col>
                    </v-row>
                    <v-card-subtitle>
                        <h3 style="font-size: 1.25em; color: #135eab; text-align:left">Wind Speed: {{ this.weather.windSpeed }} m/s</h3> 
                        <h3 style="font-size: 1.25em; color: #135eab; text-align:left">Wind Direction: {{ this.weather.windDirection }}°</h3>
                    </v-card-subtitle>
                </v-card>
                <!-- loading skeleton for the events card -->
                <v-skeleton-loader v-if="nearbyEventsLoading" class="mx-auto loading-skeleton"
                max-width="80%" type="card"></v-skeleton-loader>
                <!-- card displaying the nearby events or saying that there is none-->
                <Transition>
                <v-card
                    v-if="!nearbyEventsLoading"
                    outlined
                    elevation="2"
                    max-width=""
                    class="event-card"
                >
                    <v-card-title>
                        <h2 style="font-size: 1.5em; color: #827c5b; text-align:left">Nearby Events</h2>
                    </v-card-title>
                    <v-card-subtitle>
                        <h3 style="font-size: 1.25em; color: #827c5b; text-align:left">Within 700km radius</h3>
                    </v-card-subtitle>
                        <v-row>
                            <v-col>
                                <v-list  style="background-color: #fffbe6" v-if="nearbyEvents.length > 0">
                                    <v-list-item v-for="event in nearbyEvents" :key="event.id">
                                        <v-list-item-content>
                                            <v-alert
                                                style="background-color: rgba(255, 0, 0, 0.5);"
                                                shaped
                                                text
                                                type="warning"
                                            >
                                            <v-list-item-title style="text-align:left">{{ event.title }}</v-list-item-title>
                                            <v-list-item-subtitle style="text-align:left">{{ event.categories[0].title }}</v-list-item-subtitle>
                                            </v-alert>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                <v-alert v-if="nearbyEvents.length <= 0"
                                    color="green"
                                    shaped
                                    text
                                    type="success"
                                    style="margin-top: 20px;
                                    margin-bottom: 10px;
                                    margin-left: 10px;
                                    margin-right: 10px;"
                                >
                                    No events nearby within the last 60 days.
                                </v-alert>
                            </v-col>
                        </v-row>
                </v-card>
            </Transition>
            </v-col>
        </v-row>
        <!-- for the screen wider 1024px, render all cards in one row -->
        <v-row style="margin: 0;" align="center" justify="center" class="phone-hide">
            <v-col style="margin: 0;">
                <!-- <h1 style="color: #356859; margin: auto; margin-top: 20px" class="dm-serif-display-regular text-center">cropify desktop</h1> -->
                <!-- <v-divider style="color: #356859"></v-divider> -->
                <v-chip style="margin: 40px; margin-top: 10px; margin-bottom: 30px" color="green" outlined>📍 {{this.city}}, {{ this.county }}</v-chip>
                <v-card
                    outlined
                    elevation="2"
                    max-width=""
                    class="temperature-card"
                >
                    <v-card-title>
                        <h2 style="font-size: 1.5em; color: #3b763d; text-align: left">{{ this.city }}</h2>
                    </v-card-title>
                    <v-img :src="weather.weatherIconUrl" width="40%" class="img"></v-img>
                    <v-card-title>
                        <h2 style="font-size: 2em; color: #3b763d; text-align:left">{{ weather.temperature }}°C</h2>
                    </v-card-title>
                    <v-card-subtitle>
                        <h3 style="font-size: 1.5em; color: #3b763d; text-align:left">{{ this.weather.weatherDescription }}</h3>
                        <h3 style="font-size: 1.25em; color: #3b763d; text-align: left">Max: {{ this.weather.temperatureMax }}°C, Min: {{ this.weather.temperatureMin }}°C</h3>
                    </v-card-subtitle>
                </v-card>
            </v-col>
            <v-col>
                <v-card
                    outlined
                    elevation="2"
                    max-width=""
                    class="humidity-card"
                >
                    <v-row style="height: fit-content;" align="center">
                        <v-col>
                            <v-card-title>
                                <h2 style="font-size: 1.5em; color: #135eab; text-align:left">Humidity: {{ weather.humidity }}%</h2>
                            </v-card-title>
                        </v-col>
                    </v-row>
                    <v-card-subtitle>
                        <h3 style="font-size: 1.25em; color: #135eab; text-align:left">Wind Speed: {{ this.weather.windSpeed }} m/s</h3> 
                        <h3 style="font-size: 1.25em; color: #135eab; text-align:left">Wind Direction: {{ this.weather.windDirection }}°</h3>
                    </v-card-subtitle>
                </v-card>
            </v-col>
            <v-col>
                <v-card
                    v-if="!nearbyEventsLoading"
                    outlined
                    elevation="2"
                    max-width=""
                    class="event-card"
                >
                    <v-card-title>
                        <h2 style="font-size: 1.5em; color: #827c5b; text-align:left">Nearby Events</h2>
                    </v-card-title>
                    <v-card-subtitle>
                        <h3 style="font-size: 1.25em; color: #827c5b; text-align:left">Within 700km radius</h3>
                    </v-card-subtitle>
                        <v-row>
                            <v-col>
                                <v-list  style="background-color: #fffbe6" v-if="nearbyEvents.length > 0">
                                    <v-list-item v-for="event in nearbyEvents" :key="event.id">
                                        <v-list-item-content>
                                            <v-alert
                                                style="background-color: rgba(255, 0, 0, 0.5);"
                                                shaped
                                                text
                                                type="warning"
                                            >
                                            <v-list-item-title style="text-align:left">{{ event.title }}</v-list-item-title>
                                            <v-list-item-subtitle style="text-align:left">{{ event.categories[0].title }}</v-list-item-subtitle>
                                            </v-alert>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                <v-alert v-if="nearbyEvents.length <= 0"
                                    color="green"
                                    shaped
                                    text
                                    type="success"
                                    style="margin-top: 20px;
                                    margin-bottom: 10px;
                                    margin-left: 10px;
                                    margin-right: 10px;"
                                >
                                    No events nearby within the last 60 days.
                                </v-alert>
                            </v-col>
                        </v-row>
                </v-card>
            </v-col>
            <!-- small text on the bottom of the page-->
            <v-col>
                <v-footer
                    color="green"
                    app
                    dark
                >
                    <v-col>
                        <v-row>
                            <v-col>
                                <v-footer-title>Cropify is more suitable for mobile devices!</v-footer-title>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-footer>
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
        nearbyEvents: [],
        nearbyEventsLoading: true,
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
        async getLocationAndWeather() {
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
        }, // end of getLocationAndWeather

        // Get the events within a set radius of the user
        // using the EONET NASA API
        async getNearbyEvents(radius) {
            axios.get(`https://eonet.gsfc.nasa.gov/api/v2.1/events?days=60&status=open`)
                .then((response) => {
                    this.nearbyEvents = response.data.events.filter((event) => {
                        if (event.geometries[0].type === 'Point') {
                            const eventLatitude = event.geometries[0].coordinates[1];
                            const eventLongitude = event.geometries[0].coordinates[0];
                            const distance = this.calculateDistance(this.latitude, this.longitude, eventLatitude, eventLongitude);
                            return distance <= radius;
                        }
                        return false;
                    });
                    this.nearbyEventsLoading = false;
                    // console.log(this.nearbyEvents);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, // end of getEvents

        // function to calculate the distance between two points in km
        calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371; // Radius of the earth in km
            const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
            const dLon = this.deg2rad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
                ;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c; // Distance in km
            return d;
        }, // end of calculateDistance

        // function to convert degrees to radians
        deg2rad(deg) {
            return deg * (Math.PI / 180);
        }, // end of deg2rad
    },
    mounted() {
        this.nearbyEventsLoading = true;
        this.getLocationAndWeather().then(() => {
            this.getNearbyEvents(2000); // RADIUS HERE
        });
    },
    components: {
    },
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');

.temperature-card {
    margin: 0 auto;
    padding: 10px;
    width: 80%;
    text-align: center;
    background-color: #DCEDC8;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;

    /* styling for the big screen */
    /* @media (min-width: 1024px) {
        width: 30%;
    } */
}

.phone-hide {
    @media (max-width: 1024px) {
        display: none;
    }
}

.computer-hide {
    @media (min-width: 1024px) {
        display: none;
    }
}

.loading-skeleton {
    margin: auto;
    margin-top: 40px;
    margin-bottom: 60px;
    width: 80%;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 2s;
}

.humidity-card {
    margin: auto;
    margin-top: 40px;
    padding: 10px;
    width: 80%;
    text-align: center;
    background-color: #A7C7E7;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
}

.event-card {
    margin: auto;
    margin-top: 40px;
    margin-bottom: 60px;
    padding: 10px;
    width: 80%;
    text-align: center;
    background-color: #fffbe6;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 2s;
    animation: fadeIn 2s;
}
.img {
    display: block;
    margin-right: auto;
}

.dm-serif-display-regular {
    font-family: "DM Serif Display", serif;
    font-size: 3em;
    font-weight: 400;
    font-style: normal;
  }

/* transitions */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>