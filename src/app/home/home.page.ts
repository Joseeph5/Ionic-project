import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../service/crypto.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  selectedCrypto1: string = 'bitcoin'; // Default for first crypto
  selectedCrypto2: string = 'ethereum'; // Default for second crypto
  cryptoPrice1: number = 0; // Price of the first crypto (e.g., BTC)
  cryptoPrice2: number = 0; // Price of the second crypto (e.g., ETH)
  amountCrypto1: number = 1; // User input for amount of the first crypto (default is 1)
  amountCrypto2: number = 0; // Amount of the second cryptocurrency

  constructor(
    private cryptoService: CryptoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCryptoPrices();
  }

  // Fetch prices for both selected cryptocurrencies
  getCryptoPrices() {
    this.cryptoService
      .getCryptoPrices(`${this.selectedCrypto1},${this.selectedCrypto2}`, 'usd')
      .subscribe((data) => {
        this.cryptoPrice1 = data[this.selectedCrypto1].usd;
        this.cryptoPrice2 = data[this.selectedCrypto2].usd;
        this.calculateConversionRate();
      });
  }

  // Update the prices and conversion rate when crypto selection changes
  onCryptoChange(event: any, cryptoNumber: number) {
    if (cryptoNumber === 1) {
      this.selectedCrypto1 = event.detail.value;
    } else {
      this.selectedCrypto2 = event.detail.value;
    }
    this.getCryptoPrices();
  }

  // Calculate how much of the second cryptocurrency equals the input amount of the first
  calculateConversionRate() {
    if (this.cryptoPrice1 && this.cryptoPrice2) {
      this.amountCrypto2 =
        (this.amountCrypto1 * this.cryptoPrice1) / this.cryptoPrice2;
    }
  }

  // Update the conversion when the user changes the amount for the first cryptocurrency
  onAmountChangeCrypto1() {
    this.calculateConversionRate();
  }

  // Update the conversion when the user changes the amount for the second cryptocurrency
  onAmountChangeCrypto2() {
    if (this.cryptoPrice1 && this.cryptoPrice2) {
      this.amountCrypto1 =
        (this.amountCrypto2 * this.cryptoPrice2) / this.cryptoPrice1;
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout error', error);
    }
  }
}
