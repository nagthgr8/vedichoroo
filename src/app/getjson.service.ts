import { Injectable }     from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';



@Injectable()
export class GetJsonService{

    constructor(private http: HttpClient) {
    }

    public getJSON(jsonfile): Observable<any> {
         return this.http.get(jsonfile);
                         

     }
}