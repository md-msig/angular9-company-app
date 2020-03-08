import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule } from 'ngx-videogular';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { ChatRoutingModule } from "./chat-routing.module";

import { ChatComponent } from "./chat.component";

@NgModule({
    imports: [
        CommonModule,
        ChatRoutingModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        PerfectScrollbarModule
    ],
    declarations: [
        ChatComponent
    ]
})
export class ChatModule { }
