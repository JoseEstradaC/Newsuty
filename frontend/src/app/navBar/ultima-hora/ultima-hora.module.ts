import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UltimaHoraPageRoutingModule } from './ultima-hora-routing.module';

import { UltimaHoraPage } from './ultima-hora.page';
import { TopBarComponentModule } from 'src/app/components/top-bar/top-bar.module';
import { NewComponentModule } from 'src/app/components/new/new.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UltimaHoraPageRoutingModule,
    TopBarComponentModule,
    NewComponentModule,
  ],
  declarations: [UltimaHoraPage],
})
export class UltimaHoraPageModule {}
