import { Component, OnInit, Input } from '@angular/core';
import { WPAPIService } from 'src/app/services/wpapi.service';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  // @Input() token;
  posts: any = null;
  // media: any[];
  // mediaLink: any;

  constructor( private wpApiService: WPAPIService ) {
  }
  ngOnInit() {
    this.wpApiService.posts('per_page=12').subscribe(posts => {this.posts = posts; });
  }
  // getMedia(id){
  //   this.wpApi.get(id)
  //   .toPromise()
  //   .then(response => {
  //     let json: any = response.json();
  //     this.media = json;
  //     console.log(this.media);
  //   });
  // }
  
}
