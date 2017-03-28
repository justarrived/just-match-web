import {NgModule} from '@angular/core';
import {SystemLanguagesResolver} from './system-languages/system-languages.resolver';
import {UserResolver} from './user/user.resolver';

@NgModule({
  providers: [
    SystemLanguagesResolver,
    UserResolver,
  ]
})
export class ResolversModule {}
