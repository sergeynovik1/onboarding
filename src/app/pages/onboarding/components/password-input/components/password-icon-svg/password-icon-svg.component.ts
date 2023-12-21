import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-icon-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-icon-svg.component.html',
  styleUrls: ['./password-icon-svg.component.scss'],
})
export class PasswordIconSvgComponent {
  @Input()
  public isVisible: boolean = true;
  @Input()
  public color: string = '#323232';
}
