import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DestacadosPage } from './destacados.page';
import { DestacadosPageRoutingModule } from './destacados-routing.module';
import { TopBarComponentModule } from 'src/app/components/top-bar/top-bar.module';
import { NewComponentModule } from 'src/app/components/new/new.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DestacadosPageRoutingModule,
    TopBarComponentModule,
    NewComponentModule,
  ],
  declarations: [DestacadosPage],
})
export class DestacadosPageModule {}
