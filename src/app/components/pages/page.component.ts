/**
 ** Author: Bex
 **
 ** Page component that all page components shall extend.
 **
 ** Handles static meta tags for each page passed via the constructor.
 **
 ** The tags can be updated dynamically via the updatePageMeta method or the
 ** Meta service.
 **
 ** DO NOT EDIT THIS FILE WITHOUT PERMISSION!
 **/

import {BaseComponent} from '../base.component';
import {Meta} from '@angular/platform-browser';
import {OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {PageOptionsService} from '../../services/page-options.service';
import {RendererFactory2} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../resolvers/user/user.resolver';
import {ViewEncapsulation} from '@angular/core';

export interface PageMeta {
  canonicalUrl?: string,
  description: {translate: boolean, content: string},
  image?: {content: string},
  title: {translate: boolean, content: string},
  translateParams?: any
}

export abstract class PageComponent extends BaseComponent implements OnInit, OnDestroy {

  private metaTranslationsSubscription: Subscription;

  public constructor (
    private pageMeta: PageMeta,
    protected document: any,
    protected meta: Meta,
    protected pageOptionsService: PageOptionsService = null,
    protected rendererFactory: RendererFactory2,
    protected request: any,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected translateService: TranslateService,
    protected userResolver: UserResolver,
    protected transparentNavbarWhenTopScrolled: boolean = false,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public ngOnInit(): void {
    this.updatePageMeta(this.pageMeta);

    this.pageOptionsService.setTransparentNavbarWhenTopScrolled(this.transparentNavbarWhenTopScrolled);

    super.ngOnInit();
  }

  protected updatePageMeta(pageMeta: PageMeta) {
    if (this.metaTranslationsSubscription) { this.metaTranslationsSubscription.unsubscribe(); }

    this.pageMeta = pageMeta;

    this.metaTranslationsSubscription = this.translateService.get([this.pageMeta.title.content, this.pageMeta.description.content], this.pageMeta.translateParams)
      .concat(this.translateService.onLangChange.map(event => event.translations))
      .subscribe(translations => {
        for (let language of this.systemLanguagesResolver.getSystemLanguages()) {
          this.meta.removeTag("property='og:locale:alternate'");
        }
        this.meta.removeTag("property='og:image:width'");
        this.meta.removeTag("property='og:image:height'");

        if (this.pageMeta.title.translate) {
          this.meta.updateTag({
            content: translations[this.pageMeta.title.content]
          },
            'property="og:title"'
          );
        } else {
          this.meta.updateTag({
            content: this.pageMeta.title.content
          },
            'property="og:title"'
          );
        }

        if (this.pageMeta.description.translate) {
          this.meta.updateTag({
            content: translations[this.pageMeta.description.content]
          },
            'name="description"'
          );

          this.meta.updateTag({
            content: translations[this.pageMeta.description.content]
          },
            'property="og:description"'
          );
        } else {
          this.meta.updateTag({
            content: this.pageMeta.description.content
          },
            'name="description"'
          );

          this.meta.updateTag({
            content: this.pageMeta.description.content
          },
            'property="og:description"'
          );
        }

        if (this.pageMeta.image) {
          this.meta.updateTag({
            content: this.pageMeta.image.content
          },
            'property="og:image"'
          );
        } else {
          this.meta.updateTag({
            content: PageComponent.getBaseUrl(this.request) + '/assets/images/open-graph-base.jpg'
          },
            'property="og:image"'
          );
          this.meta.addTag({ property: 'og:image:width', content: '2346' });
          this.meta.addTag({ property: 'og:image:height', content: '1314' });
        }

        this.meta.updateTag({
          content: PageComponent.getUrl(this.request)
        },
          'property="og:url"'
        );

        if (this.pageMeta.canonicalUrl) {
          this.addLinkTag( { rel: 'canonical', href: this.pageMeta.canonicalUrl } );
        }

        this.meta.updateTag({
          content: this.mapToOpenGraphLocale(this.systemLanguagesResolver.getSelectedSystemLanguageCode())
        },
          'property="og:locale"'
        );

        for (let language of this.systemLanguagesResolver.getSystemLanguages()) {
          this.meta.addTag({ property: 'og:locale:alternate', content: this.mapToOpenGraphLocale(language.languageCode) });
        }
      });
  }

  public static getUrl(request: any): string {
    // If server side get url from request otherwise window.location.pathname
    if (request) {
      return request.protocol + '://' + request.headers.host + request.url.split("?").shift();
    } else {
      return window.location.origin + window.location.pathname;
    }
  }

  public static getBaseUrl(request: any): string {
    // If server side get url from request otherwise window.location.pathname
    if (request) {
      return request.protocol + '://' + request.headers.host;
    } else {
      return window.location.origin;
    }
  }

  private mapToOpenGraphLocale(languageCode: string): string {
    const openGraphLocaleMap = {
      'ar': 'ar_AR',
      'en': 'en_US',
      'fa_AF': 'fa_IR',
      'fa': 'fa_IR',
      'ku': 'ku_TR',
      'ps': 'ps_AF',
      'sv': 'sv_SE',
      'ti': 'en_US',
    }

    return openGraphLocaleMap[languageCode];
  }

    /**
    * Inject the State into the bottom of the <head>
    */
   private addLinkTag(tag: LinkDefinition, forceCreation?: boolean) {

     try {
       const renderer = this.rendererFactory.createRenderer(this.document, {
         id: '-1',
         encapsulation: ViewEncapsulation.None,
         styles: [],
         data: {}
       });

       const link = renderer.createElement('link');
       const head = this.document.head;
       const selector = this.linkParseSelector(tag);

       if (head === null) {
         throw new Error('<head> not found within DOCUMENT.');
       }

       Object.keys(tag).forEach((prop: string) => {
           return renderer.setAttribute(link, prop, tag[prop]);
       });

       const children = head.children;
       for (let i = 0; i < children.length; i++) {
         if (children[i].localName === 'link' && children[i].rel === tag.rel) {
           renderer.removeChild(head, children[i]);
         }
       }
       renderer.appendChild(head, link);

     } catch (e) {
         console.error('Error within linkService : ', e);
     }
   }

   private linkParseSelector(tag: LinkDefinition): string {
       // Possibly re-work this
       const attr: string = tag.rel ? 'rel' : 'hreflang';
       return `${attr}="${tag[attr]}"`;
   }


  public ngOnDestroy(): void {
    if (this.metaTranslationsSubscription) { this.metaTranslationsSubscription.unsubscribe(); }
    super.ngOnDestroy();
  }
}

export declare type LinkDefinition = {
  charset?: string;
  crossorigin?: string;
  href?: string;
  hreflang?: string;
  media?: string;
  rel?: string;
  rev?: string;
  sizes?: string;
  target?: string;
  type?: string;
} & {
  [prop: string]: string;
};
