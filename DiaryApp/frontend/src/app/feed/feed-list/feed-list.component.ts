import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { FeedProviderService } from '../services/feed.provider.service';
import { Subscription } from 'rxjs';
import {DiaryItem, diaryItemMocks} from "../models/diary-item.model";

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedListComponent implements OnInit, OnDestroy {
  @Input() diaryItems: DiaryItem[];
  subscriptions: Subscription[] = [];
  constructor( private feed: FeedProviderService ) { }

  async ngOnInit() {
    this.subscriptions.push(
      this.feed.currentFeed$.subscribe((items) => {
      this.diaryItems = items;
      console.log('Items: ', this.diaryItems);
    }));
    //await this.feed.getDiaryItems();
    //console.log('After async: ', this.diaryItems);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }



}
