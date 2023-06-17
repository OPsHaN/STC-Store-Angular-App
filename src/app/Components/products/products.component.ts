import { Component , OnInit,} from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { Iproduct } from 'src/app/models/iproduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],

})
export class ProductsComponent implements OnInit {
 
isReadMore = true;
productList!:Iproduct[] | any;
categoryList:any[] = [];
totalItems!:number;
skipItems:number = 0;
limitItems:number =8;
currentpageIndex: number = 0;
pagesnumbers:number[]=[];
loading:boolean = false;


constructor(private product:ProductsService , private router:Router) {


 }

  ngOnInit(): void {
    this.getProducts(this.skipItems , this.currentpageIndex)
    this.getCategories();

  }

  trackByFn(index: any) {
    return index;
  }

  showText() {
    this.isReadMore = !this.isReadMore
 }

    //getProducts
    getProducts(skip:number , currentPage:number){
      this.loading=true;
      this.product.getproductList(this.limitItems , this.limitItems*currentPage).subscribe((result)=> {
        this.productList=result.products;
        this.totalItems=result.total;
        this.skipItems=skip;
        this.currentpageIndex=currentPage;
        this.loading=false;
        this.pagesnumbers=[];
        for (let index = 0; index < (this.totalItems/this.limitItems); index++) {
        this.pagesnumbers.push(index+1)
        }
        })
    }



     //getCategories
 getCategories() {
  this.loading=true;
  this.product.getaAllcategories().subscribe((res:any) =>{
this.categoryList = res
this.loading=false;
  } , error => {
alert(error)
  });
  
 }

 //filterCategories
 getFilter(event:any){
 let value = event.target.value;
 if(value == "all"){
  this.getProducts(this.skipItems , this.currentpageIndex)
}
 else {
  this.getFilterProducts(value);
 }
 }

 getFilterProducts(keyword:string){
  this.loading=true;
  this.product.getFiltercategories(keyword).subscribe((res:any) =>{
  this.loading=false;
this.productList = res.products;
});
}
}
