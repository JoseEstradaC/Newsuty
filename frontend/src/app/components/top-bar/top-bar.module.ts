import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TopBarComponent } from './top-bar.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [TopBarComponent],
  exports: [TopBarComponent],
})
export class TopBarComponentModule {}
