import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WPAPIService {
endpoint = 'https://blog.bookonepms.com/wp-json/wp/v2';
  constructor(private http: HttpClient) { }

  posts(query = null) {
    return this.http.get<Response>(`${this.endpoint}/posts?${query}&_embed=true`);
  }
}
