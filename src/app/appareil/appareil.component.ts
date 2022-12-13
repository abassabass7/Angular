import { Component, OnInit,Input } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  @Input() appareilName!: string 
  @Input() appareilStatus!: string 
  @Input() index!: number;
  @Input() id!: number;
 

  constructor(private appareilservice: AppareilService) { }

  ngOnInit(): void {
  }
  getStatus() {
    return this.appareilStatus;
  }
  onSwitch() {
    if(this.appareilStatus === 'allumé') {
      this.appareilservice.switchOffOne(this.index);
    } else if(this.appareilStatus === 'éteint') {
      this.appareilservice.switchOnOne(this.index);
    }
}
}
