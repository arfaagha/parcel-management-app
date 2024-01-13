import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ParcelService } from "../parcel.service";
import { Parcel } from "../parcel";
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogueComponent } from "../confirm-dialogue/confirm-dialogue.component";

@Component({
  selector: "app-add-parcel",
  templateUrl: "./add-parcel.component.html",
  styleUrl: "./add-parcel.component.css",
})
export class AddParcelComponent {
  
   Success(){
    this.createParcelForm.reset();
   }

  createParcelForm!: FormGroup;
  created: boolean | undefined;
  parcelCreateResponse!: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: ParcelService,
    private dialog: MatDialog
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
    this.service.createParcel(parcel).subscribe((data) => {
      this.created = true;
      this.Success();
    },
    (error) =>{
      this.created= false;

      if(error instanceof HttpErrorResponse){
        this.parcelCreateResponse = error.message;
      }
      if(error.status === 422){
        this.parcelCreateResponse = 'Parcel could not be saved.'
      }
    });
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

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef= this.dialog.open(ConfirmDialogueComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    const sub = dialogRef.componentInstance.onAdd.subscribe(() => {
      this.createParcel(this.createParcelForm.value as Parcel);
    });
  }
}
