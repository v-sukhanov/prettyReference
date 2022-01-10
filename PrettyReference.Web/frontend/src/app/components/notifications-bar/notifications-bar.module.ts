import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsBarComponent } from './notifications-bar.component';


@NgModule({
	declarations: [
		NotificationsBarComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		NotificationsBarComponent
	]
})
export class NotificationsBarModule {
}
