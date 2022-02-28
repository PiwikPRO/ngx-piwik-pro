import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from '../../app-routing.module';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    MatButtonModule,
    CommonModule
  ],
  exports: [ NavbarComponent ]
})
export class NavbarModule { }
