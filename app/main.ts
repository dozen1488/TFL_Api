import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
//import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core'

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);