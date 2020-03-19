import {WeatherInfos} from './infos'

export const demoAllInfos = () => {
    var demoAllInfos = []
    var Paris = new WeatherInfos("Paris", 13.4, 30.0, 1013.4)
    var NewYork = new WeatherInfos("New York", 11.8, 62.4, 1015.1)
    var Berlin = new WeatherInfos("Berlin", 14, 25.2, 1011.9)
    var Bogota = new WeatherInfos("Bogota", 27.3, 42.6, 1016.2)

    demoAllInfos.push(Paris, NewYork, Berlin, Bogota)

    for(var i=0; i<0; i++) {
        var dummyCity = new WeatherInfos("Demo City", 15, 50.0, 1013.1)
        demoAllInfos.push(dummyCity)
    }

    return demoAllInfos
}

