const satellite = require('satellite.js');

const sat = (data) => {
  const {line1, line2, date } = data;
  const ISOData = new Date(date);
  const satelliteRecord = satellite.twoline2satrec(line1, line2);
  const positionAndVelocity = satellite.propagate(satelliteRecord, ISOData);
  const gmst = satellite.gstime(ISOData);
  const positionGd = satellite.eciToGeodetic(positionAndVelocity.position, gmst);
  const {longitude, latitude, height } = positionGd;
  const longitudeStr = satellite.degreesLong(longitude);
  const latitudeStr = satellite.degreesLat(latitude);

  var result = {
    lng: longitudeStr,
    lat: latitudeStr,
    height: height
  }

  return result;
}

module.exports = sat;
