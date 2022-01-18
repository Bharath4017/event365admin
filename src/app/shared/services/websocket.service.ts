import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BaseService } from './base.service';
import { BehaviorSubject } from 'rxjs/Rx';
import jwt_decode from 'jwt-decode';
//import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  private _notificationDataSource = new BehaviorSubject<any>({});
  public notificationData = this._notificationDataSource.asObservable();


  private socket;

  constructor(private baseService: BaseService) { }

  connect() {

    let tokeServer = localStorage.getItem("token").replace("Bearer ", "");

    var decoded = jwt_decode(tokeServer);

    this.socket = io(this.baseService.ws_url, { query: "token=" + tokeServer });

    let data = {
      token: localStorage.getItem('token')
    }
    console.log("web socket file 1", data)
    this.socket.emit('checkNotification', JSON.stringify(data));
    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    console.log("websockect file ", data)

    // tslint:disable-next-line: no-shadowed-variable
    this.socket.on('message', (data: any) => {
      console.log("Socket on ", data)
      this._notificationDataSource.next(data);
    })


    // this.socket.on('hi', (data) => {
    //   console.log(data)
    // })
    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.

    // setInterval(function () {
    //   observer.next(data);
    // }, 2000)


    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
  }


  disconnect() {
    this.socket.close();
    this.socket.disconnect();
  }

}
