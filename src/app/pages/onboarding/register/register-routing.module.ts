import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { CanActivateGuard } from '../consts/guards/can-activate.guard';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    children: [
      {
        path: 'create-account',
        children: [
          {
            path: 'auto',
            loadComponent: () =>
              import(
                './components/create-account-auto/create-account-auto.component'
              ).then((m) => m.CreateAccountAutoComponent),
            data: { name: 'create-account-auto' },
            canActivate: [CanActivateGuard],
          },
          {
            path: 'manually',
            loadComponent: () =>
              import(
                './components/create-account-manually/create-account-manually.component'
              ).then((m) => m.CreateAccountManuallyComponent),
            data: { name: 'create-account-manually' },
            canActivate: [CanActivateGuard],
          },
          {
            path: '',
            redirectTo: 'auto',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'link-verification',
        children: [
          {
            path: 'sent',
            loadComponent: () =>
              import(
                './components/link-verification-sent/link-verification-sent.component'
              ).then((m) => m.LinkVerificationSentComponent),
            data: { name: 'wait-smfa-confirmation' },
            canActivate: [CanActivateGuard],
          },
          {
            path: 'success',
            loadComponent: () =>
              import(
                './components/link-verification-success/link-verification-success.component'
              ).then((m) => m.LinkVerificationSuccessComponent),
            data: { name: 'smfa-success' },
            canActivate: [CanActivateGuard],
          },
          {
            path: '',
            redirectTo: 'sent',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'info',
        data: { name: 'personal-details' },
        canActivate: [CanActivateGuard],
        children: [
          {
            path: 'check',
            loadComponent: () =>
              import('./components/info-check/info-check.component').then(
                (m) => m.InfoCheckComponent
              ),
          },
          {
            path: 'edit',
            loadComponent: () =>
              import('./components/info-edit/info-edit.component').then(
                (m) => m.InfoEditComponent
              ),
          },
          {
            path: '**',
            redirectTo: 'check',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'verification',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./components/verification/verification.component').then(
                (m) => m.VerificationComponent
              ),
            data: { name: 'identity' },
            canActivate: [CanActivateGuard],
          },
          {
            path: 'id',
            loadComponent: () =>
              import(
                './components/verification-id/verification-id.component'
              ).then((m) => m.VerificationIdComponent),
            data: { name: 'identity-id' },
            canActivate: [CanActivateGuard],
          },
          {
            path: 'passport',
            loadComponent: () =>
              import(
                './components/verification-passport/verification-passport.component'
              ).then((m) => m.VerificationPassportComponent),
            data: { name: 'identity-passport' },
            canActivate: [CanActivateGuard],
          },
        ],
      },
      {
        path: 'rent-reporting',
        loadComponent: () =>
          import('./components/rent-reporting/rent-reporting.component').then(
            (m) => m.RentReportingComponent
          ),
        data: { name: 'rent-reporting' },
        canActivate: [CanActivateGuard],
      },
      {
        path: 'payment',
        loadComponent: () =>
          import('./components/payment/payment.component').then(
            (m) => m.PaymentComponent
          ),
        data: { name: 'billsby-payment' },
        canActivate: [CanActivateGuard],
      },
      {
        path: 'landlord',
        children: [
          {
            path: 'info',
            loadComponent: () =>
              import('./components/landlord-info/landlord-info.component').then(
                (m) => m.LandlordInfoComponent
              ),
          },
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full',
          },
        ],
        data: { name: 'landlord-details' },
        canActivate: [CanActivateGuard],
      },
      {
        path: 'failed',
        loadComponent: () =>
          import('./components/failed/failed.component').then(
            (m) => m.FailedComponent
          ),
      },
      {
        path: 'contact-us',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./components/contact-us/contact-us.component').then(
                (m) => m.ContactUsComponent
              ),
          },
          {
            path: 'sent',
            loadComponent: () =>
              import(
                './components/contact-us-sent/contact-us-sent.component'
              ).then((m) => m.ContactUsSentComponent),
          },
        ],
      },
      {
        path: '',
        redirectTo: 'create-account',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'create-account',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
