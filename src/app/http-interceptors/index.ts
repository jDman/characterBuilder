import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CredentialsInterceptor } from './credentials.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
];
