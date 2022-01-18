import { Component, AfterViewChecked } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ErrorHandlerService } from '../services/error-handler.service';
import { AuthService } from '../services/auth.service';
import { SharedDataService } from '../services/shared-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { WebsocketService } from '../services/websocket.service';
import { takeUntil } from 'rxjs/operators';
import jwt_decode from 'jwt-decode'
import { NotificationsService } from '../services/notifications.service';
import { NotesService } from '../services/notes.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewChecked {
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  public isCollapsed = true;
  userType: any;
  role: string;
  routerUrl: any;
  userRole: string;
  totalNotification: boolean = false;
  notificationList: any = [];
  loginData: any;
  displayModal: boolean = false;
  isPrivate: boolean = false;
  adminList: any = [];
  selectedAdmins: any = [];
  notes: any = '';
  showNotesError: any = false;
  isSubmited: boolean = false;
  userName: any = '';
  constructor(
    private route: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private loader: NgxUiLoaderService,
    private sharedDataService: SharedDataService,
    private activatedRoute: ActivatedRoute,
    private webSocketService: WebsocketService,
    private notificationService: NotificationsService,
    private notesService: NotesService
  ) {
    this.routerUrl = this.activatedRoute.snapshot.url;
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    this.webSocketService.notificationData.subscribe(res => {
      if (res.notificationDot) {
        this.totalNotification = res.notificationDot;
      }
      if (res.notification && res.notification.length > 0) {
        this.notificationList = res.notification;
      }
    });
    if (localStorage.getItem('userName')) {
      this.userName = JSON.parse(localStorage.getItem('userName'));
    }

    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token").replace("Bearer ", "");

      var decoded = jwt_decode(token);

      // this.userRole = JSON.parse(decoded.roles);
      var user_type = decoded.type;
    }

    if (user_type === "super_admin") {
      this.userRole = "admin";
    } else if (user_type === "vendor") {
      this.userRole = "business";
    }
    this.allAdminList();
  }

  ngAfterViewChecked() {
    // setTimeout(() => {
    //     var wrapperDiv = document.getElementsByClassName("wrapper")[0];
    //     var dir = wrapperDiv.getAttribute("dir");
    //     if (dir === 'rtl') {
    //         this.placement = 'bottom-left';
    //     }
    //     else if (dir === 'ltr') {
    //         this.placement = 'bottom-right';
    //     }
    // }, 3000);
  }
  onCloseModal() {
    this.notes = '';
    this.isSubmited = false;
    this.isPrivate = false;
    this.selectedAdmins = [];
  }
  allAdminList() {
    this.notesService.allAdminList().subscribe(
      (res: any) => {
        if (res.success) {
          var list = res.data.map((a) => {
            a.name = a.first_name + ' ' + (a.last_name ? a.last_name : '') 
            return a;
          })
          this.adminList = list;
        }
      }
      // (err: Error) => {

      // }
    )
  }
  submitNotes(type) {
    this.isSubmited = true;
    // this.showNotesError = false;
    if (this.notes.trim() === '' || this.notes.trim().length > 250) {
      // this.showNotesError = true;
      return
    }
    if (!this.isPrivate && this.selectedAdmins.length < 1) {
      return
    }
    const body = {
      notes: this.notes,
      isPrivate: this.isPrivate,
      shareNotes: this.isPrivate ? [] : this.selectedAdmins.map((a) => { return { userId: a.id } })
    }
    this.notesService.addNotes(body).subscribe(
      (res: any) => {
        if (res.success) {
          console.log('Submit notes------------', res)
          this.onCloseModal();
          this.messageService.add({
            severity: 'success',
            summary: res.message,
            detail: ''
          });
          this.notesService.notesEvent.emit({success: true});
          if (type=== 'submit') {
            this.displayModal = false;
          }
        } else {
          this.messageService.add({
            severity: 'error',
            summary: res.message,
            detail: ''
          });
        }
      }
    )
  }
  profilePage() {
    this.route.navigateByUrl(`/${this.userRole}/profile`);
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else this.toggleClass = "ft-maximize";
  }
  logout() {
    this.loader.start();
    this.authService.logout();
    this.loader.stop();
  }
  // logout() {
  //   // call api
  //   this.loader.start();
  //   this.authService.logout().subscribe(
  //     (success: any) => {
  //       console.log(success);
  //       this.messageService.add({
  //         severity: "success",
  //         summary: "Logout Successful",
  //         detail: "Login Page"
  //       });
  //       this.route.navigateByUrl(`/${this.userRole}/login`);
  //       localStorage.removeItem("token");
  //       this.webSocketService.disconnect();
  //       this.loader.stop();
  //     },
  //     error => {
  //       console.log(error);
  //       this.messageService.add({
  //         severity: "error",
  //         summary: "Logout Failed",
  //         detail: `${error}`
  //       });
  //       this.loader.stop();
  //     }
  //   );
  // }

  showNotification() {
    this.route.navigateByUrl(`/${this.userRole}/notification`);
  }

  markAsRead() {
    this.notificationService.updateNotification().subscribe(res => {
      if (res["success"] == true) {
        this.totalNotification = false;
      }
    })
  }
}
