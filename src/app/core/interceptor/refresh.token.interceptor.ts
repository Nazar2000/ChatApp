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
import {GeneralService} from '../services/generel/general.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private httpClient: HttpClient,
    private authService: AuthService,
    private generalService: GeneralService
  ) {
  }

  private static tokenSubjectError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private static addToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: localStorage.getItem('token')
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      if (err.status === 401) {
        if (!RefreshTokenInterceptor.tokenSubjectError.getValue()) {
          // localStorage.removeItem('token');

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
      if (err.status === 403) {
        this.generalService.logOut();
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
