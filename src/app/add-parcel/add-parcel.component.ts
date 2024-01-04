import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ParcelService } from "../parcel.service";
import { Parcel } from "../parcel";

@Component({
  selector: "app-add-parcel",
  templateUrl: "./add-parcel.component.html",
  styleUrl: "./add-parcel.component.css",
})
export class AddParcelComponent {
  submitButton() {
    this.createParcel(this.createParcelForm.value as Parcel);

    // TODO: get http response from API and
    // display appropriate message along with resetting the form
    
    this.createParcelForm.reset();
   }

  createParcelForm!: FormGroup;
  created = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: ParcelService
  ) {
    this.newForm();
  }
  newForm(){
    this.createParcelForm = this.formBuilder.group({
      sku: this.formBuilder.control(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(new RegExp(/^\d{4}-\d{8}-\d{4}$/gm)),
        ])
      ),
      description: this.formBuilder.control(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200),
        ])
      ),
      streetAddress: this.formBuilder.control(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ])
      ),
      town: this.formBuilder.control(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ])
      ),
      country: this.formBuilder.control(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ])
      ),
      deliveryDate: this.formBuilder.control(
        new Date(),
        Validators.compose([Validators.required])
      ),
    });
  }

  createParcel(parcel: Parcel) {
    this.service.createParcel(parcel).subscribe((data) => {});
  }

  checkSkuValidity() {
    this.service
      .checkSkuValidity(this.createParcelForm.value.sku)
      .subscribe((data) => {
        if (!data) {
          this.createParcelForm.controls["sku"].setErrors({ incorrect: true });
        }
      });
  }
}
