import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { CreateContentComponent } from './components/create-content/create-content.component';

const routes: Routes = [
  { path: '', component: SigninComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'home', component: HomeComponent},
  { path: 'create-content', component: CreateContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
