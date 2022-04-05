import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';

import { User } from '../models/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user?: User;
  
  public get trainer(): User | undefined {
    return this._user;
  }

  public set trainer(trainer: User | undefined) {
    localStorage.setItem(StorageKeys.User, JSON.stringify(trainer))
    this._user = trainer;
  }

  constructor() {
    const user = localStorage.getItem(StorageKeys.User);
    this._user = user !== null ? JSON.parse(user): undefined;
   }
}
