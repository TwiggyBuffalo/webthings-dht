<h1 align="center">☁️ WebThings DHT</h1>
<div align="center">
  <strong>A simple module for using DHT sensors in [Mozilla WebThings](https://iot.mozilla.org/framework/)</strong>
</div>
<br>

<h2>Table of Contents</h2>
<details>
  <summary>Table of Contents</summary>
  <li><a href="#about">About</a></li>
  <li><a href="#install">Install</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contribute">Contribute</a></li>
  <li><a href="#license">License</a></li>
</details>

## About

This module is a small wrapper (Less than 700 bytes) around the [node-dht-sensor](https://github.com/momenso/node-dht-sensor) that provides a single line config to integrate with the [Mozilla WebThings Framework](https://iot.mozilla.org/framework/)

## Install

With package manager:

```sh
$ npm install --save webthings-dht
# OR
$ yarn add webthings-dht
```

## Usage

This example shows a zero config server:

```js
	var WebThingServer = require('webthing').WebThingServer
	var WebThingDHT = require('webthings-dht') // import the webthings-dht module
	var thing = new WebThingDHT() // Instanciate with no config
	var server = new WebThingServer(new SingleThing(thing), 8888);
	server.start().catch(console.error);
```

You can configure the module as follows:

```js
new WebThingDHT({
	id: 'urn:dev:ops:dht-22-sensor',
  name: 'DHT-22',
  description: 'Ambient temperature & humidity sensor',
  interval: 3000, // The invterval for fetching readings from the sensor
  sensor: {
    type: 22, // DHT sensor type. See node-dht-sensor
    pin: 4, // DHT sensor GPIO pin number. See node-dht-sensor
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

// Use as normal
```

## Contribute

Contributions are welcome. Please open up an issue or create PR if you would like to help out.

## License

Licensed under the MIT License.