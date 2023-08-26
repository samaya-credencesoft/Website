import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute  } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token = null;
  title = 'BookOne PMS';
  constructor(private router: Router,
    public titleService: Title,
    private activatedRoute: ActivatedRoute,
    private meta:Meta) {}

  ngOnInit() {

    // this.course = this.route.snapshot.data['course'];
    // ....
    // SEO metadata
    // this.title.setTitle(this.course.description);
    this.meta.updateTag({name: 'description', content: "dfghjkl"});

    // Twitter metadata
    this.meta.updateTag({name: 'twitter:card', content: 'summary'});
    this.meta.updateTag({name: 'twitter:site', content: '@AngularUniv'});
    this.meta.updateTag({name: 'twitter:title', content: "dfghjkl"});
    this.meta.updateTag({name: 'twitter:description', content: "dfghjkl"});
    this.meta.updateTag({name: 'twitter:text:description', content:"dfghjkl"});
    this.meta.updateTag({name: 'twitter:image', content: 'https://avatars3.githubusercontent.com/u/16628445?v=3&s=200'});


    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  }
  // onActivate(event) {
  //   window.scroll(0, 0);
  // }
}
