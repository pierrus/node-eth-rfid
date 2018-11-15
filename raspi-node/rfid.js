import rfid from 'node-rfid';

export default (onReadCallback) => {
  listen(onReadCallback);
}

function listen(onReadCallback) {
  console.log('Waiting for RFID....');
  rfid.read(function(err, result) {
    if (err) console.log ('RFID read error');
    else {
      //console.log (result);
      if (onReadCallback)
        onReadCallback(result);
    }

    //setTimeout(function() { listen(); }, 1000);
  });
}