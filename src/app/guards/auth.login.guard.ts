import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { TokenStorageService } from "../service/token-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardLogin implements CanActivate {
  constructor(
    private tokenService: TokenStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const token = this.tokenService.getToken();

    if (token) {
      // Decode the token to access its payload
      const decodedToken: any =this.tokenService.getDecodedUser();

      // Check if `connection_otp` is set to true or false
      if (decodedToken.connection_otp === true) {
        if (state.url !== '/dashboard') {
          this.router.navigate(["/dashboard"]);
          return of(false); // Prevent further route activation
        }
      } else {
        if (state.url !== '/firest_Connection') {
          this.router.navigate(["/firest_Connection"]);
          return of(false); // Prevent further route activation
        }
      }
    }
    // Allow access if there's no token
    return of(true);
  }
}