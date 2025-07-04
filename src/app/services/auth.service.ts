import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/auth';

  private loggedInUserSubject = new BehaviorSubject<any>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.loggedInUserSubject.next(JSON.parse(user));
    }
  }

  register(data: RegisterPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(payload: LoginPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, payload);
  }

  setLoggedInUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedInUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedInUserSubject.next(null);
  }

  getLoggedInUser() {
    return this.loggedInUserSubject.value;
  }
}
