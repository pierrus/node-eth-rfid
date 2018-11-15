import GPS from 'gps';
import SerialPort from 'serialport';

export default (updateCallback) => {
  var status = { latitude: 0, longitude: 0, online: false };
  
  var port = new SerialPort('/dev/ttyAMA0', {
    baudRate: 9600,
    parser: new SerialPort.parsers.Readline('\r\n')
  });

  var gps = new GPS();

  gps.on('data', function(data) {
    //console.log(data, gps.state);
    //console.log('lat', gps.state.lat);
    //console.log('lon', gps.state.lon);
    status.latitude = gps.state.lat;
    status.longitude = gps.state.lon;

    status.online = gps.state.lat != 0 && gps.state.lon != 0 && gps.state.lat != null && gps.state.lon != null;

    // if (updateCallback)
    // {
    //   updateCallback(status);
    // }
  });

  port.on('data', function (data) {
    gps.updatePartial(data);
  });
  
  let iv = setInterval(() => {
    if (updateCallback)
    {
      updateCallback(status);
    }
  }, 1000);
}