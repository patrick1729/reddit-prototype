import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
    declarations: [],
    imports: [
        MatCardModule,
        MatButtonModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatTreeModule,
        MatIconModule,
        MatButtonToggleModule,
        MatRippleModule,
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatTreeModule,
        MatIconModule,
        MatButtonToggleModule,
        MatRippleModule
    ]
})
export class MaterialModule { }
