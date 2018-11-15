import express from 'express';
import gps from './gps';
import blink from './blink';
import gpioled from './gpioLed';
//import rc522 from 'rc522';
import rfid from './rfid';
//import example from './examples/switchExample';
//import example from './examples/erc20Example';
import gpio from 'gpio';
import ethClient from './ethereumClient';

console.log('Starting ....');

const PORT = 3030;

let app = new express();
app.set('port', PORT)


ethClient.initContract();

let latitude;
let longitude;
let scannedRfid;


let gpioRed = gpioled(16);
let gpioGreen = gpioled(13);

//RFID BUTTON

const gpioButton = gpio.export(21, { direction: gpio.DIRECTION.IN, ready: function() {
}});

gpioButton.on("change", function(val) {
    // value will report either 1 or 0 (number) when the value changes
    if (val === 1)
      return;

    console.log('rfid key pressed');

    rfid(function (result) {
        console.log (result);
        scannedRfid = result;
    });
});


//TRACKING BUTTON

const gpioButtonInit = gpio.export(26, { direction: gpio.DIRECTION.IN, ready: function() {
}});

gpioButtonInit.on("change", function(val) {
  // value will report either 1 or 0 (number) when the value changes

  if (val === 1)
    return;

  if (!scannedRfid)
  {
    console.log('Please scan RFID');
    return;
  }

  if (!longitude || !latitude)
  {
    console.log('Missing GPS coordinates');
    return;
  }

  if (val === 0)
  {
    var date = new Date();
    var timestamp = date.getTime();

    console.log('tracking key pressed ' + scannedRfid + ' latitude:' + latitude + ' longitude: ' + longitude + ' timestamp: ' + timestamp);

    ethClient.track(scannedRfid, latitude, longitude, timestamp);
  }
});


//GPS STATE

gps(function(status){
  //console.log(status);
  if (status.online)
  {
    gpioRed.set(0);
    gpioGreen.set(1);
    latitude = status.latitude;
    longitude = status.longitude;
  }
  else
  {
    gpioRed.set(1);
    gpioGreen.set(0);
  }
});



//WEB METHODS

app.listen(app.get('port'), ()=> {
  console.log(`PI-Node on port ${app.get('port')}`);
})

app.get('/blink', function (req, res) {
  res.send ('Blinking');
  console.log('Coordinates: ' + app.getCoordinates().latitude);
  app.blinkLeds();
})

app.get('/read', function (req, res) {
    rfid(function (result) {
        console.log (result);
    });
})