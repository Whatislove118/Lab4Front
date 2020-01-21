import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { RegistrFormComponent } from './components/registr-form/registr-form.component';
import {FieldsetModule} from 'primeng/fieldset';
import {RouterModule, Routes} from '@angular/router';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputTextModule} from 'primeng/inputtext';
import { NgForm} from '@angular/forms';
import {HttpService} from './HttpService';
import {HttpClientModule} from '@angular/common/http';
import {MainGuard} from './MainGuard';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng';
import {FullCalendarModule} from 'primeng';
//константа переходов
const appRoutes:Routes=[
  { path:'',component:RegistrFormComponent },

  { path:'main' , component:FormComponent ,canActivate:[MainGuard]}
];

@NgModule({
  declarations: [ //классы представлений
    AppComponent,
    HeaderComponent,
    FormComponent,
    RegistrFormComponent
  ],

  exports:[HttpClientModule],
  imports: [  //другие модули, классы которых используются в шаблонах компонентов
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AccordionModule,
    FieldsetModule,
    RouterModule.forRoot(appRoutes),
    AutoCompleteModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    FullCalendarModule
  ],
  providers: [HttpService,MainGuard,{provide:LocationStrategy,useClass:HashLocationStrategy}],//классы, создающие серверы
  bootstrap: [AppComponent] //корневой компонент, который вызывается по умолчани/
})
export class AppModule {
  constructor(){
  }

}
