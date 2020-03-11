const accessToken = 'ACCESS_TOKEN';
const request = require('request-promise');

export class RequestHandler {

  public LoadParisWeather = async (callback: any) => {
    const parisOptions = {
      url: "https://api.netatmo.com/api/getpublicdata?lat_ne=48.86471476180278&lon_ne=2.373046875&lat_sw=48.83579746243092&lon_sw=2.3291015625&filter=true",
      method: "GET",
      auth: {
        'bearer': accessToken
      },
      json: true
    }
  
    try {
        var result = await request(parisOptions);
        callback(null, result)
        return result;
    } catch (err) {
        callback(err, null)
        console.error(err);
    }
  }
}


//module.exports = RequestHandler