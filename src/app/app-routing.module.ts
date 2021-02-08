import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

// caso não tenha autorização/não fez login, redirecione para página de login
const redirectToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate : [AngularFireAuthGuard],
    data : {authGuardPipe : redirectToLogin}
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate : [AngularFireAuthGuard],
    data : {authGuardPipe : redirectToLogin}
  },
  {
    path: 'sair',
    loadChildren: () => import('./sair/sair.module').then( m => m.SairPageModule),
    canActivate : [AngularFireAuthGuard],
    data : {authGuardPipe : redirectToLogin}
  },
  {
    path: 'login-cadastro',
    loadChildren: () => import('./login-cadastro/login-cadastro.module').then( m => m.LoginCadastroPageModule)
  },
  {
    path: 'cliente-cadastro',
    loadChildren: () => import('./cliente-cadastro/cliente-cadastro.module').then( m => m.ClienteCadastroPageModule)
  },
  {
    path: 'cliente-lista',
    loadChildren: () => import('./cliente-lista/cliente-lista.module').then( m => m.ClienteListaPageModule)
  },
  {
    path: 'cliente-visualizar/:id',
    loadChildren: () => import('./cliente-visualizar/cliente-visualizar.module').then( m => m.ClienteVisualizarPageModule)
  },
  {
    path: 'cliente-atualizar/:id',
    loadChildren: () => import('./cliente-atualizar/cliente-atualizar.module').then( m => m.ClienteAtualizarPageModule)
  },
  {
    path: 'cliente-remove/:id',
    loadChildren: () => import('./cliente-remove/cliente-remove.module').then( m => m.ClienteRemovePageModule)
  },  {
    path: 'login-recuperar',
    loadChildren: () => import('./login-recuperar/login-recuperar.module').then( m => m.LoginRecuperarPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
