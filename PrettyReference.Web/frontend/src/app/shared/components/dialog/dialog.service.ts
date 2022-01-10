import {
	ApplicationRef,
	ComponentFactoryResolver,
	ComponentRef,
	EmbeddedViewRef,
	Injectable,
	Injector
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DialogComponent } from './dialog.component';
import { DialogConfig } from './dialog-config.model';
import { DialogRef } from './dialog-ref.model';
import { DialogInjector } from './dialog.injector';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable()
export class DialogService {
	private _dialogComponentRef: ComponentRef<DialogComponent> | null;
	private _afterClosed$: Subject<void>;
	public afterClosed$: Observable<void>;

	constructor(
		private _componentFactoryResolver: ComponentFactoryResolver,
		private _appRef: ApplicationRef,
		private _injector: Injector
	) {
		this._dialogComponentRef = null;
		this._afterClosed$ = new Subject<void>();
		this.afterClosed$ = this._afterClosed$.asObservable();
	}

	public open<TData>(componentType: ComponentType<TData>, dialogConfig: DialogConfig<TData> = new DialogConfig()): DialogRef {

		if (this._dialogComponentRef) {
			this._removeDialogComponentFromBody();
		}
		const ref = this._appendDialogComponentToBody(dialogConfig);
		if (this._dialogComponentRef) {
			this._dialogComponentRef.instance.childComponentType = componentType;
		}
		return ref;
	}

	public close(): void {
		if (this._dialogComponentRef) {
			this._removeDialogComponentFromBody();
		}
		this._afterClosed$.next();
	}

	private _appendDialogComponentToBody<TData>(config?: DialogConfig<TData>): DialogRef {
		const map = new WeakMap();
		if (config) {
			map.set(DialogConfig, config);
		}
		const dialogRef = new DialogRef();
		map.set(DialogRef, dialogRef);
		const sub = dialogRef.afterClosed$.subscribe(() => {
			this.close();
			sub.unsubscribe();
		});
		const componentFactory = this._componentFactoryResolver.resolveComponentFactory(DialogComponent);
		const componentRef = componentFactory.create(new DialogInjector(this._injector, map));
		this._appRef.attachView(componentRef.hostView);
		const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
		document.body.appendChild(domElem);
		this._dialogComponentRef = componentRef;
		this._dialogComponentRef.instance.onClose.subscribe(() => {
			this._removeDialogComponentFromBody();
		});

		return dialogRef;
	}

	private _removeDialogComponentFromBody() {
		if (this._dialogComponentRef) {
			this._appRef.detachView(this._dialogComponentRef.hostView);
			this._dialogComponentRef.destroy();
		}
	}
}
