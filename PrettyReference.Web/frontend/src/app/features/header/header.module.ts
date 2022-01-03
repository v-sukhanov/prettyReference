import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HeaderDataService } from './services/header-data.service';


@NgModule({
	declarations: [
		HeaderComponent
	],
	exports: [
		HeaderComponent
	],
	imports: [
		CommonModule,
		FlexModule,
		FormsModule
	],
	providers: [
		HeaderDataService
	]
})
export class HeaderModule {
}
