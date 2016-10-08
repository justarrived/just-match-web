# Just Match Web

## Built with

- node v6.7
- npm
- Angular 2
- TypeScript 2

## Getting started

_Prerequisites_: node v6.7, npm.

To setup your development environment

```
$ git clone git@github.com:justarrived/just-match-web.git
$ cd just-match-web
$ script/setup
$ script/server
# You can now open http://localhost:8000
```

## Commands

There are a few convenience commands

- `script/bootstrap` - installs/updates all dependencies
- `script/setup` - sets up a project to be used for the first time
- `script/update` - updates a project to run at its current version
- `script/server` - starts app
- `script/pull-translations` - pull translation from Transifex
- `script/push-translations` - push translation to Transifex

## Translations

Translations are managed at [Transifex](https://www.transifex.com/justarrived/just-match-frontend).

To push or pull new translations, you need to install the [Transifex client](http://docs.transifex.com/client/setup/).

__Fetch translations from transifex__

```
$ script/pull-translations
```

__Push source language file to transifex__

```
$ script/push-translations
```

The configuration is in [.tx/config](.tx/config).

## Contributors

[Our awesome contributors](https://github.com/justarrived/just-match-frontend/graphs/contributors).

## Contributing

We would love if you'd like to help us build and improve this product for the
benefit of everyone. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](CODE_OF_CONDUCT.md).

Any contributions, feedback and suggestions are more than welcome.

If you want to contribute please take a moment to review our [contributing guide](CONTRIBUTING.md) in order to make the contribution process easy and effective for everyone involved.
