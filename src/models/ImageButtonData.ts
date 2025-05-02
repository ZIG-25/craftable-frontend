export class ImageButtonData {
  imgSrc: string;
  imgAlt: string;
  onClick: () => void;

  public constructor(imgSrc: string, imgAlt: string, onClick: () => void) {
    this.imgSrc = imgSrc;
    this.imgAlt = imgAlt;
    this.onClick = onClick;
  }
}