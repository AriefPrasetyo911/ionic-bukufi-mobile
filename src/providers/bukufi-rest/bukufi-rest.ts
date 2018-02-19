import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BukufiRestProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BukufiRestProvider {
  
  private popularBook   = `http://bukufi.com/api/v1/trending-book`;
  private popularComic  = `http://bukufi.com/api/v1/trending-comic`;

  private newBooks      = `http://bukufi.com/api/v1/book`;
  private allBooks      = `http://bukufi.com/api/v1/book/all`;

  private newComics     = `http://bukufi.com/api/v1/comic`;
  private allComics     = `http://bukufi.com/api/v1/comic/all`;

  constructor(public http: HttpClient) {
    console.log('Hello BukufiRestProvider Provider');
  }

  /*===- POPULAR BOOK -===*/
    getPopBooks() {
      return new Promise(resolve => {
        this.http.get(this.popularBook).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
  /*===- END POPULAR BOOK -===*/
  
  /*===- POPULAR COMIC -===*/
    getPopComic(){
      return new Promise(resolve => {
        this.http.get(this.popularComic).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }
  /*===- END POPULAR COMIC -===*/

  /*===- DETAIL BOOK -===*/
  getDetailBook(book){
    return new Promise(resolve => {
      this.http.get(`http://bukufi.com/api/v1/book/${book}`).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  /*===- END DETAIL BOOK -===*/
  
  /*===- BOOK COUNTER -===*/
  getCounterBook(book){
    return new Promise(resolve => {
      this.http.get(`http://bukufi.com/api/v1/book/book-counter/${book}`).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  /*===- END BOOK COUNTER -===*/
  
  /*===- BOOK REVIEW -===*/
  getBookStatisticonProsen(book){
    return new Promise(resolve => {
      this.http.get(`http://bukufi.com/api/v1/book/book-statistic/${book}`).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      })
    })
  }
  /*===- END BOOK REVIEW -===*/

  /*===- DETAIL COMIC -===*/
  getDetailComic(comic){
    return new Promise(resolve => {
      this.http.get(`http://bukufi.com/api/v1/comic/${comic}`).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
/*===- END DETAIL COMIC -===*/

/*===- READ COMIC -===*/
readComic(title, chapter){
  return new Promise(resolve => {
    this.http.get(`http://bukufi.com/api/v1/comic/${title}/${chapter}`).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    })
  })
}
/*===- END READ COMIC -===*/

/*===- READ COMIC NON LOGIN USER-===*/
readComicNonloginUser(title, chapter){
return new Promise(resolve => {
  this.http.get(`http://bukufi.com/api/v1/comic/nonogin-user/${title}/${chapter}`).subscribe(data => {
    resolve(data);
  }, err => {
    console.log(err);
  })
})
}
/*===- END READ COMIC NON LOGIN USER-===*/

/*===- NEW BOOK -===*/
getNewBook(){
  return new Promise(resolve => {
    this.http.get(this.newBooks).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
/*===- END NEW BOOK -===*/

/*===- ALL BOOK -===*/
getAllBook(){
  return new Promise(resolve => {
    this.http.get(this.allBooks).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
/*===- END ALL BOOK -===*/

/*===- NEW COMIC -===*/
getNewComic(){
  return new Promise(resolve => {
    this.http.get(this.newComics).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    })
  })
}
/*===- END NEW COMIC -===*/

/*===- ALL COMICS -===*/
getAllComic(){
  return new Promise(resolve => {
    this.http.get(this.allComics).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    })
  })
}
/*===- END ALL COMICS -===*/

}
