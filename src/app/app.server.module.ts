
import {
  ServerTransferStateModule
} from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    ServerTransferStateModule, //  <-- needed for state transfer
    ModuleMapLoaderModule // <-- needed for lazy-loaded routes
  ]
})
export class AppServerModule {}
