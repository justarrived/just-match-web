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

* __HTML conventions__

Attribute alignment
```
<!--
One attribute.
Whole HTML element on one line.
-->
<div class="fourteen wide phone ten wide tablet eight wide computer column">

<h3 class="ui dividing header">
  {{'user.register.form.address.section.header' | translate}}
</h3>

<!--
Two or more attributes.
One attribute per line and sorted on attribute name.
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
