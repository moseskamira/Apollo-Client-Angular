import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

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

  addNewAuthorMutation = gql`mutation($firstName: String!, $lastName: String!){
    newAuthor(firstName: $firstName, lastName: $lastName){
      firstName,
      lastName
    }
  }`

  constructor(private apollo: Apollo) { }

  getAllAuthorsNow(){
    return this.apollo.watchQuery<any>({
      query: this.fetchAllAuthorsQuery
    })
  }

  getAllAllAvailableBooksNow() {
    return this.apollo.watchQuery<any>({
      query: this.fetchAllBooksQuery
    })
  }

public addAuthorNow = (fName: string, lName: string) => {
    return this.apollo.mutate({
      mutation: this.addNewAuthorMutation,
      variables: {
        firstName: fName, 
        lastName: lName}
    })
  }


}
