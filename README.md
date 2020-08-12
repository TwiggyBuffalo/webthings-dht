<h1 align="center">☁️ WebThings DHT ☁️</h1>
<div align="center">
  <strong>A simple module for using DHT sensors in Mozilla WebThings</strong>
</div>
<br>

<details>
  <summary>Table of Contents</summary>
  <li><a href="#about">About</a></li>
  <li><a href="#install">Install</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contribute">Contribute</a></li>
  <li><a href="#license">License</a></li>
</details>

## About

This module is a small wrapper (~500 bytes) around the [node-dht-sensor](https://github.com/momenso/node-dht-sensor) made as simple as possible for the [Mozilla WebThings Framework](https://iot.mozilla.org/framework/)

## Install

With package manager:

```sh
$ npm install webthings-dht
# OR
$ yarn add webthings-dht
```

## Usage

This example shows a zero config server:

```js
	import { WebThingServer } from 'webthing';
 	import WebThingDHT from 'webthings-dht';
 
	const dhtSensor = new WebThingDHT();
 	const server = new WebThingServer(new SingleThing(dhtSensor), 8888);

	server.start().catch(console.error);
```

The default config is:

```js
const config = {
  id: 'urn:dev:ops:dht-22-sensor',
  name: 'DHT-22',
  description: 'Ambient temperature & humidity sensor',
  interval: 3000, // The invterval for fetching readings from the sensor (3s)
  sensor: {
    type: 22, // DHT sensor type. See node-dht-sensor (11 || 22)
    pin: 4, // GPIO pin number
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
})
```

## Contribute

Contributions are welcome. Please open up an issue or create PR if you would like to help out.

## License

Licensed under the MIT License.
