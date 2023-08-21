import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from 'src/shared/components/layouts/auth-layout/auth-layout.component';
import { LandingLayoutComponent } from 'src/shared/components/layouts/landing-layout/landing-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing/home',
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   component: AuthLayoutComponent,
  //   children: [
  //     {
  //       path: 'sessions',

  //       loadChildren: () => import("./views/sessions/sessions.module").then(module => module.SessionsModule)
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   component: LandingLayoutComponent,
  //   children: [
  //     {
  //       path: 'landing',
  //       loadChildren: () => import( './src/views/landing/landing.module.ts').then(x => x.LandingModule)

  //     }
  //   ]
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
