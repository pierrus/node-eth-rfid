import RpiLeds from 'rpi-leds';

//import gpio from 'rpi-gpio';
//IMPORTANT: GPIO lib addresses gpios by name and not absolute ID
import gpio from 'gpio';

export default (gpioPin) => {
  const leds = new RpiLeds();
  
  //LED on GPIO #gpio
  const gpioLed = gpio.export(gpioPin, { direction: gpio.DIRECTION.OUT, ready: function() {
									}});

  gpioLed.set(0, function() {
    console.log("gpioLed value " + gpioLed.value);
  });

  return gpioLed;
}