import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule } from 'ngx-videogular';

import { PlayerRoutingModule } from "./player-routing.module";

import { PlayerComponent } from "./player.component";

@NgModule({
    imports: [
        CommonModule,
        PlayerRoutingModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule
    ],
    declarations: [
        PlayerComponent
    ]
})
export class PlayerModule { }
