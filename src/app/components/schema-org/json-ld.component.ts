// from https://github.com/coryrylan/ngx-json-ld/blob/2f8190c26aa0ac4078a1d94980bfb960f56fc872/src/json-ld.component.ts
import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'json-ld',
  template: ''
})
export class JsonLdComponent implements OnChanges {
  @Input() json;
  @HostBinding('innerHTML') jsonLD: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges) {
    this.jsonLD = this.getSafeHTML(changes.json.currentValue);
  }

  getSafeHTML(value: {}) {
    const json = value ? JSON.stringify(value, null, 2).replace(/<\/script>/g, '<\\/script>') : '';
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
