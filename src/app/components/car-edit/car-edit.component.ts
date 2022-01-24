import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {

  checkoutForm!: FormGroup;
  cars!: Car;
  id: number = 0;

  constructor(private carService: CarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {
      this.criarFormEmpty()
     }

  ngOnInit(): void {
   let carId =  this.id = this.activatedRoute.snapshot.params['id'];

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

  UpdateFormCar(){

    if(this.checkoutForm.invalid){
      return;
    }

    const newCar = this.checkoutForm.getRawValue() as Car;
    this.carService.updateCar(newCar).subscribe(() => {
      this.router.navigate([''])
    })

  }


}
