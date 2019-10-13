
import {throwError as observableThrowError} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class HoroscopeService {

  private apiUrl = 'https://live.makemypublication.com/Publication/Birthchart';
  private apiUrl43 = 'https://live.makemypublication.com/Publication/BirthchartEx';
  private apiUrl54 = 'https://live.makemypublication.com/Publication/BirthchartPro';
  private apiUrl2 = 'https://live.makemypublication.com/Publication/DailyHoroscope';
  private apiUrl3 = 'https://live.makemypublication.com/Publication/SubscribeAstroUser';
  private apiUrl4 = 'https://live.makemypublication.com/Publication/Birthstars';
  private apiUrl5 = 'https://live.makemypublication.com/Publication/Birthstar';
  private apiUrl6 = 'https://live.makemypublication.com/Publication/StarsForMonth';
  private apiUrl7 = 'https://maps.googleapis.com/maps/api/timezone/json';
  private apiUrl8 = 'http://live.makemypublication.com/Publication/AstroStories';
  private apiUrl9 = 'https://live.makemypublication.com/Publication/Getcusps';
  private apiUrl10 = 'https://live.makemypublication.com/Publication/GetTransits';
  private apiUrl20 = 'https://live.makemypublication.com/Publication/GetDashTrans';
  private apiUrl11 = 'https://live.makemypublication.com/Publication/GetDashaTransits';
  private apiUrl111 = 'https://translation.googleapis.com/language/translate/v2';
  private apiUrl1111 = 'https://live.makemypublication.com/Publication/GetYogas';
  private apiUrl22 = 'https://live.makemypublication.com/Publication/RecfyBTEx';
  private apiUrl23 = 'https://live.makemypublication.com/Publication/GetPlan';
  private apiUrl24 = 'https://live.makemypublication.com/Publication/SetPlan';
  private apiUrl25 = 'https://live.makemypublication.com/Publication/AddCredits';
  private apiUrl26 = 'https://live.makemypublication.com/Publication/AddDOB';
  private apiUrl27 = 'https://live.makemypublication.com/Publication/AddTicket';
  private apiUrl28 = 'https://live.makemypublication.com/Publication/FollowTicket';
  private apiUrl29 = 'https://live.makemypublication.com/Publication/GetNotif';
  private apiUrl30 = 'https://live.makemypublication.com/Publication/AddSubscriber';
  private apiUrl31 = 'https://live.makemypublication.com/Publication/Birthinfo';
  private apiUrl32 = 'https://live.makemypublication.com/Publication/GetAstrologer';
  private apiUrl33 = 'https://live.makemypublication.com/Publication/AstrologerStatus';
  private apiUrl34 = 'https://live.makemypublication.com/Publication/AstrologerTagline';
  private apiUrl35 = 'https://live.makemypublication.com/Publication/AstrologerAvatar';
  private apiUrl36 = 'https://live.makemypublication.com/Publication/GetAllAstrologers';
  private apiUrl37 = 'https://live.makemypublication.com/Publication/PrashnaJyotish';
  private apiUrl38 = 'https://live.makemypublication.com/Publication/GetTransPreds';
  private apiUrl39 = 'https://www.126news.com/Publication/AstroBlogs';
  private apiUrl40 = 'https://www.126news.com/Publication/PublishBlog';
  private apiUrl41 = 'https://www.126news.com/Publication/GetUserId';
  private apiUrl42 = 'https://live.makemypublication.com/Publication/GetMoonPhase';
  private apiUrl44 = 'https://www.126news.com/Publication/GetArticle';
  private apiUrl45 = 'https://live.makemypublication.com/Publication/GetBirthstar';
  private apiUrl46 = 'https://live.makemypublication.com/Publication/StarsForMonthEx';
  private apiUrl47 = 'https://live.makemypublication.com/Publication/GetMoonPhaseEx';
  private apiUrl48 = 'https://live.makemypublication.com/Publication/GetcuspsEx2';
  private apiUrl49 = 'https://live.makemypublication.com/Publication/TalkToAstro';
  private apiUrl50 = 'https://live.makemypublication.com/Publication/AnalyzeDasamsa';
  private apiUrl51 = 'https://live.makemypublication.com/Publication/AnalyzeDasamsaDasha';
  private apiUrl52 = 'https://live.makemypublication.com/Publication/GetAllHobbyAsts';
  private apiUrl53 = 'https://live.makemypublication.com/Publication/GetOffer';
  private apiUrl55 = 'https://live.makemypublication.com/Publication/CalcVim';
  private apiUrl56 = 'https://live.makemypublication.com/Publication/GetTransPredsEx';
  private apiUrl57 = 'https://live.makemypublication.com/Publication/AnalyzeMoney';
  private apiUrl58 = 'https://live.makemypublication.com/Publication/AnalyzeD4';
  private apiUrl59 = 'https://live.makemypublication.com/Publication/GetDashTransEx';
  private apiUrl60 = 'https://live.makemypublication.com/Publication/AnalyzeD9';
  private monthList = [
	{name: "January",   numdays: 31, abbr: "Jan"},
	{name: "February",  numdays: 28, abbr: "Feb"},
	{name: "March",     numdays: 31, abbr: "Mar"},
	{name: "April",     numdays: 30, abbr: "Apr"},
	{name: "May",       numdays: 31, abbr: "May"},
	{name: "June",      numdays: 30, abbr: "Jun"},
	{name: "July",      numdays: 31, abbr: "Jul"},
	{name: "August",    numdays: 31, abbr: "Aug"},
	{name: "September", numdays: 30, abbr: "Sep"},
	{name: "October",   numdays: 31, abbr: "Oct"},
	{name: "November",  numdays: 30, abbr: "Nov"},
	{name: "December",  numdays: 31, abbr: "Dec"},
];

  constructor(private http: HttpClient) {}
  getJson(url: string): Observable<{}> {
	return this.http.get(url).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getAddress(latlng: string): Observable<{}> {
	let url: string = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&key=AIzaSyANvr-rVst44P0DMBpDxsu6s0GXUVPrl9M';
	return this.http.get(url).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getDailyHoro(moonSign: string): Observable<{}> {
    var oDat = {
	  sign: ''
	}
	oDat.sign = moonSign;
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
  return this.http.post(this.apiUrl2, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  subscribeAstroUser(token: string, moonSign: string, moonDeg: number): Observable<{}> {
    var oDat = {
	  token: '',
	  sign: '',
	  deg: ''
	}
	oDat.token = token;
	oDat.sign = moonSign;
	oDat.deg = moonDeg.toString();
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
  return this.http.post(this.apiUrl3, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  addSubscriber(uuid: string, nam: string, mob: string, eml: string): Observable<{}> {
   var oDat = {
   uuid: uuid,
   nam: nam,
   mob: mob,
   eml: eml
   };
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl30, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  getYogas(dmslat: string, dmslng: string, dob: string, tz: string, lang: string): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   var oDat = {
   dob: '',
   tob: '',
   latlng: '',
   timezone: '',
   lang: ''
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   oDat.lang = lang;
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl1111, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  calcVim(dob: string, lord: string, mpos: number, nsp: number, msi: number, nsi: number, lang: string): Observable<{}> {

   var oDat = {
   dob: dob,
   lord: lord,
   mpos: mpos,
   nsp: nsp,
   msi: msi,
   nsi: nsi,
   lang: lang
   };
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl55, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getCareer(dmslat: string, dmslng: string, dob: string, tz: string, lang: string, ayanid: number): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   var oDat = {
   dob: '',
   tob: '',
   latlng: '',
   timezone: '',
   lang: '',
   ayanid: ayanid
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   oDat.lang = lang;
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl50, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getMoney(das: string, dmslat: string, dmslng: string, dob: string, tz: string, lang: string, ayanid: number): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   var oDat = {
   das: das,
   dob: '',
   tob: '',
   latlng: '',
   timezone: '',
   lang: '',
   ayanid: ayanid
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   oDat.lang = lang;
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl57, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  analyzeD4(dmslat: string, dmslng: string, dob: string, tz: string, lang: string, ayanid: number): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   var oDat = {
   dob: '',
   tob: '',
   latlng: '',
   timezone: '',
   lang: '',
   ayanid: ayanid
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   oDat.lang = lang;
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl58, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  analyzeD9(dmslat: string, dmslng: string, dob: string, tz: string, lang: string, ayanid: number): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   var oDat = {
   dob: '',
   tob: '',
   latlng: '',
   timezone: '',
   lang: '',
   ayanid: ayanid
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   oDat.lang = lang;
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl60, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getCareerDas(mdas: string, dmslat: string, dmslng: string, dob: string, tz: string, lang: string, ayanid: number): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   var oDat = {
   mdas: mdas,
   dob: '',
   tob: '',
   latlng: '',
   timezone: '',
   lang: '',
   ayanid: ayanid
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   oDat.lang = lang;
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl51, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getTransPreds(dob: string): Observable<{}> {

   var oDat = {
   dob: '',
   tob: ''
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl38, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getNotif(uuid: string): Observable<{}> {
   var oDat = {
   uuid: uuid
   };
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl29, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getPlan(uuid: string): Observable<{}> {
   var oDat = {
   uuid: uuid
   };
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl23, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getOffer(uuid: string): Observable<{}> {
   var oDat = {
   uuid: uuid
   };
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl53, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  getAllAstrologers(): Observable<{}> {
	return this.http.get(this.apiUrl36).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  getAllHobbyAsts(): Observable<{}> {
	return this.http.get(this.apiUrl52).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }   
  getAstrologer(uuid: string): Observable<{}> {
   var oDat = {
	uuid: uuid
   };
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl32, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  setAstStatus(uuid: string, status: string): Observable<{}> {
   var oDat = {
	uuid: uuid,
	status: status
   };
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl33, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  setAstTagline(uuid: string, tagline: string): Observable<{}> {
   var oDat = {
	uuid: uuid,
	tagline: tagline
   };
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl34, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  setAstAvatar(uuid: string, avatar: string): Observable<{}> {
   var oDat = {
	uuid: uuid,
	avatar: avatar
   };
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl35, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  
  setPlan(uuid: string, name: string): Observable<{}> {
   var oDat = {
   uuid: uuid,
   name: name
   };
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl24, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  addCredits(uuid: string, credits: number): Observable<{}> {
   var oDat = {
   uuid: uuid,
   credits: credits
   };
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl25, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  addDOB(uuid: string, dob: string): Observable<{}> {
   var oDat = {
   uuid: uuid,
   dob: dob
   };
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl26, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  addTicket(uuid: string, cat: string, sub: string, msg: string): Observable<{}> {
   var oDat = {
   uuid: uuid,
   cat: cat,
   sub: sub,
   msg: msg
   };
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl27, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  followTicket(uuid: string, guid: string, msg: string): Observable<{}> {
   var oDat = {
   uuid: uuid,
   guid: guid,
   msg: msg
   };
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl28, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  } 
getHoro(dmslat: string, dmslng: string, dob: string, tz: string): Observable<{}> {
    console.log('getHoro', dmslat);
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   var oDat = {
   dob: '',
   tob: '',
   latlng: '',
   timezone: '',
   name: '',
   eml: ''
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   oDat.name = '';
   oDat.eml = '';
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
getProHoro(dmslat: string, dmslng: string, dob: string, tz: string, ofset: number, ayanid: number): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   var oDat = {
   dob: '',
   tob: '',
   latlng: '',
   timezone: '',
   tzofset: 0.0,
   name: '',
   eml: '',
   ayanid: -1
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   oDat.tzofset = ofset;
   oDat.name = '';
   oDat.eml = '';
   oDat.ayanid = ayanid;
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl54, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
getTransPredsEx(dmslat: string, dmslng: string, dob: string, tz: string, ofset: number, ayanid: number): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   var oDat = {
   dob: '',
   tob: '',
   latlng: '',
   timezone: '',
   tzofset: 0.0,
   name: '',
   eml: '',
   ayanid: -1
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   oDat.tzofset = ofset;
   oDat.name = '';
   oDat.eml = '';
   oDat.ayanid = ayanid;
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl56, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
 getMoonPhase(dmslat: string, dmslng: string, dob: string, tz: string): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
   var oDat = {
   dob: '',
   tob: '',
   latlng: '',
   timezone: ''
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');  
    headers.append('Cache-control', 'no-cache');
	headers.append('Cache-control', 'no-store');
	headers.append('Expires', '0');
	headers.append('Pragma', 'no-cache');	
	return this.http.post(this.apiUrl42, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
 getProMoonPhase(dmslat: string, dmslng: string, dob: string, tz: string, ayanid: number): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
   var oDat = {
   dob: '',
   tob: '',
   latlng: '',
   timezone: '',
   ayanid: 0
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   oDat.ayanid = ayanid;
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');  
    headers.append('Cache-control', 'no-cache');
	headers.append('Cache-control', 'no-store');
	headers.append('Expires', '0');
	headers.append('Pragma', 'no-cache');	
	return this.http.post(this.apiUrl47, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
 getCusps(dmslat: string, dmslng: string, dob: string, tz: string): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
   var oDat = {
   dob: '',
   tob: '',
   latlng: '',
   timezone: ''
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');  
    headers.append('Cache-control', 'no-cache');
	headers.append('Cache-control', 'no-store');
	headers.append('Expires', '0');
	headers.append('Pragma', 'no-cache');	
	return this.http.post(this.apiUrl9, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
 getCuspsEx(dmslat: string, dmslng: string, dob: string, tz: string, ofset: number, ayanid: number): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
   var oDat = {
   dob: '',
   tob: '',
   latlng: '',
   timezone: '',
   tzofset: 0.0,
   ayanid: 0
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   oDat.tzofset = ofset;
   oDat.ayanid = ayanid;
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');  
    headers.append('Cache-control', 'no-cache');
	headers.append('Cache-control', 'no-store');
	headers.append('Expires', '0');
	headers.append('Pragma', 'no-cache');	
	return this.http.post(this.apiUrl48, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
 getPrashna(dmslat: string, dmslng: string, dob: string, tz: string, znum: number): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
   var oDat = {
   dob: '',
   tob: '',
   latlng: '',
   timezone: '',
   znum: -1
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   oDat.znum = znum;
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');  
    headers.append('Cache-control', 'no-cache');
	headers.append('Cache-control', 'no-store');
	headers.append('Expires', '0');
	headers.append('Pragma', 'no-cache');	
	return this.http.post(this.apiUrl37, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  recfyBT(dmslat: string, dmslng: string, dob: string, tz: string, ofset: number, ayanid: number ): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
   var oDat = {
   dob: '',
   tob: '',
   latlng: '',
   timezone: '',
   tzofset: 0.0,
   ayanid: 0
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   oDat.tzofset = ofset;
   oDat.ayanid = ayanid;
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');  
    headers.append('Cache-control', 'no-cache');
	headers.append('Cache-control', 'no-store');
	headers.append('Expires', '0');
	headers.append('Pragma', 'no-cache');	
	return this.http.post(this.apiUrl22, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  getBirthStars(dob: string, partnerdob: string): Observable<{}> {
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '-' + //partnerdob.split('T')[0].split('-')[2] + '|' + partnerdob.split('T')[0].split('-')[1] + '|' + partnerdob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '-' + partnerdob.split('T')[1].split(':')[0]  + '|' + //partnerdob.split('T')[1].split(':')[1] + '|' + '0';
   var oDat = {
   dob: '',
   tob: ''
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '-' + partnerdob.split('T')[0].split('-')[2] + '|' + partnerdob.split('T')[0].split('-')[1] + '|' + partnerdob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '-' + partnerdob.split('T')[1].split(':')[0]  + '|' + partnerdob.split('T')[1].split(':')[1] + '|' + '0';
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl4, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getBirthStar(dob: string): Observable<{}> {
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   var oDat = {
   dob: '',
   tob: ''
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0]; 
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
  return this.http.post(this.apiUrl5, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getProBirthStar(dmslat: string, dmslng: string, dob: string, tz: string, ayanid: number): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   var oDat = {
   dob: '',
   tob: '',
   latlng: '',
   timezone: '',
   ayanid: 0
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0]; 
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   oDat.ayanid = ayanid;
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
  return this.http.post(this.apiUrl45, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getStarConst(star: string, sign: string, moondeg: string): Observable<{}> {
	//var oDat = 'star=' + star + '&sign=' + sign + '&moondeg=' + moondeg;
    sign;
	var oDat = {
   star: '',
   sign: '',
   moondeg: ''
   };
   oDat.star = star;
   oDat.sign = sign;
   oDat.moondeg = moondeg;
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
  return this.http.post(this.apiUrl6, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getProStarConst(star: string, sign: string, moondeg: string, tz: string, ayanid: number): Observable<{}> {
	//var oDat = 'star=' + star + '&sign=' + sign + '&moondeg=' + moondeg;
    sign;
	var oDat = {
   star: '',
   sign: '',
   moondeg: '',
   timezone: '',
   ayanid: 0
   };
   oDat.star = star;
   oDat.sign = sign;
   oDat.moondeg = moondeg;
   oDat.timezone = tz;
   oDat.ayanid = ayanid;
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
  return this.http.post(this.apiUrl46, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getTimezone(lat: string, lng: string, timestamp: string): Observable<{}> {
   var oDat = 'location=' + lat + ',' + lng + '&timestamp=' + timestamp + '&key=' + 'AIzaSyANvr-rVst44P0DMBpDxsu6s0GXUVPrl9M';
  return this.http.post(this.apiUrl7 + '?' + oDat, null).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
 getStories(): Observable<{}> {
   return this.http.get(this.apiUrl8).pipe(
	map(this.extractData),
    catchError(this.handleError)
	);
  }
getArticle(slug: string): Observable<{}> {
 var oDat = {
   slug: slug
 };
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
   return this.http.post(this.apiUrl44, JSON.stringify(oDat), {headers: headers}).pipe(
	map(this.extractData),
    catchError(this.handleError)
	);
  }  
  
getBlogs(uid: string): Observable<{}> {
 var oDat = {
   uid: uid
 };
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
   return this.http.post(this.apiUrl39, JSON.stringify(oDat), {headers: headers}).pipe(
	map(this.extractData),
    catchError(this.handleError)
	);
  }  
pubBlog(uid: string, title: string, story: string, img: string): Observable<{}> {
 var oDat = {
   uid: uid,
   title: title,
   story: story,
   img: img
 };
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
   return this.http.post(this.apiUrl40, JSON.stringify(oDat), {headers: headers}).pipe(
	map(this.extractData),
    catchError(this.handleError)
	);
  }   
addSuggestion(uuid: string, cat: string, msg: string): Observable<{}> {
 var oDat = {
   uuid: uuid,
   cat: cat,
   msg: msg
 };
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
   return this.http.post(this.apiUrl44, JSON.stringify(oDat), {headers: headers}).pipe(
	map(this.extractData),
    catchError(this.handleError)
	);
  }   
getTransits(mdas: string, adas: string, pdas: string, pend: string): Observable<{}> {
   var oDat = {
   mdas: '',
   adas: '',
   pdas: '',
   pend: ''
   };
   oDat.mdas = mdas;
   oDat.adas = adas;
   oDat.pdas = pdas;
   oDat.pend = pend;
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
  return this.http.post(this.apiUrl10, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
getDashTransEx(mdas: string, adas: string, pdas: string, pend: string, dmslat: string, dmslng: string, tz: string, ayanid: number): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
   var oDat = {
   mdas: '',
   adas: '',
   pdas: '',
   pend: '',
   latlng: latlng,
   timezone: '',
   ayanid: 0
   };
   oDat.mdas = mdas;
   oDat.adas = adas;
   oDat.pdas = pdas;
   oDat.pend = pend;
   oDat.timezone = tz;
   oDat.ayanid = ayanid;
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
  return this.http.post(this.apiUrl59, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
getDashTrans(mdas: string, adas: string, pdas: string, pend: string): Observable<{}> {
   var oDat = {
   mdas: '',
   adas: '',
   pdas: '',
   pend: ''
   };
   oDat.mdas = mdas;
   oDat.adas = adas;
   oDat.pdas = pdas;
   oDat.pend = pend;
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
  return this.http.post(this.apiUrl20, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
getDashaTransits(vim: any): Observable<{}> {
   
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
  return this.http.post(this.apiUrl11, JSON.stringify(vim), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }    
 translateText(txt: string, tgt: string) : Observable<{}> {
 let params = new HttpParams();
    params = params.append('q', txt);
    params = params.append('source', 'en');
    params = params.append('target', tgt);
    params = params.append('key ', 'AIzaSyByRjvoxkrwrCgMTmawQcm7zo0m2a5wg2s');

   return this.http.get(this.apiUrl111, {params: params}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   ); 
}
getBirthInfo(dmslat: string, dmslng: string, dob: string, tz: string): Observable<{}> {
	var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   var oDat = {
   dob: '',
   tob: '',
   latlng: '',
   timezone: ''
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   oDat.latlng = latlng;
   oDat.timezone = tz;
   //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl31, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  talkToAstro(uid: string, uuid: string, aid: string) : Observable<{}> {
   var oDat = {
     uid: uid,
	 uuid: uuid,
	 aid: aid
   };
	let headers = new HttpHeaders();
	headers = headers.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl49, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
   
  }
calcSunDeclination(t)
{
  var e = this.calcObliquityCorrection(t);
  var lambda = this.calcSunApparentLong(t);

  var sint = Math.sin(this.degToRad(e)) * Math.sin(this.degToRad(lambda));
  var theta = this.radToDeg(Math.asin(sint));
  return theta;		// in degrees
}  
calcSunApparentLong(t)
{
  var o = this.calcSunTrueLong(t);
  var omega = 125.04 - 1934.136 * t;
  var lambda = o - 0.00569 - 0.00478 * Math.sin(this.degToRad(omega));
  return lambda;		// in degrees
}
calcSunTrueLong(t)
{
  var l0 = this.calcGeomMeanLongSun(t);
  var c = this.calcSunEqOfCenter(t);
  var O = l0 + c;
  return O;		// in degrees
}
calcSunEqOfCenter(t)
{
  var m = this.calcGeomMeanAnomalySun(t);
  var mrad = this.degToRad(m);
  var sinm = Math.sin(mrad);
  var sin2m = Math.sin(mrad+mrad);
  var sin3m = Math.sin(mrad+mrad+mrad);
  var C = sinm * (1.914602 - t * (0.004817 + 0.000014 * t)) + sin2m * (0.019993 - 0.000101 * t) + sin3m * 0.000289;
  return C;		// in degrees
}
calcSunriseSetUTC(rise, JD, latitude, longitude)
{
  var t = this.calcTimeJulianCent(JD);
  var eqTime = this.calcEquationOfTime(t);
  var solarDec = this.calcSunDeclination(t);
  var hourAngle = this.calcHourAngleSunrise(latitude, solarDec);
  //alert("HA = " + radToDeg(hourAngle));
  if (!rise) hourAngle = -hourAngle;
  var delta = longitude + this.radToDeg(hourAngle);
  var timeUTC = 720 - (4.0 * delta) - eqTime;	// in minutes
  return timeUTC
} 
calcHourAngleSunrise(lat, solarDec)
{
  var latRad = this.degToRad(lat);
  var sdRad  = this.degToRad(solarDec);
  var HAarg = (Math.cos(this.degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad));
  var HA = Math.acos(HAarg);
  return HA;		// in radians (for sunset, use -HA)
} 
calcSunriseSet(rise, JD, latitude, longitude, timezone, dst)
// rise = 1 for sunrise, 0 for sunset
{
  //var id = ((rise) ? "risebox" : "setbox")
  var timeUTC = this.calcSunriseSetUTC(rise, JD, latitude, longitude);
  var newTimeUTC = this.calcSunriseSetUTC(rise, JD + timeUTC/1440.0, latitude, longitude); 
  if (this.isNumber(newTimeUTC)) {
    var timeLocal = newTimeUTC + (timezone * 60.0)
    timeLocal += ((dst) ? 60.0 : 0.0);
    if ( (timeLocal >= 0.0) && (timeLocal < 1440.0) ) {
      return this.timeString(timeLocal,2)
    } else  {
      var jday = JD
      var increment = ((timeLocal < 0) ? 1 : -1)
      while ((timeLocal < 0.0)||(timeLocal >= 1440.0)) {
        timeLocal += increment * 1440.0
	jday -= increment
      }
      return this.timeDateString(jday,timeLocal)
    }
  } else { // no sunrise/set found
    
  }
}  
timeDateString(JD, minutes)
{
  var output = this.timeString(minutes, 2) + " " + this.dayString(JD, 0, 2);
  return output;
}

timeString(minutes, flag)
// timeString returns a zero-padded string (HH:MM:SS) given time in minutes
// flag=2 for HH:MM, 3 for HH:MM:SS
{
  if ( (minutes >= 0) && (minutes < 1440) ) {
    var floatHour = minutes / 60.0;
    var hour = Math.floor(floatHour);
    var floatMinute = 60.0 * (floatHour - Math.floor(floatHour));
    var minute = Math.floor(floatMinute);
    var floatSec = 60.0 * (floatMinute - Math.floor(floatMinute));
    var second = Math.floor(floatSec + 0.5);
    if (second > 59) {
      second = 0
      minute += 1
    }
    if ((flag == 2) && (second >= 30)) minute++;
    if (minute > 59) {
      minute = 0
      hour += 1
    }
    var output = this.zeroPad(hour,2) + ":" + this.zeroPad(minute,2);
    if (flag > 2) output = output + ":" + this.zeroPad(second,2);
  } else { 
    var output = "error"
  }
  return output;
}
zeroPad(n, digits) {
  n = n.toString();
  while (n.length < digits) {
    n = '0' + n;
  }
  return n;
}
isNumber(inputVal) 
{
  var oneDecimal = false;
  var inputStr = "" + inputVal;
  for (var i = 0; i < inputStr.length; i++) 
  {
    var oneChar = inputStr.charAt(i);
    if (i == 0 && (oneChar == "-" || oneChar == "+"))
    {
      continue;
    }
    if (oneChar == "." && !oneDecimal) 
    {
      oneDecimal = true;
      continue;
    }
    if (oneChar < "0" || oneChar > "9")
    {
      return false;
    }
  }
  return true;
}
getJD(day, mon, yer)
{
  var docmonth = mon;
  var docday =   day;
  var docyear =  yer;
  if ( (this.isLeapYear(docyear)) && (docmonth == 2) ) {
    if (docday > 29) {
      docday = 29;
    } 
  } else {
    if (docday > this.monthList[docmonth-1].numdays) {
      docday = this.monthList[docmonth-1].numdays;
    }
  }
  if (docmonth <= 2) {
    docyear -= 1;
    docmonth += 12;
  }
  var A = Math.floor(docyear/100);
  var B = 2 - A + Math.floor(A/4);
  var JD = Math.floor(365.25*(docyear + 4716)) + Math.floor(30.6001*(docmonth+1)) + docday + B - 1524.5
  return JD
} 
calcTimeJulianCent(jd)
{
  var T = (jd - 2451545.0)/36525.0
  return T
}
calcSunTrueAnomaly(t)
{
  var m = this.calcGeomMeanAnomalySun(t);
  var c = this.calcSunEqOfCenter(t);
  var v = m + c;
  return v;		// in degrees
}
calcSunRadVector(t)
{
  var v = this.calcSunTrueAnomaly(t);
  var e = this.calcEccentricityEarthOrbit(t);
  var R = (1.000001018 * (1 - e * e)) / (1 + e * Math.cos(this.degToRad(v)));
  return R;		// in AUs
}
calcAzEl(T, localtime, latitude, longitude, zone)
{
  var eqTime = this.calcEquationOfTime(T)
  var theta  = this.calcSunDeclination(T)
 
  var solarTimeFix = eqTime + 4.0 * longitude - 60.0 * zone
  var earthRadVec = this.calcSunRadVector(T)
  var trueSolarTime = localtime + solarTimeFix
  while (trueSolarTime > 1440)
  {
    trueSolarTime -= 1440
  }
  var hourAngle = trueSolarTime / 4.0 - 180.0;
  if (hourAngle < -180) 
  {
    hourAngle += 360.0
  }
  var haRad = this.degToRad(hourAngle)
  var csz = Math.sin(this.degToRad(latitude)) * Math.sin(this.degToRad(theta)) + Math.cos(this.degToRad(latitude)) * Math.cos(this.degToRad(theta)) * Math.cos(haRad)
  if (csz > 1.0) 
  {
    csz = 1.0
  } else if (csz < -1.0) 
  { 
    csz = -1.0
  }
  var zenith = this.radToDeg(Math.acos(csz))
  var azRad;
  var azDenom = ( Math.cos(this.degToRad(latitude)) * Math.sin(this.degToRad(zenith)) )
  if (Math.abs(azDenom) > 0.001) {
    azRad = (( Math.sin(this.degToRad(latitude)) * Math.cos(this.degToRad(zenith)) ) - Math.sin(this.degToRad(theta))) / azDenom
    if (Math.abs(azRad) > 1.0) {
      if (azRad < 0) {
	azRad = -1.0
      } else {
	azRad = 1.0
      }
    }
    var azimuth = 180.0 - this.radToDeg(Math.acos(azRad))
    if (hourAngle > 0.0) {
      azimuth = -azimuth
    }
  } else {
    if (latitude > 0.0) {
      azimuth = 180.0
    } else { 
      azimuth = 0.0
    }
  }
  if (azimuth < 0.0) {
    azimuth += 360.0
  }
  var exoatmElevation = 90.0 - zenith

// Atmospheric Refraction correction

  if (exoatmElevation > 85.0) {
    var refractionCorrection = 0.0;
  } else {
    var te = Math.tan (this.degToRad(exoatmElevation));
    if (exoatmElevation > 5.0) {
      var refractionCorrection = 58.1 / te - 0.07 / (te*te*te) + 0.000086 / (te*te*te*te*te);
    } else if (exoatmElevation > -0.575) {
      var refractionCorrection = 1735.0 + exoatmElevation * (-518.2 + exoatmElevation * (103.4 + exoatmElevation * (-12.79 + exoatmElevation * 0.711) ) );
    } else {
      var refractionCorrection = -20.774 / te;
    }
    refractionCorrection = refractionCorrection / 3600.0;
  }

  var solarZen = zenith - refractionCorrection;

  return (azimuth)
} 
calcEquationOfTime(t)
{
  var epsilon = this.calcObliquityCorrection(t);
  var l0 = this.calcGeomMeanLongSun(t);
  var e = this.calcEccentricityEarthOrbit(t);
  var m = this.calcGeomMeanAnomalySun(t);

  var y = Math.tan(this.degToRad(epsilon)/2.0);
  y *= y;

  var sin2l0 = Math.sin(2.0 * this.degToRad(l0));
  var sinm   = Math.sin(this.degToRad(m));
  var cos2l0 = Math.cos(2.0 * this.degToRad(l0));
  var sin4l0 = Math.sin(4.0 * this.degToRad(l0));
  var sin2m  = Math.sin(2.0 * this.degToRad(m));

  var Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0 - 0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;
  return this.radToDeg(Etime)*4.0;	// in minutes of time
}
calcMeanObliquityOfEcliptic(t)
{
  var seconds = 21.448 - t*(46.8150 + t*(0.00059 - t*(0.001813)));
  var e0 = 23.0 + (26.0 + (seconds/60.0))/60.0;
  return e0;		// in degrees
}

calcObliquityCorrection(t)
{
  var e0 = this.calcMeanObliquityOfEcliptic(t);
  var omega = 125.04 - 1934.136 * t;
  var e = e0 + 0.00256 * Math.cos(this.degToRad(omega));
  return e;		// in degrees
}
calcGeomMeanLongSun(t)
{
  var L0 = 280.46646 + t * (36000.76983 + t*(0.0003032))
  while(L0 > 360.0)
  {
    L0 -= 360.0
  }
  while(L0 < 0.0)
  {
    L0 += 360.0
  }
  return L0		// in degrees
}
calcEccentricityEarthOrbit(t)
{
  var e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
  return e;		// unitless
}
calcGeomMeanAnomalySun(t)
{
  var M = 357.52911 + t * (35999.05029 - 0.0001537 * t);
  return M;		// in degrees
}
radToDeg(angleRad) 
{
  return (180.0 * angleRad / Math.PI);
}
isLeapYear(yr) 
{
  return ((yr % 4 == 0 && yr % 100 != 0) || yr % 400 == 0);
}

dayString(jd, next, flag)
{
// returns a string in the form DDMMMYYYY[ next] to display prev/next rise/set
// flag=2 for DD MMM, 3 for DD MM YYYY, 4 for DDMMYYYY next/prev
  if ( (jd < 900000) || (jd > 2817000) ) {
    var output = "error"
  } else {
  var z = Math.floor(jd + 0.5);
  var f = (jd + 0.5) - z;
  if (z < 2299161) {
    var A = z;
  } else {
    var alpha = Math.floor((z - 1867216.25)/36524.25);
    var A = z + 1 + alpha - Math.floor(alpha/4);
  }
  var B = A + 1524;
  var C = Math.floor((B - 122.1)/365.25);
  var D = Math.floor(365.25 * C);
  var E = Math.floor((B - D)/30.6001);
  var day = B - D - Math.floor(30.6001 * E) + f;
  var month = (E < 14) ? E - 1 : E - 13;
  var year = ((month > 2) ? C - 4716 : C - 4715);
  if (flag == 2)
    var output = this.zeroPad(day,2) + " " + this.monthList[month-1].abbr;
  if (flag == 3)
    var output = this.zeroPad(day,2) + this.monthList[month-1].abbr + year.toString();
  if (flag == 4)
    var output = this.zeroPad(day,2) + this.monthList[month-1].abbr + year.toString() + ((next) ? " next" : " prev");
  }
  return output;
}
degToRad(angleDeg) 
{
  return (Math.PI * angleDeg / 180.0);
}
  private extractData(res: Response) {
  let body = res;
  return body || { };
 }
 private handleError (error: Response | any) {
  let errMsg: string;
  if (error instanceof Response) {
    const err = error || '';
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return observableThrowError(errMsg);
 } 
}
