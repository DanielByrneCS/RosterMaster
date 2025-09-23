import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { TextDetections, Ocr } from '@capacitor-community/image-to-text';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    // Use webPath if path is undefined
    const photoPath = capturedPhoto.path || capturedPhoto.webPath;
    const detectedText : string[] = [];
    if (photoPath) {
      try {
        const data: TextDetections = await Ocr.detectText({ filename: photoPath });
        for (let detection of data.textDetections) {
          console.log(detection.text);
          detectedText.push(detection.text);
          
        }
      } catch (error) {
        console.error('Error during OCR:', error);
      }
    } else {
      console.error('Photo path is undefined.');
    }
  }

  public async processImage(base64Image: string): Promise<string> {
    try {
      const data: TextDetections = await Ocr.detectText({ base64: base64Image });
      const detectedText = data.textDetections.map(detection => detection.text).join(' ');
      return detectedText;
    } catch (error) {
      console.error('Error during OCR:', error);
      return 'Error during OCR.';
    }
  }
}
