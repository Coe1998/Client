import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanTablePage } from './scan-table';

@NgModule({
  declarations: [
    ScanTablePage,
  ],
  imports: [
    IonicPageModule.forChild(ScanTablePage),
  ],
})
export class ScanTablePageModule {}
