import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products?: Product[];
  currentCategoryId: number=1;
  previousCategoryId: number=1;
  searchMode:boolean= false;

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0 ;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void 
  { 
    this.route.paramMap.subscribe(() => {
    this.listProducts();
    
  });
    
  }

  listProducts()
  { 
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode)
    {
      this.handleSearchProducts();
    }
    else
    {
      this.handleListProducts();
    }
  }

  handleSearchProducts()
  {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //search for products using the service
    this.productService.searchProducts(theKeyword).subscribe(

      data => {

        this.products = data;
      }
    );
  }

  handleListProducts()
  {
 //if id is there then will return true otherwise false
 const hascategoryId: boolean = this.route.snapshot.paramMap.has('id');

 if(hascategoryId)
 {
   //get the id in string and convert it to number by "+" symbol
   // ! say that object is not null
   this.currentCategoryId =+this.route.snapshot.paramMap.get('id')!;  
 }
 else
 {
   this.currentCategoryId; 
 }
 
 //check if have different category id then previous one
 //
 //Note: Angular will reuse a component if it is currently being viewed 
 //

 //if we have different category id then previous 
 // then set thePageNumber back to 1
 
 if(this.previousCategoryId != this.currentCategoryId)
 {
   this.thePageNumber = 1;
  }
  
  this.previousCategoryId = this.currentCategoryId;

  console.log(`currentCateogryId is : = +${this.currentCategoryId}+PageNumber is :=${this.thePageNumber}`); 

  console.log(`previousCateogryId is : =`+this.previousCategoryId); 
  
  //now get the products for given category id 
 this.productService.getProductListPaginate(this.thePageNumber - 1,
                                            this.thePageSize,
                                            this.currentCategoryId)
                                            .subscribe(
                                              data => {
                                                  //left hand side are the properties defined in the class
                                                  // on right hand side are the properties defined in the spring data rest 

                                                this.products = data._embedded.products;
                                                this.thePageNumber = data.page.number + 1;
                                                this.thePageSize = data.page.size;
                                                this.theTotalElements = data.page.totalElements;
                                              }
                                            );
  }

  addToCart(theProduct: Product)
  {
      console.log(`Adding product to cart: ${theProduct.id},  Price : ${theProduct.unitPrice}`)

      // now to do real work
  }
}
