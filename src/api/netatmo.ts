import {WeatherInfos} from '../infos'

const accessToken = 'YOUR_ACCESS_TOKEN_HERE';

const request = require('request-promise');

const parisURL = "https://api.netatmo.com/api/getpublicdata?lat_ne=48.86471476180278&lon_ne=2.373046875&lat_sw=48.83579746243092&lon_sw=2.3291015625&filter=true"
const newYorkURL = "https://api.netatmo.com/api/getpublicdata?lat_ne=40.97989806962013&lon_ne=-81.5625&lat_sw=38.82259097617712&lon_sw=-81.5625&filter=true"
const berlinURL = "https://api.netatmo.com/api/getpublicdata?lat_ne=52.3755991766591&lon_ne=13.7109375&lat_sw=52.26815737376817&lon_sw=13.53515625&filter=true"
const bogotaURL = "https://api.netatmo.com/api/getpublicdata?lat_ne=5.266007882805492&lon_ne=-75.234375&lat_sw=4.915832801313174&lon_sw=-75.5859375&filter=true"

const urls = []
urls.push(parisURL, newYorkURL, berlinURL, bogotaURL)

export class RequestHandler {

  /** Load the Data from the API, turns it into Promises**/
  public LoadData = (callback: any) => {
    
    var results = urls.map( async (url: String) =>  {
      const options = {
        url: url,
        method: "GET",
        auth: {
          'bearer': accessToken
        },
        json: true
      }
    
      try {
          var result = await request(options);
          return result
      } catch (err) {
          callback(err, null)
      }
    })

    callback(null, results)
    return results
  }

  /** Parse the Data from the API, turns it into an array of WeatherInfos**/
  public ParseData = (callback: any) => {

    this.LoadData( (err: Error, results: Promise<any>[]) => {
      if(err)
      {
        console.error('Error while loading data')
        callback(err, null)
      } else {
        // We wait the return of each promise (the data for each city)
        var allInfos = [];

        results.map( (result: Promise<any>) => {
          result.then( (data: any) => {
              
              var infos = new WeatherInfos();

              // We only get the informations of a random station in our app
              var body =  data.body[4]

              if(body)
              {
                infos.city = body.place.city

                // Getting the mesures of the random station (temperature, humidity, pressure)
                var measures = body.measures
                for (var key in measures) {
                    if (measures.hasOwnProperty(key)) {
                        var response = measures[key].res;
                        for (var key2 in response) {
                            if (response.hasOwnProperty(key2)) {
                                var values = response[key2]
                                if(values.length == 2){
                                    infos.temperature = values[0]
                                    infos.humidity = values[1]
                                } else {
                                    infos.pressure = values[0]
                                }
                            }
                        }
                    }
                }
              } else {
                console.error("Missing Data")
              }

              console.log(infos)
              allInfos.push(infos);

              // If we have all the responses
              if(allInfos.length === results.length){
                callback(null, allInfos)
              }

          })
        })
      }
    })    
  }
}