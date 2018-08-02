import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {API_URL} from './app.component';


@Injectable()
export class MailService {

  constructor(private http: HttpClient) { }

}
