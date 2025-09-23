import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab1Page {
  detectedText: string = 'No text detected yet.';

  constructor(private photoService: PhotoService) {}

  async captureAndDetectText() {
    this.detectedText = 'Processing...';
    await this.photoService.addNewToGallery();
    this.detectedText = 'Text detection completed.';
  }
}
