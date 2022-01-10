export interface DialogStyle {
	borderRadius?: string;
}
export declare type DialogPosition = 'center' | 'end' | undefined;

export class DialogConfig<TComponent> {
	public data?: Partial<TComponent>;
	public style: { [klass: string]: any; } | null ;

	public hideCloseButton?: boolean;
	public useScroll: boolean;
	public position: DialogPosition;
	public horizontalPosition: DialogPosition;
	public closeOnClickLayout: boolean;

	constructor(props?: Partial<DialogConfig<TComponent>>) {
		this.style = null;
		this.closeOnClickLayout = true;
		this.useScroll = true;
		this.position = 'center';
		this.horizontalPosition = 'center';
		Object.assign(this, props);
	}
}
