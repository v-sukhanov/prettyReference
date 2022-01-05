import { IReference } from '../interfaces/requests/get-url-list/reference.interface';
import * as moment from 'moment/moment';


export class UrlModel implements IReference{
	private _createdDate!: string;
	public set createdDate(date: string) {
		const createdUtc = moment.utc(date);
		if (moment().diff(createdUtc, 'days') < 1 && moment().format('D') === createdUtc.format('D')) {
			this._createdDate = createdUtc.format('Сегодня, H:mm');
		} else if (moment().diff(createdUtc, 'days') < 2 && (parseInt(moment().format('D'), 10) - parseInt(createdUtc.format('D'), 10)) === 1) {
			this._createdDate = createdUtc.format('Вчера, H:mm');
		} else if (moment().diff(createdUtc, 'days') < 7) {
			this._createdDate = this._capitalize(createdUtc.format('dddd, H:mm:ss'));
		} else if (createdUtc.format('Y') === moment().format('Y')) {
			this._createdDate = createdUtc.format('D MMMM, H:mm');
		} else {
			this._createdDate = createdUtc.format('D MMMM YYYY, H:mm');
		}
	}
	public get createdDate() {
		return this._createdDate;
	}
	public id!: string;
	public image!: string;
	public source!: string;
	public title!: string;
	public url!: string;

	constructor(params: IReference) {
		Object.assign(this, params);
	}

	private _capitalize(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}
