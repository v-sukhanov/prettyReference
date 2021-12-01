import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorService {

    colorTheme = [
        'purple',
        'aqua',
        'pink',
        'teal',
        'orange',
        'yellow'
    ]

    constructor() {
    }

    getTheme() {
        return this.colorTheme[Math.floor(Math.random() * this.colorTheme.length)];
    }

}
