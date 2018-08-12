import { Album } from '../../models/models';
import { ViewChild, Component, AfterViewInit, ElementRef } from '@angular/core';
import { ImageGalleryComponent } from '../../shared/image-gallery/image-gallery.component';
import { PaginationService } from '../../shared/pagination.service';
import { GalleryImage } from '../../shared/image-gallery/config';
import { HomeBase } from '../../home-core/home.base';
import { AuthService } from '../../core/auth.service';
import { ImageInfo } from '../../models/models';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent extends HomeBase {


    @ViewChild(ImageGalleryComponent) imageGalleryComponent: ImageGalleryComponent;

    constructor(public page: PaginationService, public auth: AuthService,  public route: ActivatedRoute) {
        super(page , route);
    }


}
