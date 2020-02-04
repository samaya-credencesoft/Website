import { Injectable } from '@angular/core';
import * as Butter from 'buttercms';

export const butterService = Butter('dba3fa049791dc788b186e48fc659b1d8b64cd1f');
@Injectable({
  providedIn: 'root'
})
export class ButterCMSService {

  constructor() { }

}
