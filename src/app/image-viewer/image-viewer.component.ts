// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-image-viewer',
//   templateUrl: './image-viewer.component.html',
//   styleUrls: ['./image-viewer.component.scss']
// })
// export class ImageViewerComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import { Component } from '@angular/core';
import { FilePreviewOverlayService } from './file-preview-overlay.service';
import { FilePreviewOverlayRef } from './file-preview-overlay-ref';

import { STATIC_FILE_DATE } from './data';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent  {
  files = STATIC_FILE_DATE;

  constructor(private previewDialog: FilePreviewOverlayService) { }

  showPreview(file) {
    const dialogRef: FilePreviewOverlayRef = this.previewDialog.open({
      image: file
    });
    // abc
  }
}

