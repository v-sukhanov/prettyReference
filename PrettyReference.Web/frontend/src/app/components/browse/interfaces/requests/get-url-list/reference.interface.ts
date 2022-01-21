import { IGroup } from '../../../../side-bar/interfaces/group.interface';

export interface IReference {
	id: string,
	url: string,
	title: string,
	image: string,
	source: string
	createdDate: string;
	groupReference?: IGroup;
	groupReferenceId?: string;
	saveWithError: boolean;
}
