import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WpapiService {
endpoint = 'https://blog.bookonepms.com/wp-json/wp/v2';
  constructor(private http: HttpClient) { }
  posts($query) {
this.http.get(`${this.endpoint}/posts?{$query}`);
  }
}
