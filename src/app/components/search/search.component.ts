import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  //my custom method used in search.html
  doSearch(value: String)
  {
      console.log(`value=${value}`)
      this.router.navigateByUrl(`/search/${value}`); //in routing i have written this {path: 'search/:keyword',component: ProductsListComponent}
  }

}
