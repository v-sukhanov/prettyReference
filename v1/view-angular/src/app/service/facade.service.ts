import { Injectable } from '@angular/core';
import { TopicState } from '../store/state/topic.state';
import { Store } from '@ngrx/store';
import { createTopicAction } from '../store/actions/topic.action';
import { Observable } from 'rxjs';
import { Topic } from '../store/models/topic.model';
import { ColorService } from './color.service';

@Injectable({
    providedIn: 'root'
})
export class FacadeService {

    public topics$: Observable<Topic[]> = null
    constructor(private _store: Store<TopicState>, private _colorService: ColorService) {
        this.topics$ = _store.select(store => store.topics)
    }

    createTopic(title) {
        this._store.dispatch(createTopicAction({title, theme: this._colorService.getTheme()}))
    }
}
