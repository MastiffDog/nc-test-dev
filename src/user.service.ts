import { Injectable } from '@angular/core';
import { LOADED_DATA } from './app/data/loaded_data';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private Users = LOADED_DATA;
  constructor() {}

// метод получения пользователей. В данном случае просто передаем массив Users из файла
  getUsers() {
    return this.Users;
  }

// метод валидации полей форм на количество введенных символов (не менее 2-х? : например имя Ян, или какой-нибудь Су Цын)

  validateField(field) {
    if (field > 2) {
        return true;
    }
    return false;
  }

// метод валидации полей форм на русские/английские буквы (допустимо что-то одно), по регулярному выражению

  validateSymbol(str) {
    if (/^([а-яё\s]+|[a-z\s]+|[А-ЯЁ\s]+|[A-Z\s])$/iu.test(str))  { return true; }
    return false;
  }

// метод добавления пользователей в общий массив, в будущем здесь будет метод POST для обращения к серверу

  addUser(user) {
    const Num = this.Users.length;
    const UserId = Num + 1;
    if (typeof user === 'undefined') {
      return; }
    user.id = UserId;
    this.Users.push(user);
  }

// метод меняющий информацию полей у конкретного пользователя (в будущем будет метод POST на сервер)

  replaceUser(userId, selectedUser) {
    this.Users.splice(userId, 1 , selectedUser); // находит ползователя в нашем масиве и вместо него вставляет отредактированного
  }
}
