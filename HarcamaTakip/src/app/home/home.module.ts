import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // ngModel çalışması için şart
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage] // Sayfamızı buraya tanıttık
})
export class HomePageModule {}