import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropComponent } from '../../../components/drag-and-drop/drag-and-drop.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { ROUTE_STEPS } from '../../../consts/steps/route-steps';
import { ProgressBarService } from '../../services/progress-bar.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    DragAndDropComponent,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './verification-id.component.html',
  styleUrls: ['./verification-id.component.scss'],
})
export class VerificationIdComponent implements OnInit, OnDestroy {
  public verificationForm: FormGroup | undefined;
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private progressBarService: ProgressBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verificationForm = this.fb.group({
      frontSide: [null, [Validators.required]],
      backSide: [null, [Validators.required]],
    });

    this.subscription.add(
      this.verificationForm.valueChanges.subscribe((res) => {
        this.setProgressState();
      })
    );

    this.setProgressState();
  }

  public uploadDocument(): void {
    const formData = this.getFormData();
    this.subscription.add(
      this.authService
        .uploadIdentityDocument('idCard', formData)
        .subscribe((res) =>
          this.router.navigate([ROUTE_STEPS[res.data.next].route])
        )
    );
  }

  public onScroll(event: any) {
    console.log(event.target.scrollLeft);
  }

  private getFormData(): FormData {
    const formData = new FormData();
    formData.append(
      'idFront',
      this.verificationForm?.controls['frontSide'].value[0],
      this.verificationForm?.controls['frontSide'].value[0].name
    );
    formData.append(
      'idBack',
      this.verificationForm?.controls['backSide'].value[0],
      this.verificationForm?.controls['backSide'].value[0].name
    );
    return formData;
  }

  private setProgressState() {
    this.progressBarService.setState({
      display: true,
      activeStep: 'verification',
      primaryButton: {
        disabled: !!this.verificationForm?.invalid,
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
