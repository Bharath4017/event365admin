import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AccountsService } from '../services/accounts.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsResolverService implements Resolve<any>{
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._accountService.getPage(route.routeConfig.path, route.params).pipe(
      map(data => {
        return data;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  constructor(private _accountService: AccountsService) { }
}
