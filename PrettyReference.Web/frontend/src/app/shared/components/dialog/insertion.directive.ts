import { Directive, ViewContainerRef } from '@angular/core';


@Directive({
	selector: '[prefInsertion]'
})
export class InsertionDirective {

	constructor(public viewContainerRef: ViewContainerRef) {
	}

}
