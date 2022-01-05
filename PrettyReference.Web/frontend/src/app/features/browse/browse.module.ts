import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse.component';
import { RouterModule } from '@angular/router';
import { BrowseDataService } from './services/browse-data.service';
import { FlexModule } from '@angular/flex-layout';
import { ReferenceBoxComponent } from './components/reference-box/reference-box.component';
import { BrowseLoaderComponent } from './components/browse-loader/browse-loader.component';


@NgModule({
	declarations: [
		BrowseComponent,
  ReferenceBoxComponent,
  BrowseLoaderComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: '',
				component: BrowseComponent
			}
		]),
		FlexModule
	],
	providers: [
		BrowseDataService
	]
})
export class BrowseModule {
}
