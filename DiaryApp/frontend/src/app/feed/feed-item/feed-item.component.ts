import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FeedItem } from '../models/feed-item.model';
import { DiaryItem } from "../models/diary-item.model";

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedItemComponent implements OnInit {
  @Input() diaryItem: DiaryItem;

  constructor() { }

  ngOnInit() {}

}
