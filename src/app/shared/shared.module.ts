import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { BuildColumnComponent } from './build-column/build-column.component';
import { SplitByColumnPipe } from './pipes/split-by-column.pipe';
import { DefaultPipe } from './pipes/default.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListItemDirective } from './directives/list-item.directive';
import { CardItemDirective } from './directives/card-item.directive';
import { RippleDirective } from './directives/ripple.directive';
import { CardOrListViewComponent } from './card-or-list-view/card-or-list-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    BuildColumnComponent,
    SplitByColumnPipe,
    DefaultPipe,
    ListItemDirective,
    CardItemDirective,
    RippleDirective,
    CardOrListViewComponent,
  ],
  exports: [
    LoaderComponent,
    BuildColumnComponent,
    FormsModule,
    ReactiveFormsModule,
    DefaultPipe,
    RippleDirective
  ]
})
export class SharedModule { }
