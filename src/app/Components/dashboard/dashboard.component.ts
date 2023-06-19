import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { Iproduct } from 'src/app/models/iproduct';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isReadMore = true;
  productList!: Iproduct[] | any;
  categoryList: any[] = [];
  totalItems!: number;
  skipItems: number = 0;
  limitItems: number = 10;
  currentpageIndex: number = 0;
  pagesnumbers: number[] = [];
  loading: boolean = false;
  base64: any = '';
  form!: FormGroup;
  select = '';

  constructor(
    private product: ProductsService,
    private build: FormBuilder,
  ) {}

  ngOnInit(): void {

    this.form = this.build.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
    this.getProducts(this.skipItems, this.currentpageIndex);
    this.getCategories();
  }

  trackByFn(index: any) {
    return index;
  }

  showText() {
    this.isReadMore = !this.isReadMore;
  }

  //getProducts
  getProducts(skip: number, currentPage: number) {
    this.loading = true;
    this.product
      .getproductList(this.limitItems, this.limitItems * currentPage)
      .subscribe((result) => {
        this.productList = result.products;
        this.totalItems = result.total;
        this.skipItems = skip;
        this.currentpageIndex = currentPage;
        this.loading = false;
        this.pagesnumbers = [];
        for (
          let index = 0;
          index < this.totalItems / this.limitItems;
          index++
        ) {
          this.pagesnumbers.push(index + 1);
        }
      });
  }
  //getCategories
  getCategories() {
    this.loading = true;
    this.product.getaAllcategories().subscribe(
      (res: any) => {
        this.categoryList = res;
        this.loading = false;
      },
      (error) => {
        alert(error);
      }
    );
  }

  //selectedCategory
  getSelectedCat(event: any) {
    this.form.get('category')?.setValue(event.target.value);
  }

  //getImage
  getimgPath(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.form.get('image')?.setValue(this.base64);
    };
  }

  //addproduct
  addProduct() {
    const model = this.form.value;
    this.product.createPorduct(model).subscribe((res) => {
      alert('Add Product Success');
    });

  }

  //clear the data when add
  reset() {
    this.form.reset();
  }

  //show the product to edit
  update(item: any) {
    this.form.get('title')?.setValue(item.title);
    this.form.get('price')?.setValue(item.price);
    this.form.get('image')?.setValue(item.image);
    this.form.get('description')?.setValue(item.description);
    this.form.get('category')?.setValue(item.category);
    this.base64 = item.image;
  }

  //updateproduct
  editproduct() {
    const model = this.form.value;
    this.product.createPorduct(model).subscribe((res) => {
      alert('The product has been modified');
    });
}


//deleteupdateproduct
deleteproduct(id:string) {
  this.product.deleteProduct(id).subscribe((res) => {;
  alert('The product has been removed');
});
}

}
