import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ArticleService {
    url(path: string) {
        return `https://zh20-hw6-backend.herokuapp.com${path}`
    }

    getArticles() {
        return this.http.get(this.url('/articles'), {withCredentials: true});
    }

    newArticle(text: string, img?: string) {
        let body = {}
        if ( img )  body = {
            text: text,
            image: img
        }
        else  body = {
            text: text
        }
        return this.http.post(this.url('/article'), body, {withCredentials: true});
    }

    editArticle(text: string, id: string) {
        const body = {
            _id: id,
            change: {
                text: text
            }
        }
        return this.http.put(this.url('/article'), body, {withCredentials: true})
    }

    addComment(text: string, id: string, comments: Object[], username: string) {
        let newComment = {
            text: text,
            author: username,
            date: new Date().getTime()
        }
        comments.push(newComment)
        const body = {
            _id: id,
            change: {
                comments: comments
            }
        }
        return this.http.put(this.url('/article'), body, {withCredentials: true})
    }

    editComment(text: string, article: Object, indexC: number) {
        article["comments"][indexC]["text"] = text;
        const body = {
            _id: article["_id"],
            change: {
                comments: article["comments"]
            }
        }
        return this.http.put(this.url('/article'), body, {withCredentials: true})
    }

  constructor(private http: HttpClient) { }

}
