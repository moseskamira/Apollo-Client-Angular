import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';


const fetchAllAuthorsQuery = gql`query {
  findAllAuthors {
    firstName
    lastName
  }
}`

const fetchAllBooksQuery = gql`query {
  findAllBooks{
    title
    author{
      firstName
      lastName
    }
    pageCount
  }
}`

const addNewAuthorMutation = gql`mutation($first: String!, $last: String!){
  newAuthor(firstName: $first, lastName: $last){
    firstName,
    lastName
  }
}`

const addNewBookMutation = gql`mutation($bookTitle: String!, $bookIsbn: String!, $bookPageCount: Int!, $bookAuthor: ID!){
  newBook(title: $bookTitle, isbn: $bookIsbn, pageCount: $bookPageCount, author: $bookAuthor ) {
    title
  }
}`


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private apollo: Apollo) { }

  getAllAuthorsNow(){
    return this.apollo.watchQuery<any>({
      query: fetchAllAuthorsQuery
    })
  }

  getAllAllAvailableBooksNow() {
    return this.apollo.watchQuery<any>({
      query: fetchAllBooksQuery
    })
  }

  addAuthorNow(fName: string, lName: string) {
    return this.apollo.mutate({
      mutation: addNewAuthorMutation,
      variables: {
        first: fName, 
        last: lName}
    })
  }
  
  addBookNow = (myTitle: string, myIsbn: string, myPageCount: number, myAuthor: number) => {
    return this.apollo.mutate({
      mutation: addNewBookMutation,
      variables: {
        bookTitle: myTitle, 
        bookIsbn: myIsbn,
        bookPageCount: myPageCount,
        bookAuthor: myAuthor
      }
    })
  }


}
