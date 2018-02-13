import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { ArticleService } from '../article.service';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  @ViewChild('imgInput')
  imgInput: any;

  user: Object;
  sfollowers: Object[];
  sposts: Object[];
  addName: string;
  newStatus: string;
  inputTxt: string;
  searchKey: string;
  textonly: boolean;
  comments: boolean[];
  postInput = new FormControl('')

  logout(): void {
      this.authService.logout().subscribe()
  }

  clearTxt(): void {
      this.inputTxt = ''
  }

  remove(id: number): void {
    this.dataService.deleteFollower(this.sfollowers[id]["username"]).subscribe(res => {
        this.dataService.getFollowers().subscribe(res1 => {
            this.sfollowers = res1["following"]
        })
        this.articleService.getArticles().subscribe(res2 => {
            this.sposts = res2["articles"]
            this.comments = new Array<boolean>(this.sposts.length)
        })
    })
  }

  addFlo(): void {
    if (this.addName) {
        this.dataService.addFollower(this.addName).subscribe(res => {
            this.dataService.getFollowers().subscribe(res1 => {
                this.sfollowers = res1["following"]
            })
            this.articleService.getArticles().subscribe(res2 => {
                this.sposts = res2["articles"]
                this.comments = new Array<boolean>(this.sposts.length)
            })
            this.addName = ""
        }, (err: HttpErrorResponse) => {
            if ( err.status == 400 ) this.addName = "This user does't exist!"
        })
    }
  }

  updateStatus(): void {
    if (this.newStatus){
      this.dataService.updateStatus(this.newStatus).subscribe()
      this.user["status"] = this.newStatus
    }
    this.newStatus = '';
  }

  newPost(): void {
    if ( this.inputTxt ) {
        let imgFile = (<HTMLInputElement>document.getElementById("postImg")).files[0];
        if ( !this.textonly && imgFile ) {
            let reader = new FileReader()
            let text = this.inputTxt
            let current = this
            reader.addEventListener("load",function(){
                current.articleService.newArticle(text, reader.result).subscribe( _ => {
                    current.articleService.getArticles().subscribe(res => {
                        current.sposts = res["articles"]
                        current.comments = new Array<boolean>(current.sposts.length)
                    })
                })
            },false)
            reader.readAsDataURL(imgFile)
            this.imgInput.nativeElement.value = ''
        }

        if ( this.textonly ) this.articleService.newArticle(this.inputTxt).subscribe( _ => {
            this.articleService.getArticles().subscribe(res => {
                this.sposts = res["articles"]
                this.comments = new Array<boolean>(this.sposts.length)
            })
        })
    }
    this.inputTxt = ''
  }

  hideAndShow(index: number): void {
    this.comments[index] = !this.comments[index]
  }

  addComment(index: number): void {
      if ( this.postInput.value ) {
          let id = this.sposts[index]["_id"]
          let comments = this.sposts[index]["comments"]
          this.articleService.addComment(this.postInput.value, id, comments, this.user["username"])
          .subscribe(res => {
              this.articleService.getArticles().subscribe(res1 => {
                  this.sposts = res1["articles"]
              })
          })
      }
  }

  editComment(indexP: number, indexC: number): void {
      if ( this.postInput.value ) {
          let article = this.sposts[indexP]
          this.articleService.editComment(this.postInput.value, article, indexC).subscribe()
          this.sposts[indexP]["comments"][indexC]["text"] = this.postInput.value
      }
  }

  editPost(index: number): void {
      if ( this.postInput.value ) {
          let id = this.sposts[index]["_id"]
          this.articleService.editArticle(this.postInput.value, id).subscribe()
          this.sposts[index]["text"] = this.postInput.value
      }
  }

  constructor(
    private dataService: DataService,
    private articleService: ArticleService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.user = {}
    this.articleService.getArticles().subscribe(res => {
        this.sposts = res["articles"]
        this.comments = new Array<boolean>(this.sposts.length)
    }, (err: HttpErrorResponse) => {
        if (err.status == 401 ) this.router.navigate(['/login'])
    });
    this.dataService.getFollowers().subscribe(res => {
        this.sfollowers = res["following"]
    }, (err: HttpErrorResponse) => {
        if (err.status == 401 ) this.router.navigate(['/login'])
    });
    this.dataService.getHeadline().subscribe(res => {
        this.user["status"] = res["headlines"][0]["headline"]
        this.user["username"] = res["headlines"][0]["username"]
    }, (err: HttpErrorResponse) => {
        if (err.status == 401 ) this.router.navigate(['/login'])
    });
    this.dataService.getAvatar().subscribe(res => {
        this.user["avatar"] = res["avatars"][0]["avatar"]
    }, (err: HttpErrorResponse) => {
        if (err.status == 401 ) this.router.navigate(['/login'])
    });
  }

}
