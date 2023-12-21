import { SignupResponse } from '../consts/interfaces/responses/signup-response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AutoSignup } from '../consts/interfaces/auto-signup.interface';
import { Observable, tap } from 'rxjs';
import { Response } from '../consts/interfaces/response.interface';
import { StorageService } from 'src/app/services/storage.service';
import { Address, User } from '../consts/interfaces/user.interface';
import { ManualSignup } from '../consts/interfaces/manual-signup.interface';
import { StateManagerService } from './state-managment/state-manager.service';
import { UploadDocumentResponse } from '../consts/interfaces/responses/upload-document-response.interface';
import { UpdateAddressedResponse } from '../consts/interfaces/responses/update-addresses-response.interface';
import { LoginData } from '../consts/interfaces/login-data.interface';
import { SignInResponse } from '../consts/interfaces/responses/signin-response.interface';
import { CookiesService } from 'src/app/services/cookies.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cookiesService: CookiesService,
    private storageService: StorageService,
    private stateManagerService: StateManagerService
  ) {}

  public signIn(data: LoginData): Observable<Response<SignInResponse>> {
    return this.http
      .post<Response<SignInResponse>>(this.apiUrl + '/auth/login/', data)
      .pipe(
        tap((res) =>
          this.cookiesService.setCookie(
            'tokens',
            JSON.stringify(res.data.tokens)
          )
        ),
        tap((res) =>
          this.cookiesService.setCookie('user', JSON.stringify(res.data.user))
        )
      );
  }

  public autoSignup(data: AutoSignup): Observable<Response<SignupResponse>> {
    return this.http
      .post<Response<SignupResponse>>(this.apiUrl + '/auth/auto-signup', data)
      .pipe(
        tap((res) =>
          this.storageService.set('tokens', JSON.stringify(res.data.tokens))
        ),
        tap((res) => {
          const userId = res.data.userId;
          const { phoneNumber, ...user } = data;
          this.stateManagerService.setData('user', {
            ...user,
            id: userId,
            mobile: phoneNumber,
          });
          this.stateManagerService.setData('smfaVerification', {
            expire: Date.now() + 240 * 1000,
            resendCount: 0,
            verified: false,
          });
        })
      );
  }

  public manualSignup(
    data: ManualSignup
  ): Observable<Response<SignupResponse>> {
    return this.http
      .post<Response<SignupResponse>>(this.apiUrl + '/auth/manual-signup', data)
      .pipe(
        tap((res) => {
          this.storageService.set('tokens', JSON.stringify(res.data.tokens));
        }),
        tap((res) =>
          this.stateManagerService.setData('user', {
            ...data,
            id: res.data.userId,
          })
        ),
        tap((res) =>
          this.stateManagerService.setData('smfaVerification', {
            expire: null,
            resendCount: null,
            verified: true,
          })
        )
      );
  }

  public resendSmfa() {
    return this.http.post(this.apiUrl + '/auth/send-smfa', {});
  }

  public uploadIdentityDocument(
    uploadType: 'passport' | 'idCard',
    data: FormData
  ): Observable<Response<UploadDocumentResponse>> {
    return this.http
      .patch<Response<UploadDocumentResponse>>(
        this.apiUrl + `/upload-identity-document?upload_type=${uploadType}`,
        data
      )
      .pipe(
        tap((res) =>
          this.storageService.set('tokens', JSON.stringify(res.data.tokens))
        ),
        tap((res) => {
          const { user } = this.stateManagerService.getData().value || {};
          this.stateManagerService.setData('user', {
            ...user,
            isDocumentUpload: true,
          });
        })
      );
  }

  public updateUser(user: User) {
    return this.http.put(this.apiUrl + '/auth/user', user);
  }

  public updateUserAdresses(
    addresses: Address[]
  ): Observable<Response<UpdateAddressedResponse>> {
    return this.http
      .put<Response<UpdateAddressedResponse>>(
        this.apiUrl + '/rent-reporting-address',
        {
          addresses,
        }
      )
      .pipe(
        tap((res) =>
          this.storageService.set('tokens', JSON.stringify(res.data.tokens))
        ),
        tap((res) => {
          const { user } = this.stateManagerService.getData().value || {};
          this.stateManagerService.setData('user', {
            ...user,
            isDocumentUpload: true,
          });
        })
      );
  }
}
