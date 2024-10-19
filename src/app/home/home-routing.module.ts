import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ViewVendorDetailsComponent } from './view-vendor-details/view-vendor-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'view-vendor-details/:id',
    component: ViewVendorDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
