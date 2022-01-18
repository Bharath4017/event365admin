import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'app/shared/utility/utility.service';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExcelService } from 'app/shared/services/excel.service';
import * as moment from 'moment';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  providers: [ExcelService]
})
export class UserDetailComponent implements OnInit {
  eventsList: any = [];
  cols: any[];
  // tslint:disable-next-line:max-line-length
  sortByArray: any = [{id: 1, name: 'A-Z (Alphabetically)'}, {id: 2, name: 'Z-A (Reverse Alphabetically)'}, {id: 3, name: 'Favourite'}, {id: 4, name: 'Event: Liked'}, {id: 5, name: 'Event: Disliked'}, {id: 6, name: 'Ticket Type: Free'}, {id: 7, name: 'Ticket Type: Paid'}, {id: 8, name: 'Ticket Type: RSVP'}, {id: 9, name: 'Ticket Type: VIP'}, {id: 10, name: 'Ticket Type: Table and Seatings'}];
  allCategoriesSelect: any = false;
  selectedCategory: any = {};
  categorySubCategoryList: any = [];
  Object = Object;
  categoryTitle: any = 'Sort Categories';
  loginHistoyModal: any = false;
  paymentDetailsModal: any = false;
  reviewModal: any = false;
  idSub: Subscription;
  userDetailId: any;
  userDetails: any;
  payload: object = {
    page: 1,
    searchValue: '',
    sortBy: '',
    categoryId: '',
    subCategoryId: '',
    id: ''
  };
  searchValue = '';
  totalRecords: any = 0;
  selectedSortBy: any = '';
  loginDetailsArray: any = [];
  paymentDetailsArray: any = [];
  eventReviewDetail: any = {
    reviews: {
      reviewStar: 0
    }
  };
  eventPaymentDetail: any;
  constructor(private activatedRoute: ActivatedRoute, private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService,
    private excelService: ExcelService, private router: Router) { 
      this.idSub = this.activatedRoute.paramMap.subscribe((params) => {
        if (params.get('id')) {
          this.userDetailId = params.get('id');
        }
      });
    }

  ngOnInit() {
    this.fetchCategorySubcategoryList();
    this.fetchUserDetails();
    this.fetchUserEventHistory();
  }
  fetchUserDetails() {
    if (this.userDetailId) {
      this.utilityService.loaderStart();
      this.websiteContentService.getUserDetail(this.userDetailId).subscribe(
        (success: any) => {
          this.userDetails = success.data;
          this.loginDetailsArray = this.userDetails.userLoginDetail;
          this.utilityService.resetPage();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    }
  }
  fetchUserEventHistory() {
    if (this.userDetailId) {
      this.payload['id'] = this.userDetailId;
      this.utilityService.loaderStart();
      this.websiteContentService.getEventHistoryUserDetail(this.payload).subscribe(
        (success: any) => {
          this.eventsList = success.data.eventList;
          this.totalRecords = success.data.totalDataCount;
          this.utilityService.resetPage();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    }
  }
  fetchCategorySubcategoryList() {
    this.websiteContentService.getCategorySubcategoryList().subscribe(
      (success: any) => {
        this.categorySubCategoryList = success.data;
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
  }
  categorySelect(event, item) {
    event.stopPropagation();
    this.allCategoriesSelect = false;
    if (Object.keys(this.selectedCategory).includes(item.id.toString())) {
      if (this.selectedCategory[item.id].partialChecked) {
        const categoryId = item.subCategory.map(({ id }) => id);
        this.selectedCategory = {
          ...this.selectedCategory,
          [item.id]: {id: item.id, name: item.categoryName, allChecked: true, partialChecked: false, subcategorySelect: categoryId}
        }
      } else {
        delete this.selectedCategory[item.id];
      }
    } else {
      const categoryId = item.subCategory.map(({ id }) => id);
      this.selectedCategory = {
        ...this.selectedCategory,
        [item.id]: {id: item.id, name: item.categoryName, allChecked: true, partialChecked: false, subcategorySelect: categoryId}
      }
    }
    this.getSortCategoriesName();
  }
  subCategorySelect(event, item, category) {
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
        [category.id]: {id: category.id, name: category.categoryName, allChecked: false, partialChecked: true, subcategorySelect: [...data, item.id]}
      }
    }
    if (this.selectedCategory[category.id] && this.selectedCategory[category.id].subcategorySelect.length === category.subCategory.length) {
      this.selectedCategory[category.id].allChecked = true;
      this.selectedCategory[category.id].partialChecked = false;
    }
    this.getSortCategoriesName();
  }
  selectAllCategories(event) {
    event.stopPropagation();
    this.allCategoriesSelect = true;
    this.selectedCategory = {};
    this.fetchUserEventHistory();
  }
  // getSubCategoryName(subCategoryName) {
  //   const categoryName = subCategoryName.map(({ subCategoryName }) => subCategoryName);
  //   return categoryName.join(', ');
  // }
  // getCategoryName(categoryName) {
  //   const categoryname = categoryName.map(({ categoryName }) => categoryName);
  //   return categoryname.join(', ');
  // }
  getSortCategoriesName() {
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
  paginate(event: any) {
    this.payload['page'] =  event.page + 1;
    this.fetchUserEventHistory();
  }
  resetData() {
    this.payload['page'] = 1;
    this.payload['categoryId'] = '';
    this.payload['subCategoryId'] = '';
    this.payload['searchValue'] = '';
    this.payload['sortBy'] = '';
    this.searchValue = '';
    this.selectedSortBy = '';
    this.selectedCategory = {};
    this.allCategoriesSelect = false;
    this.categoryTitle = 'Sort Categories';
    this.fetchUserEventHistory();
  }
  exportData() {
    if (this.userDetailId) {
      this.utilityService.loaderStart();
      const data = this.payload;
      delete data['page'];
      this.websiteContentService.exportEventHistoryUserDetail(this.payload).subscribe(
        (success: any) => {
           const userEventHistory = [];
           success.data.forEach((element, index) => {
            const category = element.eventCategories.map(({ categoryName }) => categoryName);
            const subCategory = element.eventSubCategories.map(({ subCategoryName }) => subCategoryName);
            userEventHistory.push({
              'Sr.No': index + 1,
              'Name': element.name,
              // tslint:disable-next-line:max-line-length
              'Type': element.eventType === 1 ? 'Paid' : '' || element.eventType === 0 ? 'Free' : '' || element.eventType === 2 ? 'System Tickets' : '',
              'Category': category.join(', '),
              'Sub-Category': subCategory.join(', '),
              'Date Attended': moment(element.start).format('DD-MM-YYYY'),
              'Like/Dislike': element.userLikes ? element.userLikes.isLike ? 'Liked' : 'Disliked' : 'N/A',
            //  'Payment': '',
              'Review':  element.reviews ? element.reviews.reviewStar + '/5' : 'N/A'
            });
          });
           this.excelService.exportAsExcelFile(userEventHistory, 'user_event_history');
           this.utilityService.resetPage();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    }
  }
  searchData() {
    let categoryId = [];
    let subCategoryId = [];
    Object.keys(this.selectedCategory).forEach(element => {
      subCategoryId = [...subCategoryId, this.selectedCategory[element].subcategorySelect];
      if (this.selectedCategory[element].allChecked) {
        categoryId = [...categoryId, element];
      }
    });
    this.payload['sortBy'] = this.selectedSortBy.id ? this.selectedSortBy.id : '';
    this.payload['searchValue'] = this.searchValue;
    this.payload['categoryId'] = categoryId.toString();
    this.payload['subCategoryId'] = subCategoryId.toString();
    this.fetchUserEventHistory();
  }
  showReviewModal(item: any) {
    if (item.reviews) {
      this.eventReviewDetail = item;
      this.reviewModal = true;
    }
  }
  showPaymentModal(item: any) {
      this.eventPaymentDetail = item;
      this.paymentDetailsModal = true;
      this.paymentDetailsArray = item.ticketBooked;
  }
  showLoginHistoryModal() {
    this.loginHistoyModal = true;
  }
  goToEventDetail(id) {
    localStorage.setItem('eventsFrom', `/user-detail/${this.userDetailId}`);
    this.router.navigate([`/event-detail/${id}`]);
  }
}
