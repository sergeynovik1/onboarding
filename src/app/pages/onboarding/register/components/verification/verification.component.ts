import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProgressBarService } from '../../services/progress-bar.service';

interface SelectedControl {
  name: string;
  route: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationComponent implements OnInit {
  public selectedControl: SelectedControl | undefined;

  constructor(
    private progressBarService: ProgressBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setProgressState();
  }

  public onControlSelect(control: SelectedControl) {
    this.selectedControl = control;
    this.setProgressState();
  }

  private setProgressState() {
    this.progressBarService.setState({
      display: true,
      activeStep: 'verification',
      primaryButton: {
        disabled: !this.selectedControl,
        text: 'Continue',
        action: () => this.router.navigate([this.selectedControl?.route]),
      },
      secondaryButton: {
        disabled: false,
        text: 'Back',
        action: () => this.router.navigate(['/register/info/check']),
      },
    });
  }
}
