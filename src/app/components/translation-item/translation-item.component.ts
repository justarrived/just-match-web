import {Component, Input} from '@angular/core';
import * as  _ from 'lodash';

@Component({
  selector: 'translation-item',
  templateUrl: './translation-item.component.html',
  styleUrls: ['./translation-item.component.scss']
})
export class TranslationItemComponent {
  originalText: string;
  translatedText: string;

  @Input()
  set text(text: string) {
    text = this.shortenText(text);
    this.originalText = text;
  };

  get text() {
    return this.originalText
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

  @Input() short: false;
  @Input() length: number;

  isTranslationHidden: boolean = true;
  isTranslationAvailable: boolean = true;

  constructor() {
  }

  toggleTranslation(event) {
    event.stopImmediatePropagation();
    this.isTranslationHidden = !this.isTranslationHidden;
  }

  shortenText(text: string) {
    if (this.short && text.length > this.length) {
      text = text.slice(0, this.length);
      text += '...';
    }

    return text;
  }
}
