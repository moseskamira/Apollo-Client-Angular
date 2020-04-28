import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private querySubscription: Subscription;

  fetchAllAuthorsQuery = gql`query {
    findAllAuthors {
      firstName
      lastName
    }
  }`

  fetchAllBooksQuery = gql`query {
    findAllBooks{
      title
      author{
        firstName
        lastName
      }
      pageCount
    }
  }`

  constructor(private apollo: Apollo) { }

  allAuthors(){
    return this.apollo.watchQuery<any>({
      query: this.fetchAllAuthorsQuery
    })
  }

  allAllAvailableBooks() {
    return this.apollo.watchQuery<any>({
      query: this.fetchAllBooksQuery
    })
  }


}
