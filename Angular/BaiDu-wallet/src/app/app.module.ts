import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { PagesIndexComponent } from './pages-index/pages-index.component';
import { PagesFooterComponent } from './pages-footer/pages-footer.component';
import { HeaderComponent } from './pages-index/header/header.component';
import { LogoWrapComponent } from './pages-index/logo-wrap/logo-wrap.component';
import { DownBannerComponent } from './pages-index/down-banner/down-banner.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesIndexComponent,
    PagesFooterComponent,
    HeaderComponent,
    LogoWrapComponent,
    DownBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
