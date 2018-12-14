export class TrackingEntry {
    public Rfid: string;
    public Latitude: string;
    public Longitude: string;
    public Timestamp: number;

    constructor(rfid: string, latitude: string, longitude: string, timestamp: number)
    {
        this.Rfid = rfid;
        this.Latitude = latitude;
        this.Longitude = longitude;
        this.Timestamp = timestamp;
    }
}
