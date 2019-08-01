import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from 'src/app/material.module';

import { DetailsComponent } from './details.component';

const routes: Routes = [{
    path: '', component: DetailsComponent
}];

@NgModule({
    declarations: [DetailsComponent],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class DetailsComponentModule {
    constructor() { }
}