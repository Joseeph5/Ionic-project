import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private apiUrl = 'https://api.coingecko.com/api/v3/simple/price';

  constructor(private http: HttpClient) {}

  getCryptoPrices(cryptoIds: string, currency: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}?ids=${cryptoIds}&vs_currencies=${currency}`
    );
  }
}
