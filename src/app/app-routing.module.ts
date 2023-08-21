import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from 'src/shared/components/layouts/auth-layout/auth-layout.component';
import { LandingLayoutComponent } from 'src/shared/components/layouts/landing-layout/landing-layout.component';
import { LandingModule } from 'src/views/landing/landing.module';
import { SessionsModule } from 'src/views/sessions/sessions.module';

export const AppRoutes: Routes =  [
  {
    path: '',
    redirectTo: 'landing/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',

        // loadChildren: () => import(".views/sessions/sessions.module").then(module => SessionsModule)
        // loadChildren: () => import('./src/views/sessions/sessions.module').then(m => m.SessionsModule)
        loadChildren: ()=> SessionsModule }

    ]
  },
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      {
        path: 'landing',
        // loadChildren: () => import( './src/views/landing/landing.module.ts').then(x => x.LandingModule)
        loadChildren: ()=> LandingModule }
    ]
  },

];


export class AppRoutingModule { }
