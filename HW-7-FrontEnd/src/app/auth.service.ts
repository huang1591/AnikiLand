import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    googleUser: any

    url(path: string) {
        return `https://zh20-hw6-backend.herokuapp.com${path}`
    }

    login(username: string, password: string) {
        const body = {
            username: username,
            password: password
        }
        return this.http.post(this.url('/login'), body, {withCredentials: true})
    }

    logout() {
        const body = {}
        this.googleUser.disconnect()
        return this.http.put(this.url('/logout'),body, {withCredentials: true})
    }

    register(body: Object) {
        return this.http.post(this.url('/register'), body)
    }

    changePw(password: string) {
        const body = {
            password: password
        }
        return this.http.put(this.url('/password'), body, {withCredentials: true})
    }

    oauthLogin(username: string, googleUser: any) {
        this.googleUser = googleUser
        const body = {
            username: username
        }
        return this.http.post(this.url('/oauthLogin'), body, {withCredentials: true})
    }

    checkOuath() {
        return this.http.get(this.url('/checkOauth'), {withCredentials: true})
    }

  constructor(private http: HttpClient) { }

}
