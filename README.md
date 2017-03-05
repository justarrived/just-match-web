# Just Match Web [![Stories in Ready](https://badge.waffle.io/justarrived/just-match-web.svg?label=ready&title=Ready)](http://waffle.io/justarrived/just-match-web) [![Dependency Status][david-badge]][david-badge-url] [![devDependency Status][david-dev-badge]][david-dev-badge-url]

## Built with

- node v6.9
- yarn (/npm)
- Angular 2
- TypeScript 2

## Getting started

_Prerequisites_: node v6.9, yarn.

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
- `script/pull-translations` - pull translation from Transifex (requires the [Transifex CLI](http://docs.transifex.com/client/setup/))
- `script/push-translations` - push translation to Transifex (requires the [Transifex CLI](http://docs.transifex.com/client/setup/))

yarn(/npm) scripts
- `yarn run start-dev` - starts app
- `yarn run start-prod` - starts app in production mode
- `yarn run build-aot` - builds app with AoT in `dist` folder
- `yarn run lint` - runs app linting

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

## Bug reporting convention

- P1	**Must** be fixed.
- P2	**Should** be fixed and is important to handle, but depends on time and resources available.
- P3	Will be fixed depending on time and resources. Usually smaller design bugs aso.
- P4	We know about this, thank you :)

## Contributors

[Our awesome contributors](https://github.com/justarrived/just-match-web/graphs/contributors).

## Contributing

We would love if you'd like to help us build and improve this product for the
benefit of everyone. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](CODE_OF_CONDUCT.md).

Any contributions, feedback and suggestions are more than welcome.

[david-badge]: https://david-dm.org/justarrived/just-match-web.svg
[david-badge-url]: https://david-dm.org/justarrived/just-match-web
[david-dev-badge]: https://david-dm.org/justarrived/just-match-web/dev-status.svg
[david-dev-badge-url]: https://david-dm.org/justarrived/just-match-web?type=dev
