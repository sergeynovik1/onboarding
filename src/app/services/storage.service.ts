import { Injectable } from '@angular/core';
import { Tokens } from '../pages/onboarding/consts/interfaces/tokens.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public get(key: string) {
    return localStorage.getItem(key);
  }

  public getTokens(): Tokens | null {
    const tokens = localStorage.getItem('tokens');
    return tokens ? JSON.parse(tokens) : tokens;
  }
}
