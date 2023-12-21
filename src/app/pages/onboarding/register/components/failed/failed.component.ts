import { ProgressBarService } from './../../services/progress-bar.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.scss'],
})
export class FailedComponent implements OnInit {
  constructor(private progressBarService: ProgressBarService) {}

  ngOnInit(): void {
    this.progressBarService.setState({ display: false });
  }
}
