
import { ViewChild, Component } from '@angular/core';

import { PaginationService } from '../../shared/pagination.service';
import { HomeBase } from '../../home-core/home.base';
import { AuthService } from '../../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ImageGalleryDesktopComponent } from '../../image-gallery-desktop/image-gallery-desktop.component';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent extends HomeBase {


    @ViewChild(ImageGalleryDesktopComponent) imageGalleryDesktopComponent: ImageGalleryDesktopComponent;

    constructor(public page: PaginationService, public auth: AuthService,  public route: ActivatedRoute) {
        super(page , route);
    }


}
