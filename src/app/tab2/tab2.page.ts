import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonFab, IonFabButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonLabel, IonItem, IonFabButton, IonFab, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent]
})
export class Tab2Page {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(private photoService: PhotoService) {}

  // Trigger the hidden file input
  triggerFileUpload() {
    this.fileInput.nativeElement.click();
  }

  // Handle the file input change event
  async handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        const base64Image = reader.result as string;
        const detectedText = await this.photoService.processImage(base64Image);
        console.log('Detected Text:', detectedText);
      };

      reader.readAsDataURL(file); // Convert the file to a base64 string
    }
  }
}
