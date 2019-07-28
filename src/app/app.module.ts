import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressBarModule } from 'primeng/progressbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CheckboxModule } from 'primeng/checkbox';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { CreateContentComponent } from './components/create-content/create-content.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    HomeComponent,
    CreateContentComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    ProgressBarModule,
    MatSidenavModule,
    DialogModule,
    ButtonModule,
    EditorModule,
    InputTextModule,
    AccordionModule,
    ProgressSpinnerModule,
    CheckboxModule,
    ToolbarModule,
    CalendarModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
