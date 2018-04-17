import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatListModule, MatIconModule,
   MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { FilePreviewOverlayToolbarComponent } from './file-preview-overlay-toolbar/file-preview-overlay-toolbar.component';
import { ImageViewerComponent } from './image-viewer.component';
import { FilePreviewOverlayComponent } from './file-preview-overlay/file-preview-overlay.component';
import { FilePreviewOverlayService } from './file-preview-overlay.service';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    FormsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    OverlayModule,
    MatProgressSpinnerModule,
    CommonModule,
    FlexLayoutModule,
  ],
  exports: [ImageViewerComponent],
  declarations: [ImageViewerComponent,
    FilePreviewOverlayComponent,
    FilePreviewOverlayToolbarComponent,
  ],
  providers: [
    FilePreviewOverlayService
  ],
  entryComponents: [
    FilePreviewOverlayComponent
  ]
})
export class ImageViewerModule { }
