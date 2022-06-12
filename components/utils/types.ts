export interface IRide {
    id : number;
    origin_station_code : number;
    station_path : number[];
    destination_station_code : number;
    date : Date,
    map_url : string,
    state : string,
    city : string,
    distance : number
}
export interface IUser {
    station_code : number;
    name : string;
    url : string;
}