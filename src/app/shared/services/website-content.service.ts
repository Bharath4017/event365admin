import {
  Injectable
} from '@angular/core';
import {
  ErrorHandlerService
} from './error-handler.service';
import {
  BaseService
} from './base.service';
import {
  Router
} from '@angular/router';
import {
  HttpClient
} from '@angular/common/http';
import {
  catchError,
  retry,
  timeout
} from 'rxjs/operators';
import { query } from 'chartist';

@Injectable({
  providedIn: 'root'
})
export class WebsiteContentService {
  baseUrl: string;
  constructor(
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    private baseSevice: BaseService
  ) {
    this.baseUrl = this.baseSevice.baseUrl;
  }

  // getAllVenuer
  getAllHost(fetchingData?) {
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/organisers/host' + query).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  // getAllVenuer
  getAllPromoter(fetchingData?) {
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/organisers/promoter' + query).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // getAllVenuer
  getAllMember(fetchingData?) {
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/organisers/member' + query).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }


  // getAllVenuer
  getAllVenuer(fetchingData?) {
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/organisers/venuer' + query).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  // get all customers
  getAllCustomers(fetchingData?) {
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/organisers/customer' + query).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

// Issues Crud
// getAllIssues
    getAllIssues() {
      return this.http.get(this.baseUrl + 'admin/getAllIssues').pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

// getAllQueriesAsPerIssue
    getIssueQueries(id) {
      return this.http.get(this.baseUrl + 'admin/getIssuesQuery/' + id).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

    // Add and Update Organiser
  addUpdateIssues(data) {
    // console.log("Service addUpdateOrganiser", data)
    return this.http.post(this.baseUrl + 'admin/addUpdateIssues', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // delete Organiser
  deleteIssues(id) {
    return this.http.delete(this.baseUrl + 'admin/deleteIssue/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  deleteQuery(id) {
    return this.http.delete(this.baseUrl + 'admin/issuesQuery/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

    // status change
    statusIssues(data) {
      return this.http.put(this.baseUrl + 'admin/statusIssue', data).pipe(
        catchError(this.errorHandler.handleError)
      )
    }

  // Add and Update Organiser
  addUpdateOrganiser(data) {
    // console.log("Service addUpdateOrganiser", data)
    return this.http.post(this.baseUrl + 'admin/addUpdateOrganiser', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // delete Organiser
  deleteOrganiser(id) {
    return this.http.delete(this.baseUrl + 'admin/deleteOrganiser/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }


  // getAllCategory
  getAllCategory(fetchingData) {
    let query = '';
      if (fetchingData) {
        let esc = encodeURIComponent;
        query = Object.keys(fetchingData)
          .map(k => esc(k) + '=' + esc(fetchingData[k]))
          .join('&');
      }
      query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/category' + query).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

    // getAllCategory
    getAllUserPayment(fetchingData) {
      let query = '';
      if (fetchingData) {
        let esc = encodeURIComponent;
        query = Object.keys(fetchingData)
          .map(k => esc(k) + '=' + esc(fetchingData[k]))
          .join('&');
      }
      query = query != "" ? "?" + query : "";
      return this.http.get(this.baseUrl + 'admin/getUsePayment' + query).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

  // Add and Update Organiser
  addUpdateCategory(data) {
    // console.log("Service addUpdateOrganiser", data)
    return this.http.post(this.baseUrl + 'admin/category', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // delete Organiser
  deleteCategory(id) {
    return this.http.delete(this.baseUrl + 'admin/category/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Venue status change
  venueStatus(data) {
    console.log(data)
    return this.http.put(this.baseUrl + 'admin/venueStatus', data).pipe(
      catchError(this.errorHandler.handleError)
    )
  }

  // User status change
  userStatus(id, data) {
    return this.http.put(this.baseUrl + 'admin/updateOrganiserStatus/' + id, data).pipe(
      catchError(this.errorHandler.handleError)
    )
  }

  // Event status change
  eventStatus(data) {
    return this.http.put(this.baseUrl + 'admin/eventStatus', data).pipe(
      catchError(this.errorHandler.handleError)
    )
  }
  // Archive Event status change
  archiveStatus(data) {
    return this.http.post(this.baseUrl + 'admin/eventArchive ', data).pipe(
      catchError(this.errorHandler.handleError)
    )
  }

  // transStatus status change
  transStatus(data) {
    return this.http.put(this.baseUrl + 'admin/transStatus', data).pipe(
      catchError(this.errorHandler.handleError)
    )
  }

  // Cat status change
  categoryStatus(data) {
    return this.http.put(this.baseUrl + 'admin/catStatus', data).pipe(
      catchError(this.errorHandler.handleError)
    )
  }

  // Cat status change
  SubcategoryStatus(data) {
    return this.http.put(this.baseUrl + 'admin/subCatStatus', data).pipe(
      catchError(this.errorHandler.handleError)
    )
  }
  
  // getAllEvent
  getAllEvents(fetchingData?) {
    console.log('getAllEvents', fetchingData)
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/events' + query).pipe(
      retry(3),
          catchError(this.errorHandler.handleError)
    );
  }

  // getAllArchivedEvent
  getAllArchivedEvents(fetchingData?) {
    console.log('getAllEvents', fetchingData)
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/eventArchive' + query).pipe(
      retry(3),
          catchError(this.errorHandler.handleError)
    );
  }


  getCategorySubcategoryList() {
    return this.http.get(this.baseUrl + 'admin/allCategorySubcategory').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  getHighlightedEventsList(fetchingData?) {
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/highlightEvent' + query).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  postHighLightEvent(body) {
    return this.http.post(this.baseUrl + 'admin/highlightEvent', body).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  getExploredEventsList(fetchingData?) {
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/exploreEvent' + query).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  postExploredEvent(body) {
    return this.http.post(this.baseUrl + 'admin/exploreEvent', body).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  getEventDetails(eventId) {
    // let query = '';
    // if (fetchingData) {
    //   let esc = encodeURIComponent;
    //   query = Object.keys(fetchingData)
    //     .map(k => esc(k) + '=' + esc(fetchingData[k]))
    //     .join('&');
    // }
    // query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/event/' + eventId).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  getAttendeesList(fetchingData?) {
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/attendeesList' + query).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  exportAttendeesList(fetchingData?) {
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/exportAttendeesList' + query).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  // getOrganiserPaymentReq
    getAllOrgPaymentReq(fetchingData?) {
    console.log('getAllOrgPaymentReq', fetchingData)
    let query = '';
    if (fetchingData) {
      const esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    // tslint:disable-next-line: triple-equals
    query = query != '' ? '/?' + query : '';
    return this.http.get(this.baseUrl + 'admin/getOrganiserPaymentReq' + query).pipe(
      retry(3),
          catchError(this.errorHandler.handleError)
    );
  }

  // Verified status change
  isVerifiedStatus(data) {
    return this.http.put(this.baseUrl + 'admin/isVerifiedStatus', data).pipe(
      catchError(this.errorHandler.handleError)
    )
  }
    // Released status change
    isReleasedStatus(data) {
      return this.http.put(this.baseUrl + 'admin/isReleasedStatus', data).pipe(
        catchError(this.errorHandler.handleError)
      )
    }


  // getAllEvent
  // getAllEvents(data) {
  //   console.log('Event data', data);
  //   return this.http.get(this.baseUrl + 'admin/getAllevents/' + data).pipe(
  //     retry(3),
  //     catchError(this.errorHandler.handleError)
  //   );
  // }

  // getAllEventTickect
  getAllEventTicket(id) {
    console.log('eventId', id);
    return this.http.get(this.baseUrl + 'admin/eventTicketInfo/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  // getAllCategory
  getAllSubCategory(id) {
    return this.http.get(this.baseUrl + 'admin/subCategory/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Add and Update Organiser
  addUpdateSubCategory(data) {
    console.log('Service addUpdateSubCategory', data)
    return this.http.post(this.baseUrl + 'admin/subCategory', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // delete Organiser
  deleteSubCategory(id) {
    console.log('subCategory', id)
    return this.http.delete(this.baseUrl + 'admin/subCategory/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // User CURD ---------------------------------------------------------- //
  // getAllUser
  getAllUser() {
    console.log('"Service Pages get Users"')
    return this.http.get(this.baseUrl + 'admin/users').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // getUserDetails
  getUserDetails(id) {
    return this.http.get(this.baseUrl + 'getUserDetails/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // getAllVenues
  getAllVenues(fetchingData?) {
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/venue' + query).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  getAllVenuesMaps() {
    return this.http.get(this.baseUrl + 'admin/getVenueForMap').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  postCreateVenue(body, images) {
    let formData = new FormData();
    for (var key in body) {
        formData.append(key, body[key]);
    }
    for (const d of images) {
      formData.append('venueImages', d)
    }
    return this.http.post(this.baseUrl + 'admin/venue', formData).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  postUpdateTicketCapacity(body) {
    return this.http.post(this.baseUrl + 'admin/updateTicketCapacity', body).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  getVenueDetail(venueId) {
    return this.http.get(this.baseUrl + 'admin/venue/' + venueId).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  // Level CURD----------------------------------------------------------
  getAllLevel(id) {
    return this.http.get(this.baseUrl + 'getLevels/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Add and Update Level
  addUpdateLevel(data) {
    console.log('addUpdateLevel Services' + JSON.stringify(data));
    return this.http.post(this.baseUrl + 'addUpdateLevel', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // delete Role
  deleteLevel(id) {
    return this.http.get(this.baseUrl + 'deleteLevel/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Degree CURD

  // get all Degree
  getAllDegree() {
    return this.http.get(this.baseUrl + 'getAdminDegrees').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Add and Update Roles
  addUpdateDegree(data) {
    return this.http.post(this.baseUrl + 'addUpdateDegree', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // delete Role
  deleteDegree(id) {
    return this.http.get(this.baseUrl + 'deleteDegree/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }


  // ----------------------------------------------------------

  // TERMS AND CONDITIONS

  // get t&c
  getTermsAndConditions() {
    return this.http.get(this.baseUrl + 'termsCondition').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // update t&C
  updateTermsAndConditions(data) {
    return this.http.post(this.baseUrl + 'saveTermsAndConditions', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // TERMS AND CONDITIONS

  // get Sharing
  getSharing() {
    return this.http.get(this.baseUrl + 'getSharing').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // update t&C
  updateSharing(data) {
    return this.http.post(this.baseUrl + 'saveSharing', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // ----------------------------------------------------------

  // PRIVACY POLICY
  // get privacy policy
  getPrivacyPolicy() {
    return this.http.get(this.baseUrl + 'privacyPolicy').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // update privacy policy
  updatePrivacyPolicy(data) {
    return this.http.post(this.baseUrl + 'savePrivacyPolicy', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }


  // update privacy policy
  updateEmailTemp(data) {
    return this.http.post(this.baseUrl + 'saveEmailTemp', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // ----------------------------------------------------------
  // get all Focus Area
  getAllFocus() {
    return this.http.get(this.baseUrl + 'getFocus').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // add and Update
  addUpdateFocus(data) {
    return this.http.post(this.baseUrl + 'addUpdateFocus', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // delete Focus
  deleteFocus(id) {
    return this.http.get(this.baseUrl + 'deleteFocus/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Accurate ----------------------------------------------------------

  // get all Accurate
  getAllAccurate() {
    return this.http.get(this.baseUrl + 'getAccurates').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Add and Update Accurate
  addUpdateAccurate(data) {
    return this.http.post(this.baseUrl + 'addUpdateAccurate', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // delete Accurate
  deleteAccurate(id) {
    return this.http.get(this.baseUrl + 'deleteAccurate/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Testimonial ----------------------------------------------------------

  // get all Testimonial
  getAllTestimonial() {
    return this.http.get(this.baseUrl + 'getTestimonials').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Add and Update Testimonial
  addUpdateTestimonial(data) {
    return this.http.post(this.baseUrl + 'addUpdateTestimonial', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // delete Testimonial
  deleteTestimonial(id) {
    return this.http.get(this.baseUrl + 'deleteTestimonial/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // About ----------------------------------------------------------

  // get all About
  getAllAbout() {
    return this.http.get(this.baseUrl + 'getAbouts').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Add and Update About
  addUpdateAbout(data) {
    return this.http.post(this.baseUrl + 'addUpdateAbout', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // delete About
  deleteAbout(id) {
    return this.http.get(this.baseUrl + 'deleteAbout/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Payment ----------------------------------------------------------

  getAllPayment() {
    return this.http.get(this.baseUrl + 'getPayments').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  addUpdatePayment(data) {
    return this.http.post(this.baseUrl + 'addUpdatePayment', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  deletePayment(id) {
    return this.http.get(this.baseUrl + 'deletePayment/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Payment under the Cards----------------------------------------------------------

  getAllPaymentCards() {
    return this.http.get(this.baseUrl + 'getCards').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  addUpdatePaymentCards(data) {
    return this.http.post(this.baseUrl + 'addUpdateCard', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  deletePaymentCard(id) {
    return this.http.get(this.baseUrl + 'deleteCard/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Company CURD ----------------------------------------------------------
  // get all company
  getAllCompany() {
    return this.http.get(this.baseUrl + 'getAdminCompany').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Add and Update Services
  addUpdateCompany(data) {
    return this.http.post(this.baseUrl + 'addUpdateCompany', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // delete company
  deleteCompany(id) {
    return this.http.get(this.baseUrl + 'deleteCompany/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }


  // Company CURD ----------------------------------------------------------
  // get all company
  getRecentCard() {
    return this.http.get(this.baseUrl + 'getRecentCard').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Add and Update Services
  addUpdateRecentCard(data) {
    return this.http.post(this.baseUrl + 'addUpdateRecentCard', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // delete company
  deleteRecentCard(id) {
    return this.http.get(this.baseUrl + 'deleteRecentCard/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }



  // Social Sharing CURD----------------------------------------------------------

  getAllSocial() {
    return this.http.get(this.baseUrl + 'getSocialSharings').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Add and Update
  addUpdateSocialSharing(data) {
    return this.http.post(this.baseUrl + 'addUpdateSocialSharing', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // delete
  deleteSocialSharing(id) {
    return this.http.get(this.baseUrl + 'deleteSocialSharing/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Location CURD----------------------------------------------------------

  getAllLoction(id) {
    return this.http.get(this.baseUrl + 'getLocationAdmin/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Add and Update Location
  addUpdateLocation(data) {
    return this.http.post(this.baseUrl + 'addUpdateLocation', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // delete
  deleteLocation(id) {
    return this.http.get(this.baseUrl + 'deleteLocation/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  // Status change
  cardStatus(data) {
    console.log('ok service ' + JSON.stringify(data))
    return this.http.post(this.baseUrl + 'recentStatus', data).pipe(
      catchError(this.errorHandler.handleError)
    )
  }


  // dashboard Data
  dashboardData() {
    console.log('dashboardData Service')
    return this.http.get(this.baseUrl + 'admin/dashboard').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  // Common Pages CURD----------------------------------------------------------

  getAllCommonPages() {
    return this.http.get(this.baseUrl + 'getAdminWebPages').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Social Sharing CURD----------------------------------------------------------

  getEmailTemp() {
    return this.http.get(this.baseUrl + 'emailTemp').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }


  // Add and Update Location
  addUpdateCommonPages(data) {
    console.log(data, "Service");
    return this.http.post(this.baseUrl + 'addUpdateWebPages', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // delete
  deleteCommonPages(id) {
    return this.http.get(this.baseUrl + 'deleteWebPages/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  //Sub-admin api
  getSubAdminList(fetchingData?) {
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/subAdmin' + query).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  getSubAdminDetail(adminId: any) {
    return this.http.get(this.baseUrl + 'admin/subAdmin/' + adminId).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  postCreateUpdateSubAdmin(body) {
    return this.http.post(this.baseUrl + 'admin/subAdmin', body).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  putSubAdminStatusChange(id, body) {
    return this.http.put(this.baseUrl + 'admin/subAdmin/' + id, body).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  getUserDetail(userId: any) {
    return this.http.get(this.baseUrl + 'admin/userDetail/' + userId).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  getEventHistoryUserDetail(fetchingData?) {
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/userAttendEventList' + query).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  exportEventHistoryUserDetail(fetchingData?) {
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/exportUserAttendEvent' + query).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  exportUserList(fetchingData?) {
    let query = '';
    if (fetchingData) {
      let esc = encodeURIComponent;
      query = Object.keys(fetchingData)
        .map(k => esc(k) + '=' + esc(fetchingData[k]))
        .join('&');
    }
    query = query != "" ? "?" + query : "";
    return this.http.get(this.baseUrl + 'admin/exportUserList' + query).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // Add and Update Organiser

  // START: BANNER DETAILS PAGE
  addUpdateBanner(data) {
    return this.http.post(this.baseUrl + 'admin/banner', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  getBanner() {
    return this.http.get(this.baseUrl + 'admin/banner').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  bannerStatus(data) {
    return this.http.put(this.baseUrl + 'admin/banner/2', data).pipe(
      catchError(this.errorHandler.handleError)
    )
  }

  getHeaderImageList() {
    return this.http.get(this.baseUrl + 'admin/slider').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  addHeaderImage(image) {
    let formData = new FormData();
    formData.append('image', image);
    return this.http.post(this.baseUrl + 'admin/slider', formData).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  deleteHeaderImage(id) {
    return this.http.delete(this.baseUrl + 'admin/slider/' +  id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  deleteEventsPermanent(id) {
    return this.http.delete(this.baseUrl + 'admin/events/' +  id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  updateHeaderTimer(data) {
    return this.http.put(this.baseUrl + 'admin/slider', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  postPriorityEvent(body) {
    return this.http.post(this.baseUrl + 'admin/priorityEvent', body).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  /*Home page EnableDisable slider*/
  updateHeaderSliderImage(id, data) {
    return this.http.put(this.baseUrl + 'admin/slider/' + id , data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }


}


