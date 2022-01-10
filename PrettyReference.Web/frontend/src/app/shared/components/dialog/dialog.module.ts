import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { InsertionDirective } from './insertion.directive';
import { FlexModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DialogService } from './dialog.service';


@NgModule({
	declarations: [
		DialogComponent,
		InsertionDirective
	],
	imports: [
		CommonModule,
		FlexModule,
		PerfectScrollbarModule
	],
	providers: [
		DialogService
	]
})
export class DialogModule {
}
