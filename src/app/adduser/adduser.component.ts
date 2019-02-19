import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog} from '@angular/material';
import { AdduserformComponent } from '../adduserform/adduserform.component';
import { UserService} from '../../user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  dialogResult = '';

  constructor(public dialog: MatDialog,
              private userService: UserService) { }

  ngOnInit() {
  }

  getUserRegisterForm() {
     let dialogRef = this.dialog.open(AdduserformComponent, {
         width: '700px'
     });

     dialogRef.afterClosed().subscribe(result => {
       this.dialogResult = result;
       this.userService.addUser(this.dialogResult);
     });
  }
}
