import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from './details.component';

const routes: Routes = [{
    path: '', component: DetailsComponent
}];

@NgModule({
    declarations: [DetailsComponent],
    imports: [
        CdkTreeModule,
        CommonModule,
        MatTreeModule,
        MatIconModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatRippleModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class DetailsComponentModule {
    constructor() { }
}