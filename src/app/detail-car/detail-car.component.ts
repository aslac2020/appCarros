import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../models/car';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-detail-car',
  templateUrl: './detail-car.component.html',
  styleUrls: ['./detail-car.component.css']
})
export class DetailCarComponent implements OnInit {

  checkoutForm!: FormGroup;
  cars!: Car;
  id: number = 0;

  constructor(
    private carService: CarService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) {
      this.criarFormEmpty()
     }

  ngOnInit(): void {
    const carId = this.id = this.activatedRoute.snapshot.params['id']

    this.carService.getCarById(carId).subscribe(
      data => {
      this.criarForm(data);;
    })
  }

  criarForm(cars: Car){
    this.checkoutForm.controls['id'].setValue(cars.id);
    this.checkoutForm.controls['model'].setValue(cars.model);
    this.checkoutForm.controls['color'].setValue(cars.color);
    this.checkoutForm.controls['price'].setValue(cars.price);
  }

  criarFormEmpty(){
    this.checkoutForm = this.fb.group({
      id: [''],
      model: [''],
      color: [''],
      price: [''],

    });
  }

}
