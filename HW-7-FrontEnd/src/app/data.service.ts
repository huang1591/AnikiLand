import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


//this service is for component to get user dara
@Injectable()
export class DataService {
    url(path: string) {
        return `https://zh20-hw6-backend.herokuapp.com${path}`
    }

    getFollowers() {
        return this.http.get(this.url('/following'), {withCredentials: true})
    }

    deleteFollower(username: string) {
        return this.http.delete(this.url(`/following/${username}`), {withCredentials: true})
    }

    addFollower(username: string) {
        const body = {}
        return this.http.put(this.url(`/following/${username}`), body, {withCredentials: true})
    }

    updateStatus(status: string) {
        const body = {
            headline: status
        }
        return this.http.put(this.url('/headline'), body, {withCredentials: true})
    }

    getHeadline(users?: string[]) {
        if ( !users ) {
            return this.http.get(this.url('/headlines'), {withCredentials: true})
        }
        else {
            let userString = users.reduce((acc, curr) => acc + "," + curr)
            return this.http.get(this.url(`/headlines/${userString}`), {withCredentials: true})
        }
    }

    getAvatar(users?: string[]) {
        if ( !users ) {
            return this.http.get(this.url('/avatars'), {withCredentials: true})
        }
        else {
            let userString = users.reduce((acc, curr) => acc + "," + curr)
            return this.http.get(this.url(`/avatars/${userString}`), {withCredentials: true})
        }
    }

    //later to implement
    updateAvatar(file: string){
        const body = {
            file: file
        }
        return this.http.put(this.url('/avatar'), body, {withCredentials: true})
    }

    getProfile() {
        return this.http.get(this.url('/profile'), {withCredentials: true})
    }

    updateDispName(text: string) {
        const body = {
            displayName: text
        }
        return this.http.put(this.url('/profile'), body, {withCredentials: true})
    }

    updateEmail(text: string) {
        const body = {
            email: text
        }
        return this.http.put(this.url('/profile'), body, {withCredentials: true})
    }

    updatePhoneNum(text: string) {
        const body = {
            phoneNum: text
        }
        return this.http.put(this.url('/profile'), body, {withCredentials: true})
    }

    updateZipcode(text: string) {
        const body = {
            zipcode: text
        }
        return this.http.put(this.url('/profile'), body, {withCredentials: true})
    }

  constructor(private http: HttpClient) { }

}
