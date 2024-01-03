import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddParcelComponent } from './add-parcel/add-parcel.component';
import { ParcelComponent } from './parcel/parcel.component';

const routes: Routes = [
  {
      path: '',
      component: ParcelComponent,
      title: 'Parcel List'
  },
  {
      path: 'create',
      component: AddParcelComponent,
      title: 'Creation Form'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
