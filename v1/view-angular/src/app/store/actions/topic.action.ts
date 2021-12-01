import { createAction, props } from '@ngrx/store';


export enum topicActionTypes {
    CREATE_TOPIC = '[topic] create',

}

export const createTopicAction = createAction(
    topicActionTypes.CREATE_TOPIC,
    props<{ title: string, theme: string }>()
)



