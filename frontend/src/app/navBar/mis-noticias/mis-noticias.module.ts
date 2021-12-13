import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MisNoticiasPage } from './mis-noticias.page';

import { MisNoticiasPageRoutingModule } from './mis-noticias-routing.module';
import { TopBarComponentModule } from 'src/app/components/top-bar/top-bar.module';
import { NewComponentModule } from 'src/app/components/new/new.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MisNoticiasPage }]),
    MisNoticiasPageRoutingModule,
    TopBarComponentModule,
    NewComponentModule,
  ],
  declarations: [MisNoticiasPage],
})
export class MisNoticiasPageModule {}
