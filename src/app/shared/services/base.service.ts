import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BaseService {

  // on local
  // public base_url: string = 'http://127.0.0.1:3000/api/v1/';

  //staging
  //  public baseUrl: string = 'http://localhost:8000/api/';
  //  public ws_url: string = "http://localhost:8000/";
  //  public baseUrl: string = 'http://18.224.139.150/api/';
  //  public ws_url: string = "http://18.224.139.150:8000";
// Prod url
public baseUrl: string = ' https://api.365live.com/api/';
    public ws_url: string = "http://3.130.1.68:8000";
  //  public baseUrl: string = 'https://api.365live.com/api/';
  //  public ws_url: string = "https://api.365live.com/";

  // //production
  // public base_url: string = 'https://delivr.biz/api/v1/';
  // public ws_url: string = "https://delivr.biz/socketUrl/";

  //LAN IP
  // public base_url: string = "http://192.168.1.146:3000/api/v1/";
  // public ws_url: string = "http://192.168.1.146:3000/";


  constructor(private http: HttpClient) { }
}
