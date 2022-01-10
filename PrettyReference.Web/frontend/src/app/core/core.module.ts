import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { ProcessService } from './services/process.service';
import { NotificationsService } from './services/notifications.service';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        HttpService,
        ProcessService,
        NotificationsService
    ]
})
export class CoreModule {
}
