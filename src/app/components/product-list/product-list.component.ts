import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { product } from '../../data-type';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: product[] = [];
  filteredProducts: product[] = [];
  searchQuery: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.productList().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
