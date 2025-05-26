import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { SigninComponent } from "./pages/auth/signin/signin.component";
import { DashboardDefaultComponent } from "./pages/dashboard/dashboard-default/dashboard-default.component";
import { SimplePageComponent } from "./pages/simple-page/simple-page.component";
import { ProfileComponent } from "./pages/user/profile/profile.component";
import { RegComponent } from "./pages/auth/reg/reg.component";
import { UserAccountManagementComponent } from "./pages/admin_management/user-account-management/user-account-management.component";
import { AuthGuardLogin } from "./guards/auth.login.guard";
import { CategoriesAccountManagementComponent } from "./pages/admin_management/categories-account-management/categories-account-management.component";
import { ProductManagementComponent } from "./pages/admin_management/product-management/product-management.component";
import { FirestPagesComponent } from "./pages/firest-pages/firest-pages.component";
import { CartListComponent } from "./pages/cart-list/cart-list.component";
import { ListProductComponent } from "./pages/client_management/list-product/list-product.component";
import { DetaileOneProductComponent } from "./pages/client_management/detaile-one-product/detaile-one-product.component";
import { ListMyCommandeComponent } from "./pages/client_management/list-my-commande/list-my-commande.component";
import { CommandeManagmentComponent } from "./pages/admin_management/commande-managment/commande-managment.component";
import { ListOrdersComponent } from "./pages/livreur_management/list-orders/list-orders.component";
import { FactureComponent } from "./pages/admin_management/facture/facture.component";
import { ListAvisForAdminComponent } from "./pages/admin_management/list-avis-for-admin/list-avis-for-admin.component";
import { DetailseAvisAdminComponent } from "./pages/admin_management/detailse-avis-admin/detailse-avis-admin.component";
import { AuthGuard } from "./guards/auth.guard";
import { AccessGuard } from "./guards/access.guard";
import { FirestConnectionComponent } from "./pages/firest-connection/firest-connection.component";
import { ProductListComponent } from "./pages/home_page/product-list/product-list.component";
import { UserRoleListComponent } from "./pages/admin_management/user-role-list/user-role-list.component";
import { StoreManagementComponent } from "./pages/admin_management/store-management/store-management.component";
import { ShopListComponent } from "./pages/home_page/shop-list/shop-list.component";
import { SettingsWebComponent } from "./pages/admin_management/settings-web/settings-web.component";
import { ProductDetailesListComponent } from "./pages/home_page/product-detailes-list/product-detailes-list.component";
import { CardPaymentComponent } from "./pages/card-payment/card-payment.component";
import { EarningsListComponent } from "./pages/admin_management/earnings-list/earnings-list.component";

const routes: Routes = [
  { 
    path: '', 
    component: FirestPagesComponent, 
    canActivate: [AuthGuardLogin], 
    children: [
      { path: '', component: ShopListComponent, canActivate: [AuthGuardLogin] } ,
      { path: 'shop/:id', component: ProductListComponent, canActivate: [AuthGuardLogin] } ,
      { path: 'product/:id', component: ProductDetailesListComponent, canActivate: [AuthGuardLogin] } ,
      { path: 'shop', component: ShopListComponent, canActivate: [AuthGuardLogin] } ,
      { path: 'login', component: SigninComponent, canActivate: [AuthGuardLogin] } ,
      { path: "signup", component: RegComponent, canActivate: [AuthGuardLogin] },
    ]
  },
  { path: "firest_Connection", component: FirestConnectionComponent, canActivate: [AuthGuardLogin] },
  {
    path: "dashboard",
    component: HomePageComponent,
    canActivateChild: [AuthGuard, AccessGuard],
    children: [
      {
        path: '', component: DashboardDefaultComponent
      },
      {
        path: "profil",
        component: ProfileComponent,
        // data: { role: ["USER", "DELIVERYMAN", "ADMIN"] },
      },
      // { path: "simple", component: SimplePageComponent ,
      //    data: { role: "Medecin" },
      // },

      {
        path: "user_account_management", component: UserAccountManagementComponent,
        // data: { role: ["ADMIN"] },
      },
            {
        path: "card_payment/:id", component: CardPaymentComponent,
        // data: { role: ["ADMIN"] },
      },
            {
        path: "store_management", component: StoreManagementComponent,
        // data: { role: ["ADMIN"] },
      },
      {
        path: "categories_account_management", component: CategoriesAccountManagementComponent,
        // data: { role: ["ADMIN"] },
      },
      {
        path: "product_management", component: ProductManagementComponent,
        // data: { role: ["ADMIN"] },
      },
      {
        path: "my_cart", component: CartListComponent,
        // data: { role: ["USER", "DELIVERYMAN"] },
      },
      {
        path: "product_list", component: ListProductComponent,
        // data: { role: ["USER", "DELIVERYMAN"] },
      },
      {
        path: "detaile_one_product/:id", component: DetaileOneProductComponent,
        // data: { role: ["USER", "DELIVERYMAN"] },
      },
      {
        path: "my_commande", component: ListMyCommandeComponent,
        // data: { role: ["USER", "DELIVERYMAN"] },
      },
      {
        path: "commande_list", component: CommandeManagmentComponent,
        // data: { role: ["ADMIN"] },
      },
      {
        path: "list_affected_orderesLiv", component: ListOrdersComponent,
        // data: { role: ["DELIVERYMAN"] },
      },
      {
        path: "facture/:id", component: FactureComponent,
        // data: { role: ["USER", "DELIVERYMAN", "ADMIN"] },
      },
      {
        path: "avisAdmin", component: ListAvisForAdminComponent,
        // data: { role: ["ADMIN"] },
      },
            {
        path: "role_management", component: UserRoleListComponent,
        // data: { role: ["ADMIN"] },
      },
      {
        path: "avisAdminDetailse/:id", component: DetailseAvisAdminComponent,
        // data: { role: ["ADMIN"] },
      },
            {
        path: "settings", component: SettingsWebComponent,
        // data: { role: ["ADMIN"] },
      },
                  {
        path: "earnings", component: EarningsListComponent,
        // data: { role: ["ADMIN"] },
      },
    ],
  },
    { path: '**', redirectTo: '' }  // Catch-all route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
