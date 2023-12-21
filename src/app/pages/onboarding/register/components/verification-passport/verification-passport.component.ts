import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DragAndDropComponent } from '../../../components/drag-and-drop/drag-and-drop.component';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ROUTE_STEPS } from '../../../consts/steps/route-steps';
import { ProgressBarService } from '../../services/progress-bar.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragAndDropComponent,
    RouterModule,
  ],
  templateUrl: './verification-passport.component.html',
  styleUrls: ['./verification-passport.component.scss'],
})
export class VerificationPassportComponent implements OnInit, OnDestroy {
  public passportForm: FormGroup | undefined;
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private progressBarService: ProgressBarService
  ) {}

  ngOnInit(): void {
    this.passportForm = this.fb.group({
      passport: [null, [Validators.required]],
    });

    this.passportForm.valueChanges.subscribe((res) => this.setProgressState());

    this.setProgressState();
  }

  public uploadDocument(): void {
    const formData = this.getFormData();
    this.subscription.add(
      this.authService
        .uploadIdentityDocument('passport', formData)
        .subscribe((res) =>
          this.router.navigate([ROUTE_STEPS[res.data.next].route])
        )
    );
  }

  private getFormData(): FormData {
    const formData = new FormData();
    formData.append(
      'passport',
      this.passportForm?.controls['passport'].value[0],
      this.passportForm?.controls['passport'].value[0].name
    );
    return formData;
  }

  private setProgressState() {
    this.progressBarService.setState({
      display: true,
      activeStep: 'verification',
      primaryButton: {
        disabled: !!this.passportForm?.invalid,
        text: 'Continue',
        action: () => this.uploadDocument(),
      },
      secondaryButton: {
        disabled: false,
        text: 'Back',
        action: () => this.router.navigate(['/register/verification']),
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
