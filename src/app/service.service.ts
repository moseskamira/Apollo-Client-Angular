import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private querySubscription: Subscription;

  fetchAllAuthors = gql`query {
    findAllAuthors {
      firstName
      lastName
    }
  }`

  fetchAllBooks = gql`query {
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
      query: this.fetchAllAuthors
    })
  }

  allAllAvailableBooks() {
    return this.apollo.watchQuery<any>({
      query: this.fetchAllBooks
    })
  }


}
