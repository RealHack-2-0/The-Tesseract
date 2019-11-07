import { environment } from '../environments/environment';

export namespace AppConfig {
  export const production = environment.production;

  export const apiUrl = environment.apiUrl;
}
