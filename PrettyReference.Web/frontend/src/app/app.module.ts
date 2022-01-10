import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexModule } from '@angular/flex-layout';
import { CoreModule } from './core/core.module';
import { BrowseModule } from './components/browse/browse.module';
import { HeaderModule } from './components/header/header.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SideBarModule } from './components/side-bar/side-bar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsBarComponent } from './components/notifications-bar/notifications-bar.component';
import { NotificationsBarModule } from './components/notifications-bar/notifications-bar.module';
import { DialogModule } from './shared/components/dialog/dialog.module';
import { ApplyDialogComponent } from './shared/components/apply-dialog/apply-dialog.component';

@NgModule({
	declarations: [
		AppComponent,
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
		BrowserAnimationsModule,
		NotificationsBarModule,
		DialogModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
