import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [{
    path: '', component: HomeComponent
}];

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatCardModule,
        MatButtonModule,
        MatProgressBarModule
    ],
    exports: [RouterModule]
})
export class HomeComponentModule {
    constructor() { }
}
