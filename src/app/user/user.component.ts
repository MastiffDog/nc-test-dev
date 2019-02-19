import {Component, DoCheck, OnInit} from '@angular/core';
import { UserService } from '../../user.service';

export interface PeriodicElement {
  id: string;
  name: string;
  position: string;
  DateOfBirth: string;
  status: string;
  comment: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['user.component.scss'],
})

export class UserComponent implements OnInit, DoCheck  {
  displayedColumns: string[] = ['id', 'name', 'position', 'DateOfBirth', 'status'];
  dataSource: PeriodicElement[] = this._userService.getUsers();

  showUser = false; // отвечает за сокрытие списка пользователей и кнопки добавления нового пользователя
  setUser = false; // отвечает за открытие формы редактирования выбранного пользователя
  userID = null;
  USERS = [] ;

// ниже блок переменных, аналогичных форме регистрации пользователя с тем же функционалом, разница только
// в том, что в этом компоненте у нас в полях уже имеются заданные значения подгруженного пользователя,
// но сам механизм валидации нисколько не меняется.

  usernameLength = false;
  positionLength = false;
  dataLength = false;
  statusLength = false;
  inputUsername = false;
  inputPosition = false;
// переменные отвечают за класс полей редактирования ФИО и Должности
  exUserNameErr = false;
  exPosErr = false;

// переменная отвечает за кнопку отправки "принять"
  confirmUser = false;

  SelectedUser = {id: '', name: '', position: '', DateOfBirth: '', status: '', comment: ''};

  constructor(private _userService: UserService ) {}

  ngOnInit() {
    this.dataSource = this._userService.getUsers();
    this.USERS = this._userService.getUsers();
  }

  ngDoCheck(): void {
    // проверяем поля формы на заполнение (не менее 2-х символов) - проверка идет в методах сервиса
    this.usernameLength = this._userService.validateField(this.SelectedUser.name.length);
    this.positionLength = this._userService.validateField(this.SelectedUser.position.length);
    this.dataLength = this._userService.validateField(this.SelectedUser.DateOfBirth.length);
    this.statusLength = this._userService.validateField(this.SelectedUser.status.length);

// аналогично проверяем поля ФИО и Должность на наличие недопустимых символов (поля дата и статус не нуждаются в такой проверке)
    this.inputUsername = this._userService.validateSymbol(this.SelectedUser.name);
    this.inputPosition = this._userService.validateSymbol(this.SelectedUser.position);

// здесь логика отображения классов полей ФИО и Должность красным, если что-то не так
    if (!this.inputUsername) { this.exUserNameErr = true; }
    if (!this.usernameLength) { this.exUserNameErr = true; }
    if (this.inputUsername && this.usernameLength ) { this.exUserNameErr = false; }
    if (!this.inputPosition) { this.exPosErr = true; }
    if (!this.positionLength) { this.exPosErr = true; }
    if (this.inputPosition && this.positionLength ) { this.exPosErr = false; }

// здесь логика отображения кнопки отправки формы на будущий сервер (много IF вначале - на случай, если кто-то ввел, а потом информацию до пустой
// проверяем стирание по первым трем полям - радиокнопки после выбора не удасться деактивировать (по ним идет функция, однозначно
// пишущая строку в соответствующее свойство объекта
    if (!this.inputUsername) { this.confirmUser = false; }
    if (!this.inputPosition) { this.confirmUser = false; }
    if (!this.dataLength) { this.confirmUser = false; }
    if (!this.positionLength) { this.confirmUser = false; }
    if (!this.usernameLength) { this.confirmUser = false; }

// финальная валидация формы - если все ок, то появится кнопка отравки на сервер
    if (this.usernameLength &&
      this.positionLength &&
      this.dataLength &&
      this.statusLength &&
      this.inputUsername &&
      this.inputPosition) { this.confirmUser = true; }
  }

  getUser(value) {

  this.showUser = !this.showUser;
  this.SelectedUser = this.USERS[value - 1];
  this.userID = value - 1;
  }

  getHomePage() {
     console.log('вернулись');
     this.showUser = !this.showUser;
  }

  setNewUser() {
     this.setUser = !this.setUser;
  }

putUserData() {
  this.setUser = false;
  this.showUser = false;
  this._userService.replaceUser(this.userID, this.SelectedUser);
}

userWorkTrue() {
    this.SelectedUser.status = 'работает';
}

userWorkFalse() {
    this.SelectedUser.status = 'уволен';
}



}



