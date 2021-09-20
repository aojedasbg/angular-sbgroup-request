import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { PreloadAllModules } from '@angular/router';


const routes: Routes = [
  { path: '', component: SolicitudComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
