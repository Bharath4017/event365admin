import { Component, OnInit } from '@angular/core';
import { PaideventService } from 'app/shared/services/paidevent.service';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { UtilityService } from 'app/shared/utility/utility.service';

@Component({
  selector: 'app-paidevents',
  templateUrl: './paidevents.component.html',
  styleUrls: ['./paidevents.component.scss']
})
export class PaideventsComponent implements OnInit {
  totalRecords: any = 0;
  EventListing: any[] = [];
  cols: any[];
  allCategoriesSelect: any = false;
  selectedCategory: any = {};
  categorySubCategoryList: any = [];
  Object = Object;
  payload: object = {
    page: 1,
    // limit: 100,
    type: '',
    sortBy: '',
    searchValue: '',
    categoryId: '',
    subCategoryId: ''
  };
  categoryTitle: any = 'Filter Categories';
  searchValue: any = '';
  sortByArray: any = [{ id: 1, name: 'A-Z (Alphabetically)' }, { id: 2, name: 'Z-A (Reverse Alphabetically)' }];
  selectedSortBy: any = '';
  constructor(private utilityService: UtilityService, private paidEventService: PaideventService,
    private websiteContentService: WebsiteContentService) { }

  ngOnInit() {
    this.fetchCategorySubcategoryList();
    this.getAllPaidEvent();
  }
  resetSearchForm() {
    this.payload['page'] = 1;
    this.payload['searchValue'] = '';
    this.payload['sortBy'] = '';
    this.payload['categoryId'] = '';
    this.payload['subCategoryId'] = '';
    this.searchValue = '';
    this.selectedSortBy = '';
    this.selectedCategory = {};
    this.allCategoriesSelect = false;
    this.categoryTitle = 'Sort Categories';
    this.getAllPaidEvent();
  }
  paginate(event) {
    this.payload['page'] = event.page + 1;
    this.getAllPaidEvent();
  }

  getAllPaidEvent() {
    this.utilityService.loaderStart();
    this.paidEventService.getAllEvents(this.payload).subscribe(
      (success: any) => {
        this.EventListing = success.data.eventList;
        this.totalRecords = success.data.totalDataCount;
        console.log('check value', this.EventListing)
        this.utilityService.resetPage();
        console.log('check value' + JSON.stringify(this.EventListing))
      },
      error => {
        this.utilityService.routingAccordingToError(error);
      }
    );
    this.getSortCategoriesName();
  }
  filterByStatus(value) {
    this.payload['page'] = 1;
    this.payload['sortBy'] = value;
  }
  searchData() {
    this.payload['page'] = 1;
    let categoryId = [];
    let subCategoryId = [];
    Object.keys(this.selectedCategory).forEach(element => {
      subCategoryId = [...subCategoryId, this.selectedCategory[element].subcategorySelect];
      if (this.selectedCategory[element].allChecked) {
        categoryId = [...categoryId, element];
      }
    });
    this.payload['sortBy'] = this.selectedSortBy.id;
    this.payload['categoryId'] = categoryId.toString();
    this.payload['subCategoryId'] = subCategoryId.toString();
    this.payload['searchValue'] = this.searchValue;
    this.getAllPaidEvent();
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
        [category.id]: { id: category.id, name: category.categoryName, allChecked: false, partialChecked: true, subcategorySelect: [...data, item.id] }
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
    this.getAllPaidEvent();
  }
  // getSubCategoryName(subCategoryName) {
  //   const categoryName = subCategoryName.map(({ subCategoryName }) => subCategoryName);
  //   return categoryName.toString();
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
      this.categoryTitle = 'Filter Categories';
    }
  }
}
