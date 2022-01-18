import { Component, OnInit, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessagingService } from 'app/shared/messaging.service';
import { Subject } from 'rxjs';
import { WebsocketService } from 'app/shared/services/websocket.service';

// tslint:disable-next-line: prefer-const
var fireRefreshEventOnWindow = function () {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent('resize', true, false);
    window.dispatchEvent(evt);
};

@Component({
    selector: 'app-full-layout',
    templateUrl: './full-layout.component.html',
    styleUrls: ['./full-layout.component.scss']
})

export class FullLayoutComponent implements OnInit {

    notification: Subject<any>;
    options = {
        direction: 'ltr'
    };

    checked: boolean = true;
    val: string = 'Available';
    constructor(
        private elementRef: ElementRef, 
        private messagingService: MessagingService, 
        private wsService: WebsocketService
        ) {

        // this.notification =
        wsService.connect()

    }

    ngOnInit() {
        console.log("ok fine")
        //sidebar toggle event listner
        // this.elementRef.nativeElement.querySelector('#sidebarToggle')
        //     .addEventListener('click', this.onClick.bind(this));

        this.messagingService.requestPermission();
        // this.messagingService.receiveMessage();
        // this.notification.next("");
    }

    onClick(event) {
        //initialize window resizer event on sidebar toggle click event
        setTimeout(() => { fireRefreshEventOnWindow() }, 300);
    }

    getOptions($event): void {
        this.options = $event;
    }

    reject() {
        this.checked = !this.checked;
        this.val = this.val;
    }

    accept() {
        if (this.checked) {
            this.val = 'Available';
        } else if (!this.checked) {
            this.val = 'Unavailable';
        }
    }

}
