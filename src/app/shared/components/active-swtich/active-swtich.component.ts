import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-active-swtich',
  templateUrl: './active-swtich.component.html',
  styleUrls: ['./active-swtich.component.scss']
})
export class ActiveSwtichComponent implements OnInit {
  // checked: string = 'active';
  @Input() checked: boolean;
  //checked: boolean = true;
  val: string;

  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private confirmationService: ConfirmationService) {}
  ngOnInit() {
   // this.val = this.checked ? '' : '';
    this.val = this.checked ? 'On' : 'Off';
  }

  handleChange(e) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      reject: () => {
        this.val = this.val;
        this.checked = !this.checked;
      },
      accept: () => {
        if (this.checked) {
          this.val = 'On';
        } else if (!this.checked) {
          this.val = 'Off';
        }
//console.log("check "+this.checked);
        this.change.emit(this.checked);
      }
    });
  }
}

