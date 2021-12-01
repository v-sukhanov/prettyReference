import { NgModule } from '@angular/core';
import {
    MatButtonToggleModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
} from '@angular/material';

const materialComponent = [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonToggleModule
];

@NgModule({
    declarations: [],
    imports: [
        materialComponent
    ],
    exports: [
        materialComponent
    ]
})
export class MaterialModule {
}
