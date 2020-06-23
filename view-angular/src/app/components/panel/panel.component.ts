import { Component, OnInit, ViewChild } from '@angular/core';
import { FacadeService } from '../../service/facade.service';
import { Observable } from 'rxjs';
import { Topic } from '../../store/models/topic.model';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

    @ViewChild('futureTopicInput', {static: false}) futureTopicInput
    mode = 'default'
    futureTopicInputValue = ''
    topics$: Observable<Topic[]> = this._facadeService.topics$
    color: string = ''
    toggle = false
    constructor(private _facadeService: FacadeService) {
    }

    ngOnInit(): void {
        this.topics$.subscribe(res => console.log(res))
    }

    createTopic(title) {
        this.futureTopicInputValue = ''
        this.mode = 'default'
        this._facadeService.createTopic(title)

    }

    click(futureTopicInput) {
        this.mode = 'create';
        setTimeout(futureTopicInput.focus(), 1000)

        console.log(futureTopicInput);
    }

}
