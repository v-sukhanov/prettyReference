import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplyDialogComponent } from './apply-dialog.component';
import { FlexModule } from '@angular/flex-layout';


@NgModule({
	declarations: [
		ApplyDialogComponent
	],
	imports: [
		CommonModule,
		FlexModule,
	],
	exports: [
		ApplyDialogComponent
	]
})
export class ApplyDialogModule {
}
