import { Component, OnInit } from '@angular/core';
import { PaideventService } from 'app/shared/services/paidevent.service';
import { UtilityService } from 'app/shared/utility/utility.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-paid-event-rules',
  templateUrl: './paid-event-rules.component.html',
  styleUrls: ['./paid-event-rules.component.scss']
})
export class PaidEventRulesComponent implements OnInit {
  rules: any = [];
  isActiveEdit: boolean = false;
  isInactiveEdit: boolean = false;
  accountAge: boolean = false;
  accountAgeList: any = [];
  inactiveAccount: any = [];
  postEvent: any = [];
  constructor(private paidEventService: PaideventService,
    private messageService: MessageService,
    private location: Location,
    private utilityService: UtilityService) { }

  ngOnInit() {
    this.getRules();
  }
  onCacel(id, rowId, variable, edit, rule) {
    for (let i = 0; i < this[variable].length; i++) {
      $(`#${id}${i}`).removeClass('invalid');
      $(`#${rowId}${i}`).css('display', 'none');
    }
    this.getRules();
    this[edit] = false;

  }
  cancelpostEvent() {
    for (let i = 0; i < this.postEvent.length; i++) {
      $(`#postevent_${i}`).removeClass('invalid');
      $(`#minValue_${i}`).removeClass('invalid');
      $(`#maxValue_${i}`).removeClass('invalid');
      $(`#row${i}`).css('display', 'none');
    }
    this.isActiveEdit = false;
    this.getRules();
  }
  getRules() {
    this.utilityService.loaderStart();
    this.paidEventService.getRules()
      .subscribe((success: any) => {
        this.rules = success.data;
        this.accountAge = success.data.accountAge[0].isActive;
        console.log('success', success.data);
        this.accountAgeList = success.data.accountAge;
        this.inactiveAccount = success.data.inactiveAccount;
        this.postEvent = success.data.postEvent;
        this.utilityService.resetPage();
      },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
  }
  goBack() {
    this.location.back();
  }
  validate(id, i, value, data) {
    //console.log(data, "data")
    if ( value == null) {
      $(`#${id}${i}`).addClass('invalid');
      $(`#row${i}`).css('display', 'inline');
    } else {
      $(`#${id}${i}`).removeClass('invalid');
      $(`#row${i}`).css('display', 'none');
    }
    // if (data.minValue === null || !data.maxValue || !data.amount) {
    //   $(`#row${i}`).css('display', 'inline');
    // }
  }
  validateAccount(id, i, value) {
    if (!value) {
      $(`#${id}${i}`).addClass('invalid');
      $(`#accountrow${i}`).css('display', 'inline');
    } else {
      $(`#${id}
      
      
      
      ${i}`).removeClass('invalid');
      $(`#accountrow${i}`).css('display', 'none');
    }
  }
  validateInactive(id, i, value) {
    // if (!value) {
      if (value == null){
      $(`#${id}${i}`).addClass('invalid');
      $(`#inactiverow${i}`).css('display', 'inline');
    } else {
      $(`#${id}${i}`).removeClass('invalid');
      $(`#inactiverow${i}`).css('display', 'none');
    }
  }
  updateRules(f: NgForm, type, length, from, edit) {
    this.utilityService.loaderStart();
    let body = {
      ruleType: type,
      rules: []
    }
    for (let i = 0; i < this[length].length; i++) {
      let data = {
        id: f.form.value[`id${from}_${i}`],
        minValue: f.form.value[`minValue${from}_${i}`],
        maxValue: f.form.value[`maxValue${from}_${i}`],
        amount: f.form.value[`amount${from}_${i}`]
      }
      body.rules.push(data);
    }
    this.paidEventService.updateRules(body).subscribe((success: any) => {
      this.messageService.add({
        severity: 'success',
        summary: success.message,
        detail: ''
      });
      this[edit] = false;
      this.utilityService.resetPage();
    },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }
  convertDate(value) {
    if ((value / 365) >= 1) {
      return '1 Year';
    }
    if ((value / 30) >= 1) {
      return `${(value / 30).toFixed()} Months`;
    }
    if ((value / 7) >= 1) {
      return `${(value / 7).toFixed()} Weeks`;
    }
    return '0 Week';
  }
}