import { Component, OnInit } from '@angular/core';
import { IonText, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { warning } from 'ionicons/icons';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  standalone: true,
  imports: [IonIcon, IonText,]
})
export class ErrorComponent {

  constructor() {
    addIcons({ warning });
  }

}
