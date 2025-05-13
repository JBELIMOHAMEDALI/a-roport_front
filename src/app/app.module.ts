import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { DashboardDefaultComponent } from './pages/dashboard/dashboard-default/dashboard-default.component';
import { SimplePageComponent } from './pages/simple-page/simple-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { RegComponent } from './pages/auth/reg/reg.component';

import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { UserAccountManagementComponent } from './pages/admin_management/user-account-management/user-account-management.component';
import { TokenStorageService } from './service/token-storage.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthGuardLogin } from './guards/auth.login.guard';
import { AccessGuard } from './guards/access.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CategoriesAccountManagementComponent } from './pages/admin_management/categories-account-management/categories-account-management.component';
import { CategoriesComponent } from './pages/admin_management/popup/categories/categories.component';
import { ProductManagementComponent } from './pages/admin_management/product-management/product-management.component';
import { ProductComponent } from './pages/admin_management/popup/product/product.component';
import { ProductInfoComponent } from './pages/admin_management/popup/product-info/product-info.component';
import { FirestPagesComponent } from './pages/firest-pages/firest-pages.component';
import { DetaileOneProductComponent } from './pages/client_management/detaile-one-product/detaile-one-product.component';
import { CartListComponent } from './pages/cart-list/cart-list.component';
import { ListProductComponent } from './pages/client_management/list-product/list-product.component';
import { AddToCaredProductComponent } from './pages/client_management/poupup/add-to-cared-product/add-to-cared-product.component';
import { ListMyCommandeComponent } from './pages/client_management/list-my-commande/list-my-commande.component';
import { UsersComponent } from './pages/admin_management/popup/users/users.component';
import { UsersInfoComponent } from './pages/admin_management/popup/users-info/users-info.component';
import { CommandeManagmentComponent } from './pages/admin_management/commande-managment/commande-managment.component';
import { OrdersComponent } from './pages/admin_management/popup/orders/orders.component';
import { OrdersAffectesLivreurComponent } from './pages/admin_management/popup/orders-affectes-livreur/orders-affectes-livreur.component';
import { InfoUserComponent } from './pages/admin_management/popup/info-user/info-user.component';
import { ListOrdersComponent } from './pages/livreur_management/list-orders/list-orders.component';
import { ChangeStatusOrsdresComponent } from './pages/livreur_management/poupup/change-status-orsdres/change-status-orsdres.component';
import { FactureComponent } from './pages/admin_management/facture/facture.component';
import { ListAvisForAdminComponent } from './pages/admin_management/list-avis-for-admin/list-avis-for-admin.component';
import { DetailseAvisAdminComponent } from './pages/admin_management/detailse-avis-admin/detailse-avis-admin.component';
import { AddCommanterComponent } from './pages/client_management/poupup/add-commanter/add-commanter.component';
import { FirestConnectionComponent } from './pages/firest-connection/firest-connection.component';
import { FooterComponent } from './pages/home_page/footer/footer.component';
import { HeaderComponent } from './pages/home_page/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SigninComponent,
    DashboardDefaultComponent,
    SimplePageComponent,
    HomePageComponent,
    ProfileComponent,
    RegComponent,
    UserAccountManagementComponent,
    CategoriesAccountManagementComponent,
    CategoriesComponent,
    ProductManagementComponent,
    ProductComponent,
    ProductInfoComponent,
    FirestPagesComponent,
    DetaileOneProductComponent,
    CartListComponent,
    ListProductComponent,
    AddToCaredProductComponent,
    ListMyCommandeComponent,
    UsersComponent,
    UsersInfoComponent,
    CommandeManagmentComponent,
    OrdersComponent,
    OrdersAffectesLivreurComponent,
    InfoUserComponent,
    ListOrdersComponent,
    ChangeStatusOrsdresComponent,
    FactureComponent,
    ListAvisForAdminComponent,
    DetailseAvisAdminComponent,
    AddCommanterComponent,
    FirestConnectionComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
    //HomePageComponent
    //BreadcrumbsComponent
    //SigninComponent,
    //BasicLoginComponent,
    //DashboardDefaultComponent
  ],
  entryComponents: [
    CategoriesComponent,
    ProductComponent,
    ProductInfoComponent,
    AddToCaredProductComponent,
    UsersComponent,
    UsersInfoComponent,
    OrdersComponent,
    OrdersAffectesLivreurComponent,
    InfoUserComponent,
    ChangeStatusOrsdresComponent,
    AddCommanterComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    NgbActiveModal,
    TokenStorageService,
    AuthGuard,
    AuthGuardLogin,
    AccessGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
