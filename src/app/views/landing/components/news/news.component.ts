import { Component, OnInit } from '@angular/core';
import { butterService } from 'src/app/services/butter-cms.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public posts: any[];

  constructor() { }

  ngOnInit() {
    this.fetchPosts();
  }
  private fetchPosts() {
    butterService.post.list({
            page: 1,
            page_size: 10
        })
        .then((res) => {
            console.log('Content from ButterCMS');
            console.log(res);
            this.posts = res.data;
        });
}
}
