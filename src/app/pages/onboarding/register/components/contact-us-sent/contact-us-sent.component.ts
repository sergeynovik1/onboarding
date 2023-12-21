import { ProgressBarService } from './../../services/progress-bar.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-us-sent.component.html',
  styleUrls: ['./contact-us-sent.component.scss'],
})
export class ContactUsSentComponent implements OnInit {
  constructor(private progressBarService: ProgressBarService) {}

  ngOnInit(): void {
    this.progressBarService.setState({ display: false });
  }
}
