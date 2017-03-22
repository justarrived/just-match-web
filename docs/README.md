# Docs - Just Match Web

Developer guide for Just Match Web.

## High level

* __Technology__
  - Angular 2.4
  - Typescript 2.2
  - SCSS
  - HTML5

* __Scripts__

* __Typescript conventions__

Line length 120 characters

Imports
```
/*
Sorted and one import per line.
Examples:
*/
import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {AuthManager} from '../../../services/auth-manager.service';
import {Component} from '@angular/core';
import {Country} from '../../../models/country/country';
import {CountryProxy} from '../../../services/proxy/country-proxy.service';
...

```

Constructor
```
/*
Sorted arguments and styled as below examples:
Examples:
*/

/*
With arguments and ... statements
*/
public constructor(
  private authManager: AuthManager,
  private countryProxy: CountryProxy,
  private formBuilder: FormBuilder,
  private languageProxy: LanguageProxy,
  private navigationService: NavigationService,
  private router: Router,
  private userProxy: UserProxy,
  protected systemLanguagesResolver: SystemLanguagesResolver
) {
  ...
}

/*
No arguments no statements
*/
public constructor(
) {
}

```


* __HTML conventions__

Line length 120 characters

Attribute alignment
```
<!--
One attribute.
Whole HTML element on one line.
Examples:
-->
<div class="fourteen wide phone ten wide tablet eight wide computer column">

<h3 class="ui dividing header">
  {{'user.register.form.address.section.header' | translate}}
</h3>

<!--
Two or more attributes.
One attribute per line and sorted on attribute name.
Examples:
-->
<input-errors
  [apiErrors]="apiErrors"
  [control]="registerForm.controls['first_name']"
  apiAttribute="first_name">
</input-errors>
```


* __SCSS conventions__

Line length 120 characters

* __Routes__

* __Services__

* __Proxies__

* __Utility__

* __Constants__

* __Models__

* __Views__

* __Components__

Initialization

```
/*
All components with Initialization needs should implement OnInit.
No Initialization is allowed in the constructor and should instead be performed
in ngOnInit.
*/
...
export class ContactFormComponent implements OnInit {
...
  public constructor(
    ...
  ) {
  }

  public ngOnInit(): void {
    this.initForm();
  }
```

```
/*
If the component depend on proxy data the component should extend SystemLanguageListener
and hence implement the function loadData.
loadData is called whenever user language changes.
*/
...
export class UserRegisterComponent extends SystemLanguageListener implements OnInit {
  ...
  public constructor(
    ...
  ) {
  }

  public ngOnInit(): void {
    this.loadData();
    this.initForm();
  }

  protected loadData() {
    this.countries = this.countryProxy.getCountries();
    this.genders = this.userProxy.getGenders();
    this.languages = this.languageProxy.getLanguages();
    this.systemLanguages = this.languageProxy.getSystemLanguages();
  }

```

Teardown
```
/*
All components with Observable or EventEmitter subscriptions should implement OnDestroy and unsubscribe to avoid
memory leaks.
*/
...
export class ContactFormComponent implements OnDestroy {
...
  public constructor(
    ...
  ) {
  }

  public ngOnDestroy() {
    this.userChangeSubscription.unsubscribe();
  }
```


Inline template vs seperate html file.
```
/*
50 or less lines of html -> inline the html:
*/
...
@Component({
  selector: 'api-errors',
  template: `
    <div
      *ngFor="let error of apiErrors"
      class="ui pointing red basic label">
      {{error.detail}}
    </div>`
})
export class ApiErrorsComponent implements OnInit {
  ...

/*
More than 50 lines of html -> seprate template file
*/
...
@Component({
  selector: 'contact-form',
  styleUrls: ['./contact-form.component.scss'],
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit {
  ...
```

* __Assets__

* __Tests__

* __Errors & Monitoring__

* __Static Translations__

* __Documentation__
