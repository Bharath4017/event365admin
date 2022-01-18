import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UtilityService } from 'app/shared/utility/utility.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-hightlighted-events',
  templateUrl: './hightlighted-events.component.html',
  styleUrls: ['./hightlighted-events.component.scss'],
  providers: [ConfirmationService, DatePipe]
})

export class HightlightedEventsComponent implements OnInit {
  selectedFile: File;
  mode: string;
  success: any;
  aboutForm: FormGroup;
  cols: any[];
  data: any;
  payload: object = {
    page: 1,
    searchValue: '',
    sortBy: '',
    toDate: '',
    fromDate: '',
    categoryId: '',
    subCategoryId: ''
  };

  toolbar = {
    toolbar: [
      ['bold', 'italic', 'underline'], // toggled buttons
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      // [{ font: [] }],
      [{ align: [] }],
      ['clean'] // remove formatting button
    ]
  };

  @ViewChild('myInput')
  myInputVariable: ElementRef;
  minFromDate: Date;
  page: number;
  search: any;
  allCategoriesSelect: any = false;
  selectedCategory: any = {};
  categorySubCategoryList: any = [];
  Object = Object;
  selectedSortBy: any = '';
  sortByArray: any = [{ id: 1, name: 'Paid Event' }, { id: 0, name: 'Free Event' }, { id: 2, name: 'System Tickets' },{ id: '', name: 'All' }];
  hightlightedEventsList: any = [];
  categoryTitle: any = 'Sort Categories';
  searchValue: any = '';
  totalRecords: any = 0;
  selectedHighlightData: any;
  priorityList: any[] = [{ id: 1, name: '1' }, { id: 2, name: '2' }, { id: 3, name: '3' }, { id: null, name: 'None' }];

  isEventExploreFlow = false;
  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService,
    private messageService: MessageService,
    private router: Router,
    private datePipe : DatePipe
  ) { }

  searchUserForm = new FormGroup({
    search: new FormControl(''),
    filter: new FormControl('')
  });

  reset() {
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = '';
    console.log(this.myInputVariable.nativeElement.files);
  }

  ngOnInit() {
    if (this.router.url.includes('explored')) {
      this.isEventExploreFlow = true;
    }
    this.fetchHighlightedEvents();
    this.fetchCategorySubcategoryList();
  }

  searchByDateForm = new FormGroup({
    toDate: new FormControl(''),
    fromDate: new FormControl('')
  });

  onBasicUpload(e) {
    console.log(e);
  }

  searchUser(): void {
    this.page = 1;
    // tslint:disable-next-line: no-shadowed-variable
    const data = this.searchUserForm.value;
    this.search = data.search;
    // tslint:disable-next-line: triple-equals
    if (data.search == '') {
      this.payload['page'] = 1;
      this.payload['search'] = '';
    } else {
      this.payload['page'] = 1;
      this.payload['search'] = this.search;
    }
    this.listing();
  }

  fetchHighlightedEvents(): void {
    this.cols = [
      { field: 'name', header: 'name' },
    ];
    this.utilityService.loaderStart();

    if (this.isEventExploreFlow) {
      this.websiteContentService.getExploredEventsList(this.payload).subscribe(
        (success: any) => {
          this.hightlightedEventsList = success.data.eventList;
          this.totalRecords = success.data.totalDataCount;
          this.utilityService.resetPage();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else {
      this.websiteContentService.getHighlightedEventsList(this.payload).subscribe(
        (success: any) => {
          this.hightlightedEventsList = success.data.eventList;
          this.totalRecords = success.data.totalDataCount;
          this.utilityService.resetPage();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    }
    this.getSortCategoriesName();
  }

  fetchCategorySubcategoryList(): void {
    this.websiteContentService.getCategorySubcategoryList().subscribe(
      (success: any) => {
        this.categorySubCategoryList = success.data;
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }

  arrayOfStringsToArrayOfObjects(arr: string[]): any[] {
    const newArray = [];
    arr.forEach(element => {
      newArray.push({
        label: element,
        value: element
      });
    });
    return newArray;
  }

  onToDateChange(value): void {
    if (value) {
      this.minFromDate = new Date(value);
      console.log('minFromDate', this.minFromDate);
    }
  }

  searchByDate(): void {
    this.page = 1;
    let data = this.searchByDateForm.value;
    if (data.toDate == '' || data.toDate == null) {
      this.payload['page'] = 1;
      this.payload['toDate'] = '';
    } else {
      this.payload['page'] = 1;
      this.payload['toDate'] = this.datePipe.transform(data.toDate, 'yyyy-MM-dd');
    }
    if (data.fromDate == '' || data.fromDate == null) {
      this.payload['page'] = 1;
      this.payload['fromDate'] = '';
    } else {
      this.payload['page'] = 1;
      this.payload['fromDate'] = this.datePipe.transform(data.fromDate, 'yyyy-MM-dd');
    }
    let categoryId = [];
    let subCategoryId = [];
    Object.keys(this.selectedCategory).forEach(element => {
      subCategoryId = [...subCategoryId, this.selectedCategory[element].subcategorySelect];
      if (this.selectedCategory[element].allChecked) {
        categoryId = [...categoryId, element];
      }
    });
    this.payload['searchValue'] = this.searchValue;
    this.payload['sortBy'] = this.selectedSortBy !== '' ? this.selectedSortBy.id : '';
    this.payload['categoryId'] = categoryId.toString();
    this.payload['subCategoryId'] = subCategoryId.toString();
    this.fetchHighlightedEvents();
  }

  resetSearchForm(): void {
    this.payload['page'] = 1;
    this.payload['fromDate'] = '';
    this.payload['toDate'] = '';
    this.payload['categoryId'] = '';
    this.payload['subCategoryId'] = '';
    this.payload['sortBy'] = '';
    this.payload['searchValue'] = '';
    this.searchValue = '';
    this.selectedSortBy = { id: '', name: 'All' };
    this.searchByDateForm.reset();
    this.selectedCategory = {};
    this.categoryTitle = 'Sort Categories';
    this.allCategoriesSelect = false;
    this.fetchHighlightedEvents();
  }

  listing(): void {
    throw new Error('Method not implemented');
  }

  statusChange(e, id): void {
    // tslint:disable-next-line: no-shadowed-variable
    const data = {
      'is_active': e,
      'id': id
    }
    console.log('Data value' + JSON.stringify(data));
    this.websiteContentService.categoryStatus(data).subscribe((success: any) => {

    }, error => {
      this.utilityService.routingAccordingToError(error);
      this.fetchHighlightedEvents();
    });
  }

  categorySelect(event, item): void {
    event.stopPropagation();
    this.allCategoriesSelect = false;
    if (Object.keys(this.selectedCategory).includes(item.id.toString())) {
      if (this.selectedCategory[item.id].partialChecked) {
        const categoryId = item.subCategory.map(({ id }) => id);
        this.selectedCategory = {
          ...this.selectedCategory,
          [item.id]: { id: item.id, name: item.categoryName, allChecked: true, partialChecked: false, subcategorySelect: categoryId }
        }
      } else {
        delete this.selectedCategory[item.id];
      }
    } else {
      const categoryId = item.subCategory.map(({ id }) => id);
      this.selectedCategory = {
        ...this.selectedCategory,
        [item.id]: { id: item.id, name: item.categoryName, allChecked: true, partialChecked: false, subcategorySelect: categoryId }
      }
    }
    this.getSortCategoriesName();
  }

  subCategorySelect(event, item, category): void {
    event.stopPropagation();
    this.allCategoriesSelect = false;
    if (this.selectedCategory[category.id] && this.selectedCategory[category.id].subcategorySelect.includes(item.id)) {
      const index = this.selectedCategory[category.id].subcategorySelect.findIndex(x => x === item.id);
      this.selectedCategory[category.id].subcategorySelect.splice(index, 1);
      this.selectedCategory[category.id].allChecked = false;
      this.selectedCategory[category.id].partialChecked = true;
      if (this.selectedCategory[category.id].subcategorySelect.length === 0) {
        delete this.selectedCategory[category.id];
      }
    } else {
      let data = [];
      if (this.selectedCategory[category.id] && this.selectedCategory[category.id].subcategorySelect) {
        data = this.selectedCategory[category.id].subcategorySelect;
      }
      this.selectedCategory = {
        ...this.selectedCategory,
        // tslint:disable-next-line:max-line-length
        [category.id]: { id: category.id, name: category.categoryName, allChecked: false, partialChecked: true, subcategorySelect: [...data, item.id] }
      }
    }
    if (this.selectedCategory[category.id] && this.selectedCategory[category.id].subcategorySelect.length === category.subCategory.length) {
      this.selectedCategory[category.id].allChecked = true;
      this.selectedCategory[category.id].partialChecked = false;
    }
    this.getSortCategoriesName();
  }

  selectAllCategories(event): void {
    event.stopPropagation();
    this.allCategoriesSelect = true;
    this.selectedCategory = {};
    this.fetchHighlightedEvents();
  }

  getSortCategoriesName(): void {
    const categoryId = Object.keys(this.selectedCategory);
    let count = 0;
    if (categoryId && categoryId.length !== 0) {
      categoryId.forEach(element => {
        count = count + this.selectedCategory[element].subcategorySelect.length;
      });
      this.categoryTitle = count + ' items selected';
    } else {
      this.categoryTitle = 'Sort Categories';
    }
  }

  paginate(event): void {
    this.payload['page'] = event.page + 1;
    this.fetchHighlightedEvents();
  }

  confirmMarkHighlight(index: any, eventid: any, isHighlight: any): void {
    this.confirmationService.confirm({
      message: isHighlight ? 'Are you sure that you want to UnHighlight Event?' : 'Are you sure that you want to Highlight Event?',
      header: 'Mark Highlight',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const body = {
          eventId: eventid,
          isHighLighted: !isHighlight
        }
        this.websiteContentService.postHighLightEvent(body).subscribe(
          (success: any) => {
            this.hightlightedEventsList[index].isHighLighted = !isHighlight;
          },
          error => {
            this.utilityService.routingAccordingToError(error);
          }
        );
      },
      reject: () => {
      }
    });
  }

  confirmMarkExplored(index: any, eventid: any, isExploreEvent: any): void {
    this.confirmationService.confirm({
      message: isExploreEvent ? 'Are you sure that you want to remove from explore Event?' : 'Are you sure that you want to explore Event?',
      header: 'Mark Explore',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const body = {
          id: eventid,
          isExploreEvent: !isExploreEvent
        }
        this.websiteContentService.postExploredEvent(body).subscribe(
          (success: any) => {
            this.hightlightedEventsList[index].isExploreEvent = !isExploreEvent;
          },
          error => {
            this.utilityService.routingAccordingToError(error);
          }
        );
      },
      reject: () => {
      }
    });
  }

  goToEventDetail(id): void {
    localStorage.setItem('eventsFrom', '/highlighted-event');
    this.router.navigate([`/event-detail/${id}`]);
  }

  changePriority(priority: any, index: number): void {
    this.hightlightedEventsList.forEach(event => {
      if (event.priority === priority.id && event.priority !== null) {
        event.priority = null;
        this.updatePriority(event.id, null);
      }
    });

    this.hightlightedEventsList[index].priority = priority.id;
    this.updatePriority(this.hightlightedEventsList[index].id, priority.id);
  }


  updatePriority(eventId: number, priority: number): void {
    const priorityEvent = { "eventId": eventId, "priority": priority };

    this.utilityService.loaderStart();
    this.websiteContentService.postPriorityEvent(priorityEvent).subscribe(
      (success: any) => {
        this.utilityService.loaderStop();
      },
      error => {
        this.utilityService.loaderStop();
        this.utilityService.routingAccordingToError(error);
      }
    );
  }

  onChangePriority(priority: any, index: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to update priority ?',
      header: 'Update Priority',
      icon: 'pi pi-angle-double-up',
      accept: () => {
        this.changePriority(priority, index);
      }
    });
  }
}

