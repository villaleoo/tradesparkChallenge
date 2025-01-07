import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookStoreComponent } from './book-store/book-store.component';
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [
  { path: 'book-store', component: BookStoreComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: '**', redirectTo: 'main-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
