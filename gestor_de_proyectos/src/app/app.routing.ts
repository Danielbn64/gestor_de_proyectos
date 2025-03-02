import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from "./client/client.component";
import { ModuleWithProviders } from '@angular/core';
import { FormComponent } from './client/form.component';

const appRoutes: Routes = [
    {path: 'list-clients', component: ClientComponent},
    {path: 'client/form', component: FormComponent},
    {path: 'client/form/:id', component: FormComponent},
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
