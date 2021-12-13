import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NewComponent } from './new.component';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [NewComponent],
  exports: [NewComponent],
  providers: [InAppBrowser],
})
export class NewComponentModule {}
