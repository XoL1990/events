import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { EventComponent } from './components/event/event.component';
import { CreateEventComponent } from './components/create-event/create-event.component';

const routes: Routes = [
    {
        path: '',
        component: EventsComponent
    },
    {
        path: 'event',
        redirectTo: ''
    },
    {
        path: 'event/:id',
        component: EventComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
