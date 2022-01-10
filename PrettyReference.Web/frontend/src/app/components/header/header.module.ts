import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HeaderDataService } from './services/header-data.service';
import { LoaderModule } from '../../shared/components/loader/loader.module';


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
		FormsModule,
		LoaderModule
	],
	providers: [
		HeaderDataService
	]
})
export class HeaderModule {
}
