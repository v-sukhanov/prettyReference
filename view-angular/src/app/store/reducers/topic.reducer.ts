import { Topic } from '../models/topic.model';
import { Action, createReducer, on } from '@ngrx/store';
import { createTopicAction } from '../actions/topic.action';
import { v4 as uuid } from 'uuid';


const initialState: Array<Topic> = []

const topicReducer = createReducer(
    initialState,
    on(createTopicAction, (state, { title, theme }) => {
        return [ ...state, {id: uuid(), title, theme, references: []} ]
    }),
)

export const reducer = (state: Array<Topic>, action: Action) => {
    return topicReducer(state, action)
}
