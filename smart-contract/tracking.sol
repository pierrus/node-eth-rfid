pragma solidity ^0.4.14;

contract Tracking {
    
    struct Entry {
        string rfid;
        string latitude;
        string longitude;
        uint timestamp;
    }
    
    Entry[] public entries;

    event newEntryEvent(string _rfid, string _latitude, string _longitude, uint _timestamp);
    
    address public owner;
    
    constructor() public {
        owner = msg.sender;
    }

    function track(string _rfid, string _latitude, string _longitude, uint _timestamp) public {
        Entry memory entry;
        
        entry.rfid = _rfid;
        entry.latitude = _latitude;
        entry.longitude = _longitude;
        entry.timestamp = _timestamp;
        
        entries.push(entry);
        
        emit newEntryEvent(_rfid, _latitude, _longitude, _timestamp);
    }

}