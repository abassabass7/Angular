import { Subject} from 'rxjs';//cet import suffit
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService {
  appareilsSubject = new Subject<any[]>();
    private appareils = [
        {
          id:1,
          name: 'Machine à laver',
          status: 'éteint'
        },
        {
          id:2,
          name: 'Frigo',
          status: 'allumé'
        }, 
        {
          id:3,
          name: 'Ordinateur', 
          status: 'éteint'
        }

      ]; 
      constructor(private httClient: HttpClient){
        
      }


      emitAppareilSubject() {
        this.appareilsSubject.next(this.appareils.slice());
      }
      
      getAppareilById(id: number) {
        const appareil = this.appareils.find(
          (appareilObject) =>{
            return appareilObject.id=== id;
          }
          
        );
        return appareil;
    }
      switchOnAll() { 
        for(let appareil of this.appareils) {
          appareil.status = 'allumé';
        }
        this.emitAppareilSubject();
    }
    
     switchOffAll() {
        for(let appareil of this.appareils) {
          appareil.status = 'éteint';
        }
        this.emitAppareilSubject();

        
    }
    switchOnOne(i: number) {
      this.appareils[i].status = 'allumé';
      this.emitAppareilSubject();
  }
  
  switchOffOne(i: number) {
      this.appareils[i].status = 'éteint';
      this.emitAppareilSubject();
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
}
saveAppareilsToServer() {
  this.httClient
    .post('https://apparailangular-default-rtdb.europe-west1.firebasedatabase.app/appareils.json', this.appareils)
    .subscribe(
      () => {
        console.log('Enregistrsement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
}
  }