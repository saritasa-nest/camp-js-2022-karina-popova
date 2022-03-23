import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { first, map, Observable } from 'rxjs';

import { UserService } from '../services/user.service';

/**
 * Guard prevents user from accessing route if a user is not logged in.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  public constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  /** @inheritdoc */
  public canActivate(): Observable<boolean | UrlTree> {
    return this.userService.isAuthorized$.pipe(
      map(isAuthorized => (isAuthorized ? true : this.router.parseUrl('/'))),
    );
  }
}
