import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPendudukPage } from './edit-penduduk.page';

const routes: Routes = [
  {
    path: '',
    component: EditPendudukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPendudukPageRoutingModule {}
