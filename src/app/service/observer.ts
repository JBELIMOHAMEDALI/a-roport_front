import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import swal from "sweetalert";
import { SharedService } from "./shared.service";
export default class Observer {
  constructor(
    private router?: Router,
    private target?: string,
    private reload?: boolean,
    private swal_display?: boolean,
    private sharedService?: SharedService,
    private activeModal?: NgbActiveModal
  ) { }

  OBSERVER_POST(cb?) {
    return {
      next: (response: any) => {
        if (this.swal_display) swal("Success!", response.message, "success");
        if (this.activeModal) this.activeModal.dismiss();
        if (this.reload) this.sharedService.reloadComponent(this.router);
        if (this.target) this.router.navigate([this.target]);

        if (cb) cb(response, true);
      },
      error: (err: HttpErrorResponse) => {
        swal("Failure!", err.error || 'Failure', "warning");
        if (this.router) this.router.navigate([this.target]);
        cb(err, false);
      },
    };
  }

  OBSERVER_VERIFY_ACCOUNT(cb) {
    return {
      next: (response: any) => {
        cb(response, true);
      },
      error: (err: HttpErrorResponse) => {
        cb(err, false);
      },
    };
  }

  OBSERVER_GET(cb) {
    return {
      next: (response: any) => {
        cb(response, true);
      },
      error: (err) => {
        cb(err, false);
      },
    };
  }
  OBSERVER_RESET(cb) {
    return {
      next: (response: any) => {
        cb(response, true);
        if (this.swal_display) swal("Success!", response.message, "success");
        if (this.target) this.router.navigate([this.target]);
      },
      error: (err: HttpErrorResponse) => {
        cb(err, false);
        swal("Failure!", err.error || 'Failure', "warning");
      },
    };
  }

  OBSERVER_DELETE(cb?) {
    return {
      next: (response: any) => {
        if (this.router) {
          swal("Success!", response.message, "success");
          this.sharedService.reloadComponent(this.router);
        }
        if (cb) cb(response, true);
      },
      error: (err: HttpErrorResponse) => {
        if (cb) cb(err, false);
        if (this.router) swal("Failure!", err.error || 'Failure', "warning");
      },
    };
  }

  OBSERVER_PUT() {
    return {
      next: (response: any) => {
        if (this.router) {
          swal("Success!", response.message, "success");
          this.sharedService.reloadComponent(this.router); // cb(response)
        }
      },
      error: (err: HttpErrorResponse) => {
        if (this.router) swal("Failure!", err.error || 'Failure', "warning");
      },
    };
  }
  OBSERVER_EDIT() {
    return {
      next: (response: any) => {
        swal("Success!", response.message, "success");
        this.sharedService.reloadComponent(this.router);
        if (this.activeModal) this.activeModal.dismiss();
        // cb(response, true);
      },
      error: (err: HttpErrorResponse) => {
        // cb(err, false);
        swal("Failure!", err.error || 'Failure', "warning");
      },
    };
  }

  OBSERVER_SIGNIN(cb) {
    return {
      next: (response: any) => {
        if (this.target) this.router.navigate([this.target]);
        cb(response, true);
      },
      error: (err: HttpErrorResponse) => {
        cb(err, false);
        swal("Failure!", err.error.message || 'Failure', "warning");
      },
    };
  }

  OBSERVER_SIGNINFIRESTCONNECTION(cb) {
    return {
      next: (response: any) => {
        cb(response, true);
      },
      error: (err: HttpErrorResponse) => {
        cb(err, false);
        swal("Failure!", err.error.message || 'Failure', "warning");
      },
    };
  }
}