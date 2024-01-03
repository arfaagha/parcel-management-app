import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-parcel',
  templateUrl: './add-parcel.component.html',
  styleUrl: './add-parcel.component.css'
})
export class AddParcelComponent {

submitButton() {
console.log()
}

  createParcelForm!: FormGroup;
  created = false;

  constructor(private formBuilder: FormBuilder){
    this.createParcelForm = this.formBuilder.group({
      sku: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern(new RegExp(/^\d{4}-\d{8}-\d{4}$/gm))])),
      description: this.formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(200)])),
      streetAddress: this.formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])),
      town: this.formBuilder.control('', Validators.compose([Validators.required,Validators.minLength(2), Validators.maxLength(40)])),
      country: this.formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])),
      deliveryDate: this.formBuilder.control(new Date(), Validators.compose([Validators.required])),
    })
  }
}
