import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Inject} from '@angular/core';
import {Input} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {NavigationService} from '../../../services/navigation.service';
import {Output} from '@angular/core';
import {PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'guide-menu',
  styleUrls: ['./guide-menu.component.scss'],
  template: `
    <div>

      <basic-title-text
        text="Jobbguiden"
        color="pink"
        fontSize="large"
        marginTop="0"
        marginBottom="2rem">
      </basic-title-text>

      <div class="ui list guide-menu-container">
        <div class="guide-menu-section-title">
          <h3>Innan du söker jobb</h3>
        </div>

        <basic-link
          text="Det här behöver du för att börja jobba i Sverige"
          class="guide-menu-section-item"
          [color]="getCurrentUrl() === '/guide' ? 'black' : 'gray'"
          fontSize="small"
          [fontWeight]="getCurrentUrl() === '/guide' ? 'bold' : 'normal'"
          hoverColor="pink"
          marginBottom=".5rem"
          marginTop="0"
          [routerLink]="JARoutes.home.url()">
        </basic-link>

        <basic-link
          text="Personnummer och samordningsnummer"
          class="guide-menu-section-item"
          [color]="getCurrentUrl() === '/' ? 'black' : 'gray'"
          fontSize="small"
          [fontWeight]="getCurrentUrl() === '/' ? 'bold' : 'normal'"
          hoverColor="pink"
          marginBottom=".5rem"
          marginTop="0"
          [routerLink]="JARoutes.home.url()">
        </basic-link>

        <div class="guide-menu-section-title">
          <h3>Att söka jobb</h3>
        </div>

        <basic-link
          text="Det här behöver du för att börja jobba i Sverige"
          class="guide-menu-section-item"
          [color]="getCurrentUrl() === '/' ? 'black' : 'gray'"
          fontSize="small"
          [fontWeight]="getCurrentUrl() === '/' ? 'bold' : 'normal'"
          hoverColor="pink"
          marginBottom=".5rem"
          marginTop="0"
          [routerLink]="JARoutes.home.url()">
        </basic-link>

        <basic-link
          text="Personnummer och samordningsnummer"
          class="guide-menu-section-item"
          [color]="getCurrentUrl() === '/' ? 'black' : 'gray'"
          fontSize="small"
          [fontWeight]="getCurrentUrl() === '/' ? 'bold' : 'normal'"
          hoverColor="pink"
          marginBottom=".5rem"
          marginTop="0"
          [routerLink]="JARoutes.home.url()">
        </basic-link>

        <div class="guide-menu-section-title">
          <h3>På jobbet</h3>
        </div>

        <basic-link
          text="Det här behöver du för att börja jobba i Sverige"
          class="guide-menu-section-item"
          [color]="getCurrentUrl() === '/' ? 'black' : 'gray'"
          fontSize="small"
          [fontWeight]="getCurrentUrl() === '/' ? 'bold' : 'normal'"
          hoverColor="pink"
          marginBottom=".5rem"
          marginTop="0"
          [routerLink]="JARoutes.home.url()">
        </basic-link>

        <basic-link
          text="Personnummer och samordningsnummer"
          class="guide-menu-section-item"
          [color]="getCurrentUrl() === '/' ? 'black' : 'gray'"
          fontSize="small"
          [fontWeight]="getCurrentUrl() === '/' ? 'bold' : 'normal'"
          hoverColor="pink"
          marginBottom=".5rem"
          marginTop="0"
          [routerLink]="JARoutes.home.url()">
        </basic-link>

      </div>

    </div>`
})
export class GuideMenuComponent extends BaseComponent {

  public constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private navigationService: NavigationService,
    private router: Router,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public getCurrentUrl(): string {
    return this.navigationService.getCurrentUrl();
  }
}
