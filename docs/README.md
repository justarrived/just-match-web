# Docs - Just Match Web

Developer guide for Just Match Web.

## High level

* __Technology__
  - Angular 2.3
  - Typescript 2.0
  - SCSS
  - HTML5

* __Scripts__

* __Typescript conventions__

Imports
```
/*
Sorted and one import per line.
Examples:
*/
import {ApiErrors} from '../../../models/api-errors';
import {AuthManager} from '../../../services/auth-manager.service';
import {Component} from '@angular/core';
import {Country} from '../../../models/country';
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
constructor(
  private authManager: AuthManager,
  private countryProxy: CountryProxy,
  private formBuilder: FormBuilder,
  private languageProxy: LanguageProxy,
  private navigationService: NavigationService,
  private router: Router,
  private userProxy: UserProxy,
  protected translationService: TranslationService
) {
  ...
}

/*
No arguments no statements
*/
constructor(
) {
}

```


* __HTML conventions__

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

* __Routes__

* __Services__

* __Proxies__

* __Utility__

* __Constants__

* __Models__

* __Views__

* __Components__

* __Assets__

* __Tests__

* __Errors & Monitoring__

* __Static Translations__

* __Documentation__
