import {
	AfterViewInit, ChangeDetectorRef,
	Component,
	ComponentFactoryResolver,
	ComponentRef,
	OnDestroy,
	OnInit, Optional,
	Type,
	ViewChild
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { InsertionDirective } from './insertion.directive';
import { DialogRef } from './dialog-ref.model';
import { DialogConfig } from './dialog-config.model';

@Component({
	selector: 'pref-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit, OnDestroy, OnInit {
	private readonly _onClose: Subject<any>;
	public childComponentType: Type<any> | null;
	public componentRef: ComponentRef<any> | null;
	public onClose: Observable<any>;
	@ViewChild(InsertionDirective, {static: false}) insertionPoint!: InsertionDirective;

	constructor(
		private _componentFactoryResolver: ComponentFactoryResolver,
		private _cdRef: ChangeDetectorRef,
		private _dialogRef: DialogRef,
		@Optional() public dialogConfig: DialogConfig<Type<any> | null>
	) {
		this.childComponentType = null;
		this._onClose = new Subject<any>();
		this.componentRef = null;
		this.onClose = this._onClose.asObservable();
	}

	public ngAfterViewInit(): void {
		if (this.childComponentType) {
			this.loadChildComponent(this.childComponentType);
			this._cdRef.detectChanges();
		}
		// if (this.adaptiveService.isAdaptive() && this.dialogConfig.useScroll) {
		// 	document.body.style.position = 'fixed';
		// }
	}

	public ngOnInit() {

	}

	public ngOnDestroy(): void {
		if (this.componentRef) {
			this.componentRef.destroy();
		}
		// if (this.adaptiveService.isAdaptive() && this.dialogConfig.useScroll) {
		// 	document.body.style.position = 'initial';
		// }
	}

	public onOverlayClicked(dialogWrap: HTMLElement, evt: Event): void {
		if ((evt.target as HTMLElement) === dialogWrap && this.dialogConfig.closeOnClickLayout) {
			this._dialogRef.close();
		}
	}

	public onDialogClicked(evt: MouseEvent): void {
		// evt.stopPropagation();
	}

	public onCLoseIconCLicked(): void {
		this._dialogRef.close();
	}

	public loadChildComponent(componentType: Type<any>): void {
		const componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentType);
		const viewContainerRef = this.insertionPoint.viewContainerRef;
		viewContainerRef.clear();
		this.componentRef = viewContainerRef.createComponent(componentFactory);
		if (this.dialogConfig && this.dialogConfig.data) {
			Object.assign(this.componentRef.instance, this.dialogConfig.data);
			if (this.componentRef.instance.ngOnChanges) {
				this.componentRef.instance.ngOnChanges();
			}
		}
	}

}
