import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './home-car.component.html',
  styleUrls: ['./home-car.component.css'],
})
export class HomeCarComponent implements OnInit {
  car = {} as Car;
  cars: Car[] | any;

  checkoutForm: any;

  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.checkoutForm = formBuilder.group({
      model: '',
    });
  }

  ngOnInit(): void {
    this.getCars();
  }

  //definir se um carro será criado ou atualizado
  saveCar() {
    const signCar = this.checkoutForm.value;
    if (signCar.id !== undefined) {
      this.carService.updateCar(this.car).subscribe(() => {
      });
    } else {
      this.carService.saveCar(signCar).subscribe(() => {
      });
    }
  }

  //chama o serviço para obter todos os carros
  getCars() {
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    });
  }

  //deleta um carro
  deleteCar(car: Car) {
    this.carService.deleteCar(car).subscribe(() => {
      this.getCars();
    });
  }

  //editar um carro
  editCar(id: number) {
    this.router.navigate([`/car-edit/${id}`]);
  }

  // this.car = {...car};//usando destructing

  //limpa o formulario
  cleanForm(form: NgForm) {
    this.getCars();
    form.resetForm();
    this.car = {} as Car;
  }
}
