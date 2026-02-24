import { bootstrapApplication } from '@angular/platform-browser';
import { mainConfig } from './main/config';
import {Main} from './main/main';

bootstrapApplication(Main, mainConfig)
  .catch((err) => console.error(err));
