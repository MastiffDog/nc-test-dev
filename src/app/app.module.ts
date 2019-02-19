import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AdduserformComponent } from './adduserform/adduserform.component';
import { AdduserComponent } from './adduser/adduser.component';

import { UserService } from '../user.service';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AdduserformComponent,
    AdduserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatRadioModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    MatMenuModule,
    MatNativeDateModule,
    FormsModule,
    MatButtonModule
  ],
  entryComponents: [
    AdduserformComponent
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

