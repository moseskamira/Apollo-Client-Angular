import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';





@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.sass']
})
export class AuthorComponent implements OnInit {

  authorsList: Object
  availableBooksList: any[]
  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.getAllAuthors()
    this.getAllAvailableBooks()

  }

  getAllAuthors() {
    this.service.allAuthors().valueChanges.subscribe(authorData => {
      this.authorsList = authorData.data.findAllAuthors
      console.log("AUTHOR "+this.authorsList)
    })
  }

  getAllAvailableBooks() {
    this.service.allAllAvailableBooks().valueChanges.subscribe(
      bookData=> {
        this.availableBooksList = bookData.data.findAllBooks
        for(let book of this.availableBooksList) {
          console.log("BOOKS "+book.title)
        }
      }

    )
  }

}
