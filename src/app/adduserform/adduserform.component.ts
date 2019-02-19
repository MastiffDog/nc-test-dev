import {Component, DoCheck, Inject, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-adduserform',
  templateUrl: './adduserform.component.html',
  styleUrls: ['./adduserform.component.scss']
})
export class AdduserformComponent implements OnInit, DoCheck {
  PopFormUser = {id: '', name: '', position: '', DateOfBirth: '', status: '', comment: ''};
  valid = false;  // отвечает за появление кнопки в форме отправки нового польователя на регистрацию
  validUsernameLength = false; // отвечает за ввод длиной не менее 3 символов в поле ФИО
  validPositionLength = false; // то же в поле Должность
  validDataLength = false;   // то же в поле Дата
  validStatusLength = false; // то же в поле Статус
  validInputName = false;  // проверка на надопустимые символы в поле ФИО(допустимы только русские и английские буквы)
  validInputPosition = false;  // проверка на надопустимые символы в поле Должность (допустимы только русские и английские буквы)

// эти две переменные отвечают за появление классов, которые подсвечивают в форме текст, указывая на ошибку
  userError = false;
  positionError = false;

  constructor(public dialogRef: MatDialogRef<AdduserformComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private validateUser: UserService
              ) { }

  ngOnInit() {
  }

  ngDoCheck(): void {
          // проверяем поля формы на заполнение (не менее 2-х символов) - проверка идет в методах сервиса
          this.validUsernameLength = this.validateUser.validateField(this.PopFormUser.name.length);
          this.validPositionLength = this.validateUser.validateField(this.PopFormUser.position.length);
          this.validDataLength = this.validateUser.validateField(this.PopFormUser.DateOfBirth.length);
          this.validStatusLength = this.validateUser.validateField(this.PopFormUser.status.length);

// аналогично проверяем поля ФИО и Должность на наличие недопустимых символов (поля дата и статус не нуждаются в такой проверке)
          this.validInputName = this.validateUser.validateSymbol(this.PopFormUser.name);
          this.validInputPosition = this.validateUser.validateSymbol(this.PopFormUser.position);

// здесь логика отображения классов полей ФИО и Должность красным, если что-то не так
          if (!this.validInputName) { this.userError = true; }
          if (!this.validUsernameLength) { this.userError = true; }
          if (this.validInputName && this.validUsernameLength ) { this.userError = false; }
          if (!this.validInputPosition) { this.positionError = true; }
          if (!this.validPositionLength) { this.positionError = true; }
          if (this.validInputPosition && this.validPositionLength ) { this.positionError = false; }

// здесь логика отображения кнопки отправки формы на будущий сервер (много IF вначале - на случай, если кто-то ввел, а потом информацию до пустой
// проверяем стирание по первым трем полям - радиокнопки после выбора не удасться деактивировать (по ним идет функция, однозначно
// пишущая строку в соответствующее свойство объекта
          if (!this.validInputName) { this.valid = false; }
          if (!this.validInputPosition) { this.valid = false; }
          if (!this.validDataLength) { this.valid = false; }
          if (!this.validPositionLength) { this.valid = false; }
          if (!this.validUsernameLength) { this.valid = false; }

// финальная валидация формы - если все ок, то появится кнопка отравки на сервер
          if (this.validUsernameLength &&
              this.validPositionLength &&
              this.validDataLength &&
              this.validStatusLength &&
              this.validInputName &&
              this.validInputPosition) { this.valid = true; }
  }

  addPopFormUserWorkTrue() {
    this.PopFormUser.status = 'работает';
  }

  addPopFormUserWorkFalse() {
    this.PopFormUser.status = 'уволен';
  }

  addUserFormSubmit() {
    this.dialogRef.close(this.PopFormUser);
  }

  addUserFormCancel() {
    this.dialogRef.close('cancel');
  }
}
