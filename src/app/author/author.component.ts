import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';


const findAllAuthors = gql`
  query  findAllAuthors{
    firstName
    lastName
  }
`;


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.sass']
})
export class AuthorComponent implements OnInit {

  authorsList: any[]
  private querySubscription: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit() {

  }

  getAllAuthors() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: findAllAuthors

    }).valueChanges.subscribe(
      data => {
        // this.authorsList = data.findAllAuthors
        console.log("AUTHORS ")
      }
    )
  }

}
