import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import {Observable, throwError, Subject, BehaviorSubject, Subscription} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {AuthService} from '../services/auth/auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private static tokenSubjectError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
      private injector: Injector,
      private httpClient: HttpClient,
      private authService: AuthService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      if (err.status === 401) {
        if (!RefreshTokenInterceptor.tokenSubjectError.getValue()) {
          RefreshTokenInterceptor.tokenSubjectError.next(true);
          return this.handleUnauthorizedError(request, next);
        } else {
          // If it's not the first error, it has to wait until get the new tokens
          return this.waitNewTokens().pipe(
              switchMap((event: any) => {
                // request with new Access Token
                return next.handle(RefreshTokenInterceptor.addToken(request));
              })
          );
        }
      }

      return throwError(err);
    }));
  }

  // Wait until get the new tokens
  private waitNewTokens(): Observable<any> {
    const subject = new Subject<any>();
    const waitToken$: Subscription = RefreshTokenInterceptor.tokenSubjectError.subscribe((error: boolean) => {
      if (!error) {
        subject.next();
        waitToken$.unsubscribe();
      }
    });
    return subject.asObservable();
  }

  private static addToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: localStorage.getItem('token')
      }
    });
  }

  private handleUnauthorizedError(request: HttpRequest<any>, next: HttpHandler) {
    // Get a new tokens
    return this.authService.logIn().pipe(
        switchMap((newToken: any) => {
          // Save new Tokens
          localStorage.setItem('token', newToken.basic_token);

          RefreshTokenInterceptor.tokenSubjectError.next(false);
          // request with new Access Token
          return next.handle(RefreshTokenInterceptor.addToken(request));
        })
    );
  }
}
