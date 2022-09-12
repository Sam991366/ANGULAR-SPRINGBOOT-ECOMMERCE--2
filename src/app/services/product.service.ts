import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/products";

  private categoryUrl = "http://localhost:8080/api/product-category";
  
  constructor(private httpClient: HttpClient) // we have defined this in our app module.ts and this will allow us to do that
   { }
  
getProduct(theProductId: number): Observable<Product>
{
    //need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
}

  getProductList(theCategoryId: number): Observable<Product[]>
  {
      //Also need to create the URL based on category id .. will come back later on
      
      //searching by category Id
      const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

      if(theCategoryId!=0)
      {
        return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
          map(response => response._embedded.products)
        );
      }
      else
      {
        return this.httpClient.get<GetResponseProducts>(this.baseUrl).pipe(
          map(response => response._embedded.products)
        );
      }
      


    }

    searchProducts(theKeyword: string): Observable<Product[]>
    {
      //searching by keyword
      const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
      
      return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
        map(response => response._embedded.products)
      );

      // This can also be made using refactoring //return this.getProducts(searchUrl);
    }

    getProductCategories(): Observable<ProductCategory[]>
    {
      return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
        map(response => response._embedded.productCategory)
      );

    }
    //for supporting the pagination in product service 
    getProductListPaginate(thePage: number,
                            thePageSize: number,
                            theCategoryId: number): Observable<GetResponseProducts>
  {
      //Also need to create the URL based on category id .. will come back later on
      
      //searching by category Id, page and size
      const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                        + `&page=${thePage}&size=${thePageSize}`; // spring data rest support the use of pagination just we have to send parameters "page" and "size"

      if(theCategoryId!=0)
      {
        return this.httpClient.get<GetResponseProducts>(searchUrl);
      }
      else
      {
        return this.httpClient.get<GetResponseProducts>(this.baseUrl);
      }
      


    }

  }

interface GetResponseProducts
{
    _embedded:
    {
      products : Product[];
    }, 
    page:
    {
      size:number, //size of page
      totalElements: number,// grnad total of all the elements in database but we are not returing all the elements just a count for information purpose only
      totalPages: number,// total pages available
      number: number//current page number
    }
}

interface GetResponseProductCategory
{
    _embedded:
    {
      productCategory : ProductCategory[];
    }
}
