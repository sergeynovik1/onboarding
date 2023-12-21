import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  Observable,
  filter,
  first,
  from,
  fromEvent,
  map,
  mergeMap,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoComponent implements OnInit {
  public activeUrl: Observable<string> | undefined;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.activeUrl = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects),
      startWith(this.router.url)
    );

    // this.activeUrl = fromEvent(this.router.events, 'NavigationEnd').pipe(
    //   take(1),
    //   map(() => this.router.url),
    //   mergeMap(() => this.router.events),
    // filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    //   map((event: NavigationEnd) => event.urlAfterRedirects);
    // );
  }
}
