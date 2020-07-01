import { Injectable } from '@angular/core';
import { FeedItem, feedItemMocks } from '../models/feed-item.model';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from '../../api/api.service';
import {DiaryItem} from "../models/diary-item.model";

@Injectable({
  providedIn: 'root'
})
export class FeedProviderService {
    currentFeed$: BehaviorSubject<DiaryItem[]> = new BehaviorSubject<DiaryItem[]>([]);

    constructor(private api: ApiService) { }


    async getDiaryItems(): Promise<BehaviorSubject<DiaryItem[]>> {
        console.log('called getdiaryItems');
        try {
            var req = await this.api.get('/users/diary');
        } catch (e) {
            console.log(e);
            req = null;
        }
        console.log('Service Items req: ', req);
        this.currentFeed$.next(req);
        return Promise.resolve(this.currentFeed$);
    }

    async saveDiaryItem(data: DiaryItem): Promise<any> {
        console.log('Sending req: ', data);
      const res = await this.api.post('/users/diary', data);
      const feed = [res, ...this.currentFeed$.value];
      this.currentFeed$.next(feed);
      return res;
    }

}

