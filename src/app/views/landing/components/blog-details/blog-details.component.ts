import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import {map, take} from 'rxjs/operators';
import { butterService } from 'src/app/services/butter-cms.service';
@Component({
  selector: "app-blog-details",
  templateUrl: "./blog-details.component.html",
  styleUrls: ["./blog-details.component.scss"]
})
export class BlogDetailsComponent implements OnInit {
  constructor(protected route: ActivatedRoute) {}

  protected slug$: Observable;
  public post = {
      meta: null,
      data: null
  };

  ngOnInit() {
    this.slug$ = this.route.paramMap
    .pipe(
        map(params => (params.get('slug')))
    );

this.slug$.pipe(
    take(1))
    .subscribe(slug => {
        butterService.post.retrieve(slug)
            .then((res) => {
                this.post = res.data;
            }).catch((res) => {
            console.log(res);
        });
    });
  }
}
