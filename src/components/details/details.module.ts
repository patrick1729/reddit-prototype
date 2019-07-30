import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from './details.component';

const routes: Routes = [{
    path: '', component: DetailsComponent
}];

@NgModule({
    declarations: [DetailsComponent],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class DetailsComponentModule {
    constructor() {}
}