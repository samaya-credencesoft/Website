import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import {map, take} from 'rxjs/operators';
import { WpapiService } from 'src/app/services/wpapi.service';
import { WpApiPosts } from 'wp-api-angular';
// import { butterService } from 'src/app/services/butter-cms.service';
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  @Input() token;
 posts = [];

  // id: number;

  constructor(
    protected route: ActivatedRoute,
    private wpApiPosts: WpApiPosts
    ) {
      let id = this.route.snapshot.params['id'];
      this.route.params.subscribe(params => {
        id = +params['id']; // (+) converts string 'id' to a number
       console.log('list detail page: ' + id);
      });
      this.get(id);
    }

  // protected slug$: Observable;
  // public post = {
  //     meta: null,
  //     data: null
  // };

  ngOnInit() {
//     this.slug$ = this.route.paramMap
//     .pipe(
//         map(params => (params.get('slug')))
//     );

// this.slug$.pipe(
//     take(1))
//     .subscribe(slug => {
//         butterService.post.retrieve(slug)
//             .then((res) => {
//                 this.post = res.data;
//             }).catch((res) => {
//             console.log(res);
//         });
//     });
  }

 get(id) {
    this.wpApiPosts.get(id)
    .toPromise()
    .then( response => {
      const json: any = response.json();
      this.posts = json;
      console.log(JSON.stringify(this.posts));
    });
  }
}
