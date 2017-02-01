import {Component, Input} from '@angular/core';

@Component({
  selector: 'translation-item',
  templateUrl: './translation-item.component.html',
  styleUrls: ['./translation-item.component.scss']
})
export class TranslationItemComponent {
  private originalText: string;
  private translatedText: string;
  @Input() private short: false;
  @Input() private length: number;
  private isTranslationHidden: boolean = true;
  private isTranslationAvailable: boolean = true;

  constructor(
  ) {
  }

  @Input()
  set text(text: string) {
    text = this.shortenText(text);
    this.originalText = text;
  };

  get text() {
    return this.originalText;
  }

  @Input()
  set translation(translation: string) {
    if (!translation) {
      this.isTranslationAvailable = false;
    } else {
      translation = this.shortenText(translation);
    }
    this.translatedText = translation;
  }

  get translation() {
    return this.translatedText;
  }

  private shortenText(text: string) {
    if (this.short && text.length > this.length) {
      text = text.slice(0, this.length);
      text += '...';
    }

    return text;
  }
}
