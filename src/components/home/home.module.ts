import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from 'src/app/material.module';

import { HomeComponent } from './home.component';

const routes: Routes = [{
    path: '', component: HomeComponent
}];

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule
    ],
    exports: [RouterModule]
})
export class HomeComponentModule {
    constructor() { }
}
