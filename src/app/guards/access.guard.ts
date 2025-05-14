import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from "@angular/router";
import { of } from "rxjs";
import { TokenStorageService } from "../service/token-storage.service";

@Injectable()
export class AccessGuard implements CanActivateChild {
  constructor(
    private router: Router,
    private tokenService: TokenStorageService
  ) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // active le apre defintion des role dans app routing .ts
    const roleFunction = route.data["role"];
    if (roleFunction === undefined) {
      return of(true);
    }
    const { role,connectionOtp } = this.tokenService.getDecodedUser();
    console.log(this.tokenService.getDecodedUser())
    // const allowedRoles = userSession.profile?.role ?? [];
    const hasRole = roleFunction.some(roleData => roleData == role);
    // const hasRole = role === roleFunction;
    if (hasRole && connectionOtp) {
      return of(true);
    } else {
      if(!connectionOtp){
        this.router.navigate(["/firest_Connection"]);

      }else{
        this.router.navigate(["/dashboard"]);

      }
      return of(false);
    }
  }
}
