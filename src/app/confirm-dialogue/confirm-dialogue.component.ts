import { Component, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialogue',
  templateUrl: './confirm-dialogue.component.html',
  styleUrl: './confirm-dialogue.component.css'
})
export class ConfirmDialogueComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogueComponent>) {}

  onAdd = new EventEmitter();

  onConfirm(): void{
    this.onAdd.emit();
  }
}