import Web3 from 'web3';

let contractInstance;
let ethereumAddress;
let web3;

/// *******************************************************
//  CLIENT INITIALIZATION
/// *******************************************************
function initContract () {
  const contractAbi = JSON.parse('[ { "constant": false, "inputs": [ { "name": "_rfid", "type": "string" }, { "name": "_latitude", "type": "string" }, { "name": "_longitude", "type": "string" }, { "name": "_timestamp", "type": "uint256" } ], "name": "track", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x0decb3a6" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0x9fD9669C5Aa7Fa14c20e7d9Bae1709A602b2fe38" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x8da5cb5b" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "entries", "outputs": [ { "name": "rfid", "type": "string", "value": "[201, 94, 80, 211, 20]" }, { "name": "latitude", "type": "string", "value": "" }, { "name": "longitude", "type": "string", "value": "" }, { "name": "timestamp", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xb30906d4" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_rfid", "type": "string" }, { "indexed": false, "name": "_latitude", "type": "string" }, { "indexed": false, "name": "_longitude", "type": "string" }, { "indexed": false, "name": "_timestamp", "type": "uint256" } ], "name": "newEntryEvent", "type": "event", "signature": "0x4a5f7b0f2e936b05709f143369f2b7c112950c98036497d874e3398772ebd4f5" } ]');
  //Tracking contract address
  const contractAddress = '0x13c0cCBc8C87f9e6f3276d07Bf8895A45F15C6D9';

  web3 = new Web3();

  //web3.setProvider(new web3.providers.HttpProvider("http://192.168.1.113:8545"));
  //1. START GETH
  //./geth --rinkeby --syncmode fast --cache 1024 --ipcpath /Users/pierremurasso/Library/Ethereum/geth.ipc --rpc --rpccorsdomain "*" --rpcapi "eth,web3,net"
  //2. OPEN TUNNEL
  //ssh -f -N -L 9545:localhost:8545 “Pierre Murasso”@10.0.0.42
  //3. CHECK API is running and tunnel is open
  //curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' http://localhost:9545
  //response --> {"jsonrpc":"2.0","id":67,"result":"Geth/v1.8.8-stable-2688dab4/darwin-amd64/go1.10.1"}
  
  web3.setProvider(new web3.providers.HttpProvider("http://127.0.0.1:9545"));

  contractInstance = web3.eth.contract(contractAbi).at(contractAddress);
  ethereumAddress = web3.eth.accounts[0];

  console.log('Ethereum client initialized with account ' + ethereumAddress);
}

/// *******************************************************
//  INITIATE TRANSACTION AND CALL SMART CONTRACT
/// *******************************************************
function track (rfid, latitude, longitude, timestamp) {

  console.log('Initiating transaction with params: rfid: ' + rfid + ' latitude: ' + latitude + ' longitude: ' + longitude + ' timestamp: ' + timestamp );

  const transactionParams = {
    from: ethereumAddress,
    gas: 1500000,
    gasPrice: 100000000000
  };

  //let getData = contractInstance.Track.getData(function parameters);

  //NB methods.myMethod.call n'altère pas l'état du smart contract (pas de transaction)
  //methods.myMethod.send altère l'état du smart contract

  //console.log(contractInstance.track);

  // Concaténer les params numeriques avec '' pour les transformer en string gggh
  contractInstance
    .track
    .sendTransaction(rfid, latitude + '', longitude + '', timestamp, transactionParams, function(error, hash){
      console.log ('Transaction initiated ' + hash);
    });
    
}

export default { initContract, contractInstance, track }