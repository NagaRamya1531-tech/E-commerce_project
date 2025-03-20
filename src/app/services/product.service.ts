// import { HttpClient } from '@angular/common/http';
// import { EventEmitter, Injectable } from '@angular/core';
// import { cart, order, product } from '../data-type';

// @Injectable({
//   providedIn: 'root',
// })
// export class ProductService {
//   cartData = new EventEmitter<product[] | []>();
//   constructor(private http: HttpClient) { }
//   addProduct(data: product) {
//     return this.http.post('http://localhost:3000/products', data);
//   }
//   productList() {
//     return this.http.get<product[]>('http://localhost:3000/products');
//   }

//   deleteProduct(id: number) {
//     return this.http.delete(`http://localhost:3000/products/${id}`);
//   }

//   getProduct(id: string) {
//     return this.http.get<product>(`http://localhost:3000/products/${id}`);
//   }

//   updateProduct(product: product) {
//     return this.http.put<product>(
//       `http://localhost:3000/products/${product.id}`,
//       product
//     );
//   }
//   popularProducts() {
//     return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
//   }

//   trendyProducts() {
//     return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
//   }

//   searchProduct(query: string) {
//     return this.http.get<product[]>(
//       `http://localhost:3000/products?q=${query}`
//     );
//   }

//   localAddToCart(data: product) {
//     let cartData = [];
//     let localCart = localStorage.getItem('localCart');
//     if (!localCart) {
//       localStorage.setItem('localCart', JSON.stringify([data]));
//       this.cartData.emit([data]);
//     } else {
//       cartData = JSON.parse(localCart);
//       cartData.push(data);
//       localStorage.setItem('localCart', JSON.stringify(cartData));
//       this.cartData.emit(cartData);
//     }
//   }

//   removeItemFromCart(productId: number) {
//     let cartData = localStorage.getItem('localCart');
//     if (cartData) {
//       let items: product[] = JSON.parse(cartData);
//       items = items.filter((item: product) => productId !== item.id);
//       localStorage.setItem('localCart', JSON.stringify(items));
//       this.cartData.emit(items);
//     }
//   }

//   addToCart(cartData: cart) {
//     return this.http.post('http://localhost:3000/cart', cartData);
//   }
//   getCartList(userId: number) {
//     return this.http
//       .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
//         observe: 'response',
//       })
//       .subscribe((result) => {
//         if (result && result.body) {
//           this.cartData.emit(result.body);
//         }
//       });
//   }
//   removeToCart(cartId: number) {
//     return this.http.delete('http://localhost:3000/cart/' + cartId);
//   }
//   currentCart() {
//     let userStore = localStorage.getItem('user');
//     let userData = userStore && JSON.parse(userStore);
//     return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
//   }

//   orderNow(data: order) {
//     return this.http.post('http://localhost:3000/orders', data);
//   }
//   orderList() {
//     let userStore = localStorage.getItem('user');
//     let userData = userStore && JSON.parse(userStore);
//     return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userData.id);
//   }

//   deleteCartItems(cartId: number) {
//     return this.http.delete('http://localhost:3000/cart/' + cartId).subscribe((result) => {
//       this.cartData.emit([]);
//     })
//   }

//   cancelOrder(orderId:number){
//     return this.http.delete('http://localhost:3000/orders/'+orderId)

//   }

// }
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private localApiUrl = 'http://localhost:3000/products';  // 🔹 Local API
  private externalApiUrl = 'https://fakestoreapi.com/products';  // 🔹 FakeStore API
  cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient) {}

  /*** ✅ Fetch Products from FakeStore API ***/
  productList(): Observable<product[]> {
    return this.http.get<product[]>(this.externalApiUrl);  // 🔹 Now uses FakeStore API
  }

  /*** ✅ Fetch a Single Product (Handles Both APIs) ***/
  getProduct(id: string): Observable<product> {
    return this.http.get<product>(`${this.externalApiUrl}/${id}`);
  }

  /*** ✅ Local Product Management (For Admins) ***/
  addProduct(data: product) {
    return this.http.post(this.localApiUrl, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.localApiUrl}/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put(`${this.localApiUrl}/${product.id}`, product);
  }

  /*** ✅ Popular & Trending Products (Limit API Response) ***/
  popularProducts(): Observable<product[]> {
    return this.http.get<product[]>(`${this.externalApiUrl}?limit=3`);
  }

  trendyProducts(): Observable<product[]> {
    return this.http.get<product[]>(`${this.externalApiUrl}?limit=8`);
  }

  /*** ✅ Search Product by Query ***/
  searchProduct(query: string): Observable<product[]> {
    return this.http.get<product[]>(`${this.externalApiUrl}?q=${query}`);
  }

  /*** ✅ Cart Operations ***/
  localAddToCart(data: product) {
    let cartData = JSON.parse(localStorage.getItem('localCart') || '[]');
    cartData.push(data);
    localStorage.setItem('localCart', JSON.stringify(cartData));
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId: number) {
    let cartData = JSON.parse(localStorage.getItem('localCart') || '[]');
    cartData = cartData.filter((item: product) => item.id !== productId);

    localStorage.setItem('localCart', JSON.stringify(cartData));
    this.cartData.emit(cartData);
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number) {
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=${userId}`, { observe: 'response' })
      .subscribe((result) => {
        if (result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  removeToCart(cartId: number) {
    return this.http.delete(`http://localhost:3000/cart/${cartId}`);
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(`http://localhost:3000/cart?userId=${userData.id}`);
  }

  deleteCartItems(cartId: number) {
    return this.http.delete(`http://localhost:3000/cart/${cartId}`).subscribe(() => {
      this.cartData.emit([]);
    });
  }

  /*** ✅ Order Handling ***/
  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }

  orderList(): Observable<order[]> {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(`http://localhost:3000/orders?userId=${userData.id}`);
  }

  cancelOrder(orderId: number) {
    return this.http.delete(`http://localhost:3000/orders/${orderId}`);
  }
}
