import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPostService } from 'src/services/blog-post.service';

@Component({
  selector: 'app-book-one-connect',
  templateUrl: './book-one-connect.component.html',
  styleUrls: ['./book-one-connect.component.scss']
})
export class BookOneConnectComponent {
  backgroundColor: string;
  showCustomizer: boolean;
  constructor(private contentfulService: BlogPostService,){

  }
  blogPosts$ : Observable<any> | undefined;

  ngOnInit() {
    this.blogPosts$ = this.contentfulService.getAllEntries();
  }

  changeBg(colorName) {
    this.backgroundColor = 'landing-' + colorName;
  }
  toggleCustomizer() {
    this.showCustomizer = !this.showCustomizer;

  }

}
