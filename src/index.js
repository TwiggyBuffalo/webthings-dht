const dhtLib = require('node-dht-sensor');
const {
  Thing,
  Value,
  Property,
} = require('webthing');

const config = {
  id: 'urn:dev:ops:dht-22-sensor',
  name: 'DHT-22',
  description: 'Ambient temperature & humidity sensor',
  interval: 3000,
  sensor: {
    type: 22,
    pin: 4,
  },
  properties: {
    temperature: {
      '@type': 'TemperatureProperty',
      title: 'Temperature',
      type: 'number',
      description: 'The ambient temperature measured in °C',
      unit: 'degree celcius',
      readOnly: true,
    },
    humidity: {
      '@type': 'HumidityProperty',
      title: 'Humidity',
      type: 'number',
      description: 'The current relative humidity in %',
      minimum: 0,
      maximum: 100,
      unit: 'percent',
      readOnly: true,
    }
  }
}

const WebThingsDHT = (opt = config) => {
  const read = () => {
    const { type, pin } = opt.sensor
    return dhtLib.read(type, pin)
  }
  const { id, name, description, properties, interval } = this.opt
  const dht = new Thing(id, name, ['Temperature', 'Humidity'], description);
  const dht_temperature = new Value(0.0);
  const dht_humidity = new Value(0.0);
  dht.addProperty(new Property(dht, 'temperature', dht_temperature, properties.temperature));
  dht.addProperty(new Property(dht, 'humidity', dht_humidity, properties.humidity));
  setInterval(() => {
    try {
      const { temperature, humidity } = read()
      // Update the underlying value, which in turn notifies all listeners
      dht_temperature.notifyOfExternalUpdate(temperature);
      dht_humidity.notifyOfExternalUpdate(humidity);
    } catch (e) {
      console.log(e)
    }
  }, interval);
  return dht
}

module.exports = WebThingsDHT