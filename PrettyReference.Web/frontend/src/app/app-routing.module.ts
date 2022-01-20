import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './components/browse/browse.component';

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
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
