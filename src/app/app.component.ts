import { Component,OnInit,OnDestroy } from '@angular/core';
import { AppareilService } from './services/appareil.service';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { interval, Subscription } from 'rxjs';//cet import suffit


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

  export class AppComponent implements OnInit {
   secondes!:number;
   counterSubscription!: Subscription;
      ngOnInit() {
      const counter = interval(1000)
      counter.subscribe(
        (value) => {
          this.secondes = value;
        },
        (error) => {
          console.log('Uh-oh, an error occurred! : ' + error);
        },
        () => {
          console.log('Observable complete!');
        }
      );
    }
    ngOnDestroy() {
      this.counterSubscription.unsubscribe();
    }
  }


