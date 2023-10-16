
import { createClient, Entry } from 'contentful';
import { environment } from './../../environments/environment.test_mumbai';

import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

constructor() { }

private client = createClient({
  space: environment.spaceId,
  accessToken: environment.accessToken
});
getAllEntries(){
 const promise = this.client.getEntries()
 return from (promise);
}
}
