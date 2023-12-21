import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingComponent } from './onboarding.component';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { LazyBackgroundImageDirective } from 'src/app/consts/directives/lazy-background-image.directive';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { PromoComponent } from './components/promo/promo.component';
import { RouterModule } from '@angular/router';
import { PaymentService } from './services/payment.service';
import { LandlordService } from './services/landlord.service';

@NgModule({
  declarations: [
    OnboardingComponent,
    LazyBackgroundImageDirective,
    PromoComponent,
  ],
  imports: [
    OnboardingRoutingModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [AuthService, PaymentService, LandlordService],
})
export class OnboardingModule {}
