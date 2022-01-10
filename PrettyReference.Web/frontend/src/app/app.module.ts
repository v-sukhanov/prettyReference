import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexModule } from '@angular/flex-layout';
import { CoreModule } from './core/core.module';
import { BrowseModule } from './features/browse/browse.module';
import { HeaderModule } from './features/header/header.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SideBarModule } from './features/side-bar/side-bar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FlexModule,
		CoreModule,
		BrowseModule,
		HeaderModule,
		PerfectScrollbarModule,
		SideBarModule,
		BrowserAnimationsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
