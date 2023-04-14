import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponse } from 'src/app/shared/models/auth.interface';
import { environment } from 'src/environments/environment';


const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = new BehaviorSubject<string>('');
  private tokenData = new BehaviorSubject<any>({});

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  get token$(): Observable<string> {
    return this.token.asObservable();
  }

  get tokenData$(): Observable<any> {
    return this.tokenData.asObservable();
  }

  handlerError(error: any): Observable<never> {
    let errorMessage = 'Ocurrio un error';
    if (error.status == 401) {
      errorMessage = 'El usuario y/o contraseña es incorrecto';
    }
    Swal.fire({
      icon: 'error',
      title: '',
      text: errorMessage,
      confirmButtonText: 'Aceptar',
    });
    return throwError(() => errorMessage);
  }

  saveLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }
  logout() {
    localStorage.removeItem('token');
    this.token.next('');
    this.tokenData.next(null);
    this.router.navigate(['/']);
  }

  checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const isExpired = helper.isTokenExpired(token);
      if (isExpired) {
        this.logout();
      } else {
        this.token.next(token);
        // renovar los datos del perfil
        const { iat, exp, ...data } = helper.decodeToken(token);
        this.tokenData.next(data);
      }
    } else {
      this.logout();
    }
  }

  login(loginData: any): Observable<AuthResponse | void> { 
    return this.http.post<AuthResponse>(`${environment.API_URL}/auth/login`, loginData)
     .pipe(map((data:AuthResponse) =>{
        if(data.token){
          console.log(data)
          this.saveLocalStorage(data.token);
          this.token.next(data.token);
          this.router.navigate(['/home']);

          this.checkToken();
        }
        return data;
      }),
      catchError( (error) => this.handlerError(error)));
  }
}
