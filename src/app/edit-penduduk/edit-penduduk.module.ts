import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPendudukPageRoutingModule } from './edit-penduduk-routing.module';

import { EditPendudukPage } from './edit-penduduk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPendudukPageRoutingModule
  ],
  declarations: [EditPendudukPage]
})
export class EditPendudukPageModule {}
