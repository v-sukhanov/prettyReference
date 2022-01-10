import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar.component';
import { SideBarGroupItemComponent } from './components/side-bar-group-item/side-bar-group-item.component';
import { FlexModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SideBarAddGroupComponent } from './components/side-bar-add-group/side-bar-add-group.component';
import { SideBarDataService } from './services/side-bar-data.service';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from '../../shared/components/loader/loader.module';
import { NgxColorsModule } from 'ngx-colors';
import { RouterModule } from '@angular/router';
import { DialogModule } from '../../shared/components/dialog/dialog.module';


@NgModule({
	declarations: [
		SideBarComponent,
		SideBarGroupItemComponent,
		SideBarAddGroupComponent
	],
	exports: [
		SideBarComponent
	],
	imports: [
		CommonModule,
		FlexModule,
		PerfectScrollbarModule,
		FormsModule,
		LoaderModule,
		NgxColorsModule,
		RouterModule,
		DialogModule
	],
	providers: [
		SideBarDataService
	]
})
export class SideBarModule {
}
