import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InputOptions } from '../consts/interfaces/input-options.interface';
import { INPUT_OPTIONS } from '../consts/input-options/input-options';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent implements OnInit {
  public inputOptions: Record<string, InputOptions> = INPUT_OPTIONS;
  public form: FormGroup | undefined;
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  public onSignIn() {
    this.subscription.add(
      this.authService.signIn({ ...this.form?.value }).subscribe(console.log)
    );
  }
}
