import { NewCarComponent } from './components/new-car/new-car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { HomeCarComponent } from './components/home-car/home-car.component';
import { DetailCarComponent } from './detail-car/detail-car.component';

const routes: Routes = [
  {
    path: '',
    component: HomeCarComponent
  },
  {
    path: 'new-car',
    component: NewCarComponent
  },
  {
    path: 'car-edit/:id',
    component: CarEditComponent,
  },
  {
    path: 'detail-car/:id',
    component: DetailCarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
