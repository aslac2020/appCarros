import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css'],
})
export class NewCarComponent implements OnInit {
  checkoutForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      id: [''],
      model: ['', Validators.required],
      color: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  signNewCar() {
    if (this.checkoutForm.invalid) {
      return;
    }

    const newCar = this.checkoutForm.getRawValue() as Car;
    this.carService.saveCar(newCar).subscribe(
      () => {
        this.router.navigate(['']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  criarFormEmpty() {
    this.checkoutForm = this.fb.group({
      id: [''],
      model: [''],
      color: [''],
      price: [''],
    });
  }
}

