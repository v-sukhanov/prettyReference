import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentComponent } from './components/content/content.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers/topic.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PanelComponent } from './components/panel/panel.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
    declarations: [
        AppComponent,
        ContentComponent,
        PanelComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        FormsModule,
        StoreModule.forRoot({
            topics: reducer
        }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        ColorPickerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
