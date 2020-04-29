import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.sass']
})
export class AuthorComponent implements OnInit {

  authorsList: Object
  availableBooksList: any[]
  fname: string = "Mehitebel"
  lname: string = "Zijjan"
  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.getAllAuthors()
    this.getAllAvailableBooks()
    this.createNewAuthor()
  }

  getAllAuthors() {
    this.service.getAllAuthorsNow().valueChanges.subscribe(authorData => {
      this.authorsList = authorData.data.findAllAuthors
      console.log("AUTHOR "+this.authorsList)
    })
  }

  getAllAvailableBooks() {
    this.service.getAllAllAvailableBooksNow().valueChanges.subscribe(
      bookData=> {
        this.availableBooksList = bookData.data.findAllBooks
        for(let book of this.availableBooksList) {
          console.log("BOOKS "+book.title)
        }
      }
    )
  }

  createNewAuthor() {
    this.service.addAuthorNow(this.fname, this.lname).subscribe (
      myAuthor=> {
        console.log("CREATED AUTHOR "+ myAuthor.data)
      }
    )
  }

}
