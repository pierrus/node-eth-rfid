import RpiLeds from 'rpi-leds';

//import gpio from 'rpi-gpio';
//IMPORTANT: GPIO lib addresses gpios by name and not absolute ID
import gpio from 'gpio';

export default (app) => {
  const leds = new RpiLeds();
  leds.power.turnOn();
  
  //LED on GPIO24
  const gpioLed = gpio.export(24, { direction: gpio.DIRECTION.OUT, ready: function() {
									}});

  gpioLed.set(0, function() {
    console.log("gpioLed value " + gpioLed.value);
  });    

  app.blinkLeds = () => {
    app.ledStatus = false;
    let iv = setInterval(()=>{
      if(app.ledStatus) {
        //console.log("sleepy.. so sleepy")
        leds.status.turnOff();
		gpioLed.set(0);
      } else {
        //console.log("turn on!")
        leds.status.turnOn();
		gpioLed.set();
      }
      app.ledStatus = !app.ledStatus;
    }, 500);

    setTimeout(()=>{
      clearInterval(iv);
    }, 10000)
  }

  return app;
}