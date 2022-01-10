import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './features/browse/browse.component';

const routes: Routes = [
	{
		path: 'browse/:groupId',
		component: BrowseComponent
	},
	{
		path: '**',
		redirectTo: 'browse/all'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
