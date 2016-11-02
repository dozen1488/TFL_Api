import { NgModule, ApplicationRef} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { HttpModule, JsonpModule} from '@angular/http';

@NgModule({
  imports:     [
                    BrowserModule,
                    CommonModule,
                    FormsModule,
                    AgmCoreModule.forRoot
                    ({
                        apiKey: 'AIzaSyDrgBf1NtNEihbBEU287XqxLsbqL6hOiLc'
                    }),
                    HttpModule,
                    JsonpModule 
                ],
                providers: [],
                declarations: [ 
                                AppComponent
                              ],
                bootstrap:    [ AppComponent ]
})
export class AppModule { }
