import { Component, OnInit } from '@angular/core';
import { NotesService } from 'app/shared/services/notes.service';
import { UtilityService } from 'app/shared/utility/utility.service';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notesList: any = [];
  sub: Subscription;
  page: number = 1;
  totalRecords: any = 0;
  constructor(
    private utilityService: UtilityService, private notesService: NotesService, private confirmationService: ConfirmationService,) { }

  ngOnInit() {
    this.sub = this.notesService.notesEvent.subscribe((data: any) => {
      if (data.success) {
        this.getAllNotes();
      }
    })
    this.getAllNotes();
  }
  getAllNotes() {
    this.utilityService.loaderStart();
    this.sub = this.notesService.allNotes(this.page).subscribe(
      (res: any) => {
        console.log('Alll notes list', res);
        if (res.success) {
          this.notesList = res.data.notesData;
          this.totalRecords = res.data.totalDataCount;
        }
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  deleteNotes(item: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this note?',
      header: 'Delete Note',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const body = {}
        this.sub = this.notesService.deleteNotes(item.id, body).subscribe(
          (res: any) => {
            if (res.success) {
              this.getAllNotes();
            }
            this.utilityService.resetPage();
          },
          error => {
            this.utilityService.routingAccordingToError(error);
          });
      },
      reject: () => {
      }
    });
  }
}
