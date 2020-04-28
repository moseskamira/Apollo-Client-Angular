import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';





@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.sass']
})
export class AuthorComponent implements OnInit {

  fetchAllAuthors = gql`query {
    findAllAuthors {
      firstName
      lastName
    }
  }`

  private querySubscription: Subscription;
  authorsList: Object
  
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.getAllAuthors()

  }

  getAllAuthors() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: this.fetchAllAuthors
    }).valueChanges.subscribe(
      authorData => {
        this.authorsList = authorData.data.findAllAuthors
        console.log("AUTHOR "+this.authorsList)
      }
    )
  }

}
