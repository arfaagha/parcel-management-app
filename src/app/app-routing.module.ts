import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParcelComponent } from './parcel/parcel.component';

const routes: Routes = [
  {
    path: '',
    component: ParcelComponent,
    title: 'Parcel List'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
