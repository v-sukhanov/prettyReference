import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar.component';
import { SideBarGroupItemComponent } from './components/side-bar-group-item/side-bar-group-item.component';
import { FlexModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SideBarAddGroupComponent } from './components/side-bar-add-group/side-bar-add-group.component';



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
		PerfectScrollbarModule
	]
})
export class SideBarModule { }
