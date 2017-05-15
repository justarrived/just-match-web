// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=production` then `environment.production.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
import {environment as prodEnv} from './environment.prod';
import {environment as stagingEnv} from './environment.staging';
import {environment as devEnv} from './environment.dev';

export const environment = process.env.ENV_CONFIG === 'prod' ? prodEnv : process.env.ENV_CONFIG === 'staging' ? stagingEnv : devEnv;
