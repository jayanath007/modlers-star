export interface GalleryConf {
  imageBorderRadius?: string;
  imageOffset?: string;
  imagePointer?: boolean;
  showDeleteControl?: boolean;
  showCloseControl?: boolean;
  showExtUrlControl?: boolean;
  showArrows?: boolean;
  showImageTitle?: boolean;
  showThumbnails?: boolean;
  closeOnEsc?: boolean;
  reactToKeyboard?: boolean;
  reactToMouseWheel?: boolean;
  reactToRightClick?: boolean;
  thumbnailSize?: number;
  backdropColor?: string;
  inline?: boolean;
}

export interface GalleryImage {
  _cached?: boolean;
  url: string;
  thumbnailUrl?: string;
  altText?: string;
  title?: string;
  extUrl?: string;
  extUrlTarget?: string;
}

export const DEMO_GALLERY_CONF: GalleryConf = {
  imageOffset: '0px',
  showDeleteControl: false,
  showCloseControl: true,
  showImageTitle: true,
  showThumbnails: false,
  showExtUrlControl: false,
  inline: false,
  backdropColor: 'rgba(13,13,14,0.85)'
};

// gallery images
export const DEMO_GALLERY_IMAGE: GalleryImage[] = [

  {
    title: 'woman-in-black-blazer-holding-blue-cup',
    url: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    altText: 'woman-in-black-blazer-holding-blue-cup',
    thumbnailUrl: 'https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=60'
  },
  {
    title: 'woman-in-black-blazer-holding-blue-cup',
    url: 'https://i.pinimg.com/originals/f4/46/7f/f4467f62d8a6720b09de6754685694d2.jpg',
    altText: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain',
    thumbnailUrl: 'https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=60'
  },
  {
    title: 'woman-in-black-blazer-holding-blue-cup',
    url: 'https://thumb1.shutterstock.com/display_pic_with_logo/184405556/731759044/stock-photo-pappy-jack-wearing-sweater-731759044.jpg',
    altText: 'woman-in-black-blazer-holding-blue-cup',
    thumbnailUrl: 'https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=60'
  },
  {
    // tslint:disable-next-line:max-line-length
    title: 'woman-in-black-blazer-holding-blue-cup',
    url: 'https://static1.squarespace.com/static/5519d4dde4b08a0cc608d19a/56841754a128e6cd9b4c3465/56841b6ad8af10be6f7c1ac2/1451498351502/Pappy1.png',
    altText: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain',
    thumbnailUrl: 'https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=60'
  },
  {
    url: 'https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=1260',
    altText: 'woman-in-black-blazer-holding-blue-cup',
    title: 'woman-in-black-blazer-holding-blue-cup',
    thumbnailUrl: 'https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=60'
  },
  {
    url: 'https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=1260',
    altText: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain',
    extUrl: 'https://www.pexels.com/photo/two-woman-standing-on-the-ground-and-staring-at-the-mountain-669006/',
    thumbnailUrl: 'https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=60'
  },
];


