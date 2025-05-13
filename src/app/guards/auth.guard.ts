import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanActivate,
  UrlTree,
} from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { TokenStorageService } from "../service/token-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivateChild {
  // khn thama tokin ok si no arjaa li login
  constructor(
    private tokenService: TokenStorageService,
    private router: Router
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.routeAccess();
  }

  routeAccess(): Observable<boolean> {
    const token = this.tokenService.getToken();
    if (token) {
      return of(true);
    } else {
      return of(false).pipe(
        switchMap((value) => {
          this.router.navigate(["/signin"]);
          return of(false);
        })
      );
    }
  }
}
