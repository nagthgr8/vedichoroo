import {throwError as observableThrowError} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HoroscopeService {
  private apiUrl = 'https://api.vedichoroo.com/api/Birthchart';
  private apiUrl43 = 'https://api.vedichoroo.com/api/BirthchartEx';
  private apiUrl54 = 'https://api.vedichoroo.com/api/BirthchartPro';
  private apiUrl2 = 'https://api.vedichoroo.com/api/DailyHoroscope';
  private apiUrl3 = 'https://api.vedichoroo.com/api/SubscribeAstroUser';
  private apiUrl4 = 'https://api.vedichoroo.com/api/BirthstarsEx';
  private apiUrl5 = 'https://api.vedichoroo.com/api/Birthstar';
  private apiUrl6 = 'https://api.vedichoroo.com/api/StarsForMonth';
  private apiUrl7 = 'https://maps.googleapis.com/maps/api/timezone/json';
  private apiUrl8 = 'https://www.126news.com/api/AstroStories';
  private apiUrl9 = 'https://api.vedichoroo.com/api/Getcusps';
  private apiUrl10 = 'https://api.vedichoroo.com/api/GetTransits';
  private apiUrl20 = 'https://api.vedichoroo.com/api/GetDashTrans';
  private apiUrl11 = 'https://api.vedichoroo.com/api/GetDashaTransits';
  private apiUrl111 = 'https://translation.googleapis.com/language/translate/v2';
  private apiUrl1111 = 'https://api.vedichoroo.com/api/GetYogas';
  private apiUrl22 = 'https://api.vedichoroo.com/api/RecfyBTEx';
  private apiUrl23 = 'https://api.vedichoroo.com/api/GetPlan';
  private apiUrl24 = 'https://api.vedichoroo.com/api/SetPlan';
  private apiUrl25 = 'https://api.vedichoroo.com/api/AddCredits';
  private apiUrl26 = 'https://api.vedichoroo.com/api/AddDOB';
  private apiUrl27 = 'https://api.vedichoroo.com/api/AddTicket';
  private apiUrl28 = 'https://api.vedichoroo.com/api/FollowTicket';
  private apiUrl29 = 'https://api.vedichoroo.com/api/GetNotif';
  private apiUrl30 = 'https://api.vedichoroo.com/api/AddSubscriber';
  private apiUrl31 = 'https://api.vedichoroo.com/api/Birthinfo';
  private apiUrl32 = 'https://api.vedichoroo.com/api/GetAstrologer';
  private apiUrl33 = 'https://api.vedichoroo.com/api/AstrologerStatus';
  private apiUrl34 = 'https://api.vedichoroo.com/api/AstrologerTagline';
  private apiUrl35 = 'https://api.vedichoroo.com/api/AstrologerAvatar';
  private apiUrl36 = 'https://api.vedichoroo.com/api/GetAllAstrologers';
  private apiUrl37 = 'https://api.vedichoroo.com/api/PrashnaJyotish';
  private apiUrl38 = 'https://api.vedichoroo.com/api/GetTransPreds';
  private apiUrl39 = 'https://www.126news.com/Publication/AstroBlogs';
  private apiUrl40 = 'https://www.126news.com/api/PublishBlog';
  private apiUrl41 = 'https://www.126news.com/Publication/GetUserId';
  private apiUrl42 = 'https://api.vedichoroo.com/api/GetMoonPhase';
  private apiUrl44 = 'https://www.126news.com/api/GetArticle';
  private apiUrl45 = 'https://api.vedichoroo.com/api/GetBirthstarEx';
  private apiUrl46 = 'https://api.vedichoroo.com/api/StarsForMonthEx2';
  private apiUrl47 = 'https://api.vedichoroo.com/api/GetMoonPhaseEx';
  private apiUrl48 = 'https://api.vedichoroo.com/api/GetcuspsEx3';
  private apiUrl49 = 'https://api.vedichoroo.com/api/TalkToAstro';
  private apiUrl50 = 'https://api.vedichoroo.com/api/AnalyzeDasamsa';
  private apiUrl51 = 'https://api.vedichoroo.com/api/AnalyzeDasamsaDasha';
  private apiUrl52 = 'https://api.vedichoroo.com/api/GetAllHobbyAsts';
  private apiUrl53 = 'https://api.vedichoroo.com/api/GetOffer';
  private apiUrl55 = 'https://api.vedichoroo.com/api/CalcVim';
  private apiUrl56 = 'https://api.vedichoroo.com/api/GetTransPredsEx';
  private apiUrl57 = 'https://api.vedichoroo.com/api/AnalyzeMoney';
  private apiUrl58 = 'https://api.vedichoroo.com/api/AnalyzeD4';
  private apiUrl59 = 'https://api.vedichoroo.com/api/GetDashTransEx';
  private apiUrl60 = 'https://api.vedichoroo.com/api/AnalyzeD9';
  private apiUrl61 = 'https://api.vedichoroo.com/api/GetHouseGroup';
  private apiUrl62 = 'https://api.vedichoroo.com/api/AddHouseGroup';
  private apiUrl63 = 'https://api.vedichoroo.com/api/Astakvarga';
  private apiUrl64 = 'https://api.vedichoroo.com/api/AstroBio';
  private apiUrl65 = 'https://api.vedichoroo.com/api/Shadbala';
  private apiUrl67 = 'https://api.vedichoroo.com/api/IsAdmin';
  private apiUrl68 = 'https://api.vedichoroo.com/api/GetAllReports';
  private apiUrl69 = 'https://api.vedichoroo.com/api/AddReport';
  private apiUrl70 = 'https://api.vedichoroo.com/api/GetReports';
  private apiUrl71 = 'https://api.vedichoroo.com/api/UpdateReport';
  private apiUrl72 = 'https://api.vedichoroo.com/api/GetProfile';
  private apiUrl73 = 'https://api.vedichoroo.com/api/SetProfile';
  private apiUrl74 = 'https://www.126news.com/api/GetStory';
  private apiUrl75 = 'https://www.126news.com/api/GetMsg';
  private apiUrl76 = 'https://api.vedichoroo.com/api/GetAdv';
  private apiUrl77 = 'https://api.vedichoroo.com/api/GetQuota';
  private apiUrl78 = 'https://api.vedichoroo.com/api/SetQuota';
  private apiUrl79 = 'https://api.vedichoroo.com/api/BirthinfoEx';
  private apiUrl80 = 'https://api.vedichoroo.com/api/BirthchartEx3';
  private apiUrl81 = 'https://api.vedichoroo.com/api/RemDOB';
  private apiUrl82 = 'https://api.vedichoroo.com/api/CalForMon';
  private apiUrl83 = 'https://www.126news.com/GetComment';
  private apiUrl84 = 'https://www.126news.com/PostComment';
  private apiUrl85 = 'https://api.vedichoroo.com/api/GeneratePDFDoc';
	private apiUrl86 = 'https://api.vedichoroo.com/api/ProfileBanner';
	private apiUrl87 = 'https://api.vedichoroo.com/api/ProfileBio';
  private apiUrl88 = 'https://api.vedichoroo.com/api/GeneratePDFDocEx';
private apiUrl89 = 'https://api.vedichoroo.com/api/StarsForDay';
private apiUrl90 = 'https://api.vedichoroo.com/api/DailyTrans';
private apiUrl91 = 'https://api.vedichoroo.com/api/GetDoshas';
  private apiUrl92 = 'https://api.vedichoroo.com/api/AnalyzeD3';
  private apiUrl93 = 'https://api.vedichoroo.com/api/AnalyzeD7';
  constructor(private http: HttpClient) { }
  getJson(url: string): Observable<{}> {
	return this.http.get(url).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
	setProfileBnr(uuid: string, banner: string): Observable<{}> {
	  var oDat = {
		  uuid: uuid,
		  banner: banner
	  };
	  let headers = new HttpHeaders()
		  .set('Accept', 'application/json; charset=utf-8')
		  .set('Content-Type', 'application/json; charset=utf-8');
	  return this.http.post(this.apiUrl86, JSON.stringify(oDat), { headers: headers }).pipe(
		  map(this.extractData),
		  catchError(this.handleError)
	  );
  }  
  setProfileBio(uuid: string, bio: string): Observable<{}> {
	  var oDat = {
		  uuid: uuid,
		  bio: bio
	  };
  	  let headers = new HttpHeaders()
		  .set('Accept', 'application/json; charset=utf-8')
		  .set('Content-Type', 'application/json; charset=utf-8');
	  return this.http.post(this.apiUrl87, JSON.stringify(oDat), { headers: headers }).pipe(
		  map(this.extractData),
		  catchError(this.handleError)
	  );
 }
  getDailyHoro(moonSign: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('sign', moonSign);
	console.log('calling api', this.apiUrl2);
  return this.http.get(this.apiUrl2, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  subscribeAstroUser(token: string, moonSign: string, moonDeg: number): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('token', token)
						.set('sign', moonSign)
						.set('deg', moonDeg.toString());
  return this.http.get(this.apiUrl3, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  addSubscriber(uuid: string, pln: string, nam: string, mob: string, eml: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('pln', pln)
						.set('nam', nam)
						.set('mob', mob)
						.set('eml', eml);
	return this.http.get(this.apiUrl30, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  getYogas(lat: any, lng: any, dob: string, tz: string, lang: string): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
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
   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0')
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('lang', lang);
	return this.http.get(this.apiUrl1111, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  calcVim(dob: string, lord: string, mpos: number, nsp: number, msi: number, nsi: number, lang: string): Observable<{}> {

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob)
						.set('lord', lord)
						.set('mpos', mpos.toString())
						.set('nsp', nsp.toString())
						.set('msi', msi.toString())
						.set('nsi', nsi.toString())
						.set('lang', lang);
	return this.http.get(this.apiUrl55, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getCareer(lat: any, lng: any, dob: string, tz: string, lang: string, ayanid: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0')
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('lang', lang)
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl50, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getMoney(das: string, lat: any, lng: any, dob: string, tz: string, lang: string, ayanid: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
						.set('das', das)
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0')
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('lang', lang)
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl57, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  analyzeD4(lat: any, lng: any, dob: string, tz: string, lang: string, ayanid: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0')
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('lang', lang)
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl58, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  analyzeD3(lat: any, lng: any, dob: string, tz: string, dstofset: number, lang: string, ayanid: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
   let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
    tsec = (tsec == '00') ? '0' : tsec;
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' +  tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('dstofset', dstofset.toString())
						.set('ayanid', ayanid.toString())
						.set('lang', lang);
	return this.http.get(this.apiUrl92, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  analyzeD7(lat: any, lng: any, dob: string, gen: string, tz: string, dstofset: number, lang: string, ayanid: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
   let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
    tsec = (tsec == '00') ? '0' : tsec;
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' +  tsec)
						.set('gen', gen)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('dstofset', dstofset.toString())
						.set('ayanid', ayanid.toString())
						.set('lang', lang);
	return this.http.get(this.apiUrl93, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  analyzeD9(lat: any, lng: any, dob: string, tz: string, dstofset: number, lang: string, ayanid: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
   let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
    tsec = (tsec == '00') ? '0' : tsec;
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('lang', lang)
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl60, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getCareerDas(mdas: string, lat: any, lng: any, dob: string, tz: string, dstofset: number, lang: string, ayanid: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
						.set('mdas', mdas)
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0')
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('lang', lang)
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl51, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getTransPreds(dob: string): Observable<{}> {

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0');
	return this.http.get(this.apiUrl38, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getNotif(uuid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get(this.apiUrl29, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getQuota(uuid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get(this.apiUrl77, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getPlan(uuid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get(this.apiUrl23, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getOffer(uuid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get(this.apiUrl53, {headers: headers, params: httpParams}).pipe(
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
  getAllReports(): Observable<{}> {
	return this.http.get(this.apiUrl68).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  getReports(uuid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get(this.apiUrl70, {headers: headers, params: httpParams}).pipe(
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
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get(this.apiUrl32, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getStory(uuid: string, title: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('title', title);
	return this.http.get(this.apiUrl74, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getComments(title: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
						.set('page_id', title);
	return this.http.get(this.apiUrl83, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getMsg(uuid: string, tag: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('tag', tag);
	return this.http.get(this.apiUrl75, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getProfile(uuid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get(this.apiUrl72, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  setProfile(uuid: string, avatar: string, dob: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('avatar', avatar)
						.set('dob', dob);
	return this.http.get(this.apiUrl73, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  
  isAdmin(uuid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get(this.apiUrl67, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getAstroBio(uid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uid', uid);
	return this.http.get(this.apiUrl64, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  setAstStatus(uuid: string, status: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('status', status);
	return this.http.get(this.apiUrl33, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  setAstTagline(uuid: string, tagline: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('tagline', tagline);
	return this.http.get(this.apiUrl34, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  setAstAvatar(uuid: string, avatar: string): Observable<{}> {
   var oDat = {
	uuid: uuid,
	avatar: avatar
   };
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('avatar', avatar);
	return this.http.get(this.apiUrl35, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
setQuota(uuid: string, qta: number): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('qta', qta.toString());
	return this.http.get(this.apiUrl78, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  setPlan(uuid: string, name: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('name', name);
	return this.http.get(this.apiUrl24, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  addCredits(uuid: string, credits: number): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('credits', credits.toString());
	return this.http.get(this.apiUrl25, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  addDOB(uuid: string, dob: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('dob', dob);
	return this.http.get(this.apiUrl26, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  remDOB(uuid: string, dob: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('dob', dob);
	return this.http.get(this.apiUrl81, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  addTicket(uuid: string, cat: string, sub: string, msg: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('cat', cat)
						.set('sub', sub)
						.set('msg', msg);
	return this.http.get(this.apiUrl27, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  addComment(uuid: string, title: string, pid: string, name: string, avatar: string, msg: string): Observable<{}> {
 let oDat = {
   content: msg,
   created: '',
   created_by_current_user: true,
   fullname: name,
   id: uuid,
   modified: '',
   parent: pid,
   profile_picture_url: avatar,
   upvote_count: 0,
   user_has_upvoted: false,
   page_id: title,
   email: '',
   upvote_users: ''
 };
 let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
			.set('Content-Type', 'application/json; charset=utf-8');
 	return this.http.post(this.apiUrl84, JSON.stringify(oDat), {headers: headers}).pipe(
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
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('guid', guid)
						.set('msg', msg);
	return this.http.get(this.apiUrl28, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  } 
  addReport(uuid: string, dobs: string, chtyp: string, aynm: string, lan: string, eml: string, mob: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('dobs', dobs)
						.set('chtyp', chtyp)
						.set('aynm', aynm)
						.set('lan', lan)
						.set('eml', eml)
						.set('mob', mob);
	return this.http.get(this.apiUrl69, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  updateReport(uuid: string, guid: string, lnk: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('guid', guid)
						.set('lnk', lnk);
	return this.http.get(this.apiUrl71, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
getHoro(lat: any, lng: any, dob: string, tz: string): Observable<{}> {
    console.log('getHoro', lat);
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0')
						.set('latlng', latlng)
						.set('timezone', tz);
	return this.http.get(this.apiUrl, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
getProHoro(lat: any, lng: any, dob: string, tz: string, ofset: number, ayanid: number): Observable<{}> {
	//var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	//var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0')
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('tzofset', ofset.toString())
						.set('name', '')
						.set('eml', '')
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl54, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
getBirthchartEx2(lat: any, lng: any, dob: string, tz: string, dstofset: number, ayanid: number): Observable<{}> {
	//var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	//var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
   let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
    tsec = (tsec == '00') ? '0' : tsec;
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('dstofset', dstofset.toString())
						.set('name', '')
						.set('eml', '')
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl80, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
 getAstakvarga(lat: any, lng: any, dob: string, tz: string, ofset: number, ayanid: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
    let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
	 tsec = (tsec == '00') ? '0' : tsec;
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('tzofset', ofset.toString())
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl63, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
 getShadbala(lat: any, lng: any, dob: string, tz: string, ofset: number, ayanid: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
   let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
    tsec = (tsec == '00') ? '0' : tsec;
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('tzofset', ofset.toString())
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl65, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  
getTransPredsEx(lat: any, lng: any, dob: string, tz: string, ofset: number, ayanid: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
   let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
    tsec = (tsec == '00') ? '0' : tsec;
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('tzofset', ofset.toString())
						.set('name', '')
						.set('eml', '')
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl56, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
 getMoonPhase(lat: any, lng: any, dob: string, tz: string): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
   let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
    tsec = (tsec == '00') ? '0' : tsec;
	let headers = new HttpHeaders();
	headers = headers.set('Accept', 'application/json; charset=utf-8');  
    headers.append('Cache-control', 'no-cache');
	headers.append('Cache-control', 'no-store');
	headers.append('Expires', '0');
	headers.append('Pragma', 'no-cache');	
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' +  tsec)
						.set('latlng', latlng)
						.set('timezone', tz);
	return this.http.get(this.apiUrl42, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
 getProMoonPhase(lat: string, lng: string, dob: string, tz: string, ayanid: number): Observable<{}> {
	//var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	//var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
   let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
   (tsec == '00') ? '0' :  tsec;
   console.log(tsec);
	let headers = new HttpHeaders();
	headers = headers.set('Accept', 'application/json; charset=utf-8');  
    headers.append('Cache-control', 'no-cache');
	headers.append('Cache-control', 'no-store');
	headers.append('Expires', '0');
	headers.append('Pragma', 'no-cache');	
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl47, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
 getDailyTrans(dob: string, latlng: string, tz: string, msgn: string, dstofset: number, ayanid: number): Observable<{}> {
	//var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	//var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
   let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
   (tsec == '00') ? '0' :  tsec;
   console.log(tsec);
	let headers = new HttpHeaders();
	headers = headers.set('Accept', 'application/json; charset=utf-8');  
    headers.append('Cache-control', 'no-cache');
	headers.append('Cache-control', 'no-store');
	headers.append('Expires', '0');
	headers.append('Pragma', 'no-cache');	
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('msgn', msgn)
						.set('dstofset', dstofset.toString())
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl90, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
 getCusps(lat: any, lng: any, dob: string, tz: string): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
 let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
 tsec = (tsec == '00') ? '0' : tsec;
   var oDat = {
   dob: '',
   tob: '',
   latlng: '',
   timezone: ''
   };
   oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
   oDat.tob = dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec;
   oDat.latlng = latlng;
   oDat.timezone = tz;
   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders();
	headers = headers.set('Accept', 'application/json; charset=utf-8');  
    headers.append('Cache-control', 'no-cache');
	headers.append('Cache-control', 'no-store');
	headers.append('Expires', '0');
	headers.append('Pragma', 'no-cache');	
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' +  tsec)
						.set('latlng', latlng)
						.set('timezone', tz);
	return this.http.get(this.apiUrl9, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
 getCuspsEx(lat: any, lng: any, dob: string, tz: string, dstofset: number, ayanid: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
   let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
   tsec = (tsec == '00') ? '0' : tsec;
	let headers = new HttpHeaders();
	headers = headers.set('Accept', 'application/json; charset=utf-8');  
    headers.append('Cache-control', 'no-cache');
	headers.append('Cache-control', 'no-store');
	headers.append('Expires', '0');
	headers.append('Pragma', 'no-cache');	
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('dstofset', dstofset.toString())
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl48, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
 getPrashna(lat: any, lng: any, dob: string, tz: string, znum: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
	let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
	tsec = (tsec == '00') ? '0' : tsec;
	let headers = new HttpHeaders();
	headers = headers.set('Accept', 'application/json; charset=utf-8');  
    headers.append('Cache-control', 'no-cache');
	headers.append('Cache-control', 'no-store');
	headers.append('Expires', '0');
	headers.append('Pragma', 'no-cache');	
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('znum', znum.toString());
	return this.http.get(this.apiUrl37, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  recfyBT(lat: any, lng: any, dob: string, tz: string, ofset: number, ayanid: number ): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
 let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
 tsec = (tsec == '00') ? '0' : tsec;
	let headers = new HttpHeaders();
	headers = headers.set('Accept', 'application/json; charset=utf-8');  
    headers.append('Cache-control', 'no-cache');
	headers.append('Cache-control', 'no-store');
	headers.append('Expires', '0');
	headers.append('Pragma', 'no-cache');	
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('tzofset', ofset.toString())
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl22, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  getBirthStars(dob: string, partnerdob: string, latlng: string, tz: string, ayanid: number): Observable<{}> {
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '-' + //partnerdob.split('T')[0].split('-')[2] + '|' + partnerdob.split('T')[0].split('-')[1] + '|' + partnerdob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '-' + partnerdob.split('T')[1].split(':')[0]  + '|' + //partnerdob.split('T')[1].split(':')[1] + '|' + '0';
	let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
	tsec = (tsec == '00') ? '0' : tsec;
	let tsec2: string = partnerdob.split('T')[1].split(':')[2].split('Z')[0]; 
	tsec2 = (tsec2 == '00') ? '0' : tsec2;
	let headers = new HttpHeaders();
	headers = headers.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '-' + partnerdob.split('T')[0].split('-')[2] + '|' + partnerdob.split('T')[0].split('-')[1] + '|' + partnerdob.split('T')[0].split('-')[0])
						.set('tob',  dob.split('T')[1].split(':')[0] + '|'+ dob.split('T')[1].split(':')[1]+'|' + tsec + '-'+ partnerdob.split('T')[1].split(':')[0]+'|' + partnerdob.split('T')[1].split(':')[1]+ '|'+ tsec2)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl4, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getBirthStar(dob: string): Observable<{}> {
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0');
  return this.http.get(this.apiUrl5, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getProBirthStar(lat: any, lng: any, dob: string, tz: string, ayanid: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
   let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
   tsec = (tsec == '00') ? '0' : tsec;
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('ayanid', ayanid.toString());
  return this.http.get(this.apiUrl45, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getStarConst(star: string, sign: string, moondeg: string): Observable<{}> {
	//var oDat = 'star=' + star + '&sign=' + sign + '&moondeg=' + moondeg;
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('star', star)
						.set('sign', sign)
						.set('moondeg', moondeg);
  return this.http.get(this.apiUrl6, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getProStarConst(star: string, sign: string, moondeg: string, latlng: string, tz: string, ayanid: number): Observable<{}> {
	//var oDat = 'star=' + star + '&sign=' + sign + '&moondeg=' + moondeg;
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8');
				//.set('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0');
	let httpParams = new HttpParams()
                        .set('star', star)
						.set('sign', sign)
						.set('moondeg', moondeg)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('ayanid', ayanid.toString());
  return this.http.get(this.apiUrl46, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getStarsForDay(dob: string, star: string, sign: string, moondeg: string, latlng: string, tz: string, dstofset: number, ayanid: number): Observable<{}> {
	//var oDat = 'star=' + star + '&sign=' + sign + '&moondeg=' + moondeg;
   let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
   (tsec == '00') ? '0' :  tsec;
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8');
				//.set('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0');
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
                        .set('star', star)
						.set('sign', sign)
						.set('moondeg', moondeg)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('dstofset', dstofset.toString())
						.set('ayanid', ayanid.toString());
  return this.http.get(this.apiUrl89, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  calForMon(mon: number, yer: number, latlng: string, tz: string, ayanid: number): Observable<{}> {
	//var oDat = 'star=' + star + '&sign=' + sign + '&moondeg=' + moondeg;
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('mon', mon.toString())
						.set('yer', yer.toString())
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('ayanid', ayanid.toString());
  return this.http.get(this.apiUrl82, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getTimezone(lat: any, lng: any, timestamp: string): Observable<{}> {
   //var oDat = 'location=' + lat + ',' + lng + '&timestamp=' + timestamp + '&key=' + 'AIzaSyANvr-rVst44P0DMBpDxsu6s0GXUVPrl9M';
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('location', lat + ',' + lng)
						.set('timestamp', timestamp)
						.set('key', 'AIzaSyCx1IH3j2RVc6hT12jR0kG3D8g-cDDq3MA');
  return this.http.get(this.apiUrl7, {headers: headers, params: httpParams}).pipe(
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
getArticle(tok: string): Observable<{}> {
  let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');
	let httpParams = new HttpParams()
                        .set('tok', tok);
   return this.http.get(this.apiUrl44, {headers: headers, params: httpParams}).pipe(
	map(this.extractData),
    catchError(this.handleError)
	);
  }  
  
getBlogs(uid: string): Observable<{}> {
  let headers = new HttpHeaders()
  .set('Accept', 'application/json; charset=utf-8');
	let httpParams = new HttpParams()
                        .set('uid', uid);
   return this.http.get(this.apiUrl39, {headers: headers, params: httpParams}).pipe(
	map(this.extractData),
    catchError(this.handleError)
	);
  }  
pubBlog(uuid: string, name: string, avatar: string, title: string, story: string, img: string): Observable<{}> {
 var oDat = {
   uuid: uuid,
   name: name,
   avatar: avatar,
   title: title,
   story: story,
   img: img
 };
  let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
			.set('Content-Type', 'application/json; charset=utf-8');
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
  let headers = new HttpHeaders()
		.set('Accept', 'application/json; charset=utf-8');
   return this.http.post(this.apiUrl44, JSON.stringify(oDat), {headers: headers}).pipe(
	map(this.extractData),
    catchError(this.handleError)
	);
  }   
getTransits(mdas: string, adas: string, pdas: string, pend: string): Observable<{}> {
	let headers = new HttpHeaders();
	headers = headers.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('mdas', mdas)
						.set('adas', adas)
						.set('pdas', pdas)
						.set('pend', pend);
  return this.http.get(this.apiUrl10, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
getDashTransEx(mdas: string, adas: string, pdas: string, pend: string, lat: any, lng: any, tz: string, ayanid: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('mdas', mdas)
						.set('adas', adas)
						.set('pdas', pdas)
						.set('pend', pend)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('ayanid', ayanid.toString());
  return this.http.get(this.apiUrl59, {headers: headers, params: httpParams}).pipe(
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
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');  
	let httpParams = new HttpParams()
                        .set('mdas', mdas)
						.set('adas', adas)
						.set('pdas', pdas)
						.set('pend', pend);
			
  return this.http.get(this.apiUrl20, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
getDashaTransits(vim: any): Observable<{}> {
   
	let headers = new HttpHeaders();
	headers = headers.set('Accept', 'application/json; charset=utf-8');   
  return this.http.post(this.apiUrl11, JSON.stringify(vim), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }    
 translateText(txt: string, tgt: string) : Observable<{}> {
 let httpParams = new HttpParams()
			.append('q', txt)
			.append('source', 'en')
			.append('target', tgt)
			.append('key ', 'AIzaSyByRjvoxkrwrCgMTmawQcm7zo0m2a5wg2s');

   return this.http.get(this.apiUrl111, {params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   ); 
}
getBirthInfo(lat: any, lng: any, dob: string, tz: string): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
   let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
   tsec = (tsec == '00') ? '0' : tsec;
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz);
	return this.http.get(this.apiUrl31, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
getBirthInfoEx(lat: any, lng: any, dob: string, tz: string, ayanid: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
 let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
 tsec = (tsec == '00') ? '0' : tsec;
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl79, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
getDoshas(lat: any, lng: any, dob: string, tz: string, dstofset: number, ayanid: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
    let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
    tsec = (tsec == '00') ? '0' : tsec;
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('dstofset', dstofset.toString())
						.set('ayanid', ayanid.toString());
	return this.http.get(this.apiUrl91, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getKPHouseGroup(uuid: string) : Observable<{}> {
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get(this.apiUrl61, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  addKPHouseGroup(uuid: string, hgp: string) : Observable<{}> {
   var oDat = {
	 uuid: uuid,
	 hgp: hgp
   };
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8') 
			.set('Content-Type', 'application/json; charset=utf-8');   
	return this.http.post(this.apiUrl62, JSON.stringify(oDat), {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  downloadPdf(uuid: string, name: string, gender: string, dob: string, pob: string, lat: string, lng: string, timezone: string, tzofset: number, ayanid: number, lang: string, chtyp ) : Observable<Blob> {
 let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
 console.log(tsec);
 tsec = (tsec == '00') ? '0' : tsec;
 var oDat = {
	 uuid: uuid,
	 name: name,
	 gender: gender,
	 dob: dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0],
	 tob: dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec,
	 pob: pob,
	 latlng: lat + '|'+lng,
	 timezone: timezone,
	 tzofset: tzofset,
	 ayanid: ayanid,
	 lang: lang,
	 chtyp: chtyp
   };
	let headers = new HttpHeaders()
			.set('Accept', 'application/pdf; charset=utf-8') 
			.set('Content-Type', 'application/json; charset=utf-8');
return this.http.post<Blob>(this.apiUrl85, JSON.stringify(oDat), { headers : headers,responseType : 
         'blob' as 'json'});			
	//return this.http.post(this.apiUrl85, JSON.stringify(oDat), {headers: headers}).pipe(
    // map(this.extractData),
    //catchError(this.handleError)
   //);
   }
  downloadPdfEx(uuid: string, name: string, gender: string, dob: string, pob: string, lat: string, lng: string, timezone: string, dstofset: number, ayanid: number, lang: string, chtyp, cimg: string, cnme: string, cnum: string, ceml: string ) : Observable<Blob> {
 let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
 console.log(tsec);
 tsec = (tsec == '00') ? '0' : tsec;
 var oDat = {
	 uuid: uuid,
	 name: name,
	 gender: gender,
	 dob: dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0],
	 tob: dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec,
	 pob: pob,
	 latlng: lat + '|'+lng,
	 timezone: timezone,
	 dstofset: dstofset,
	 ayanid: ayanid,
	 lang: lang,
	 chtyp: chtyp,
	 cimg: cimg,
	 cnme: cnme,
	 cnum: cnum,
	 ceml: ceml
   };
	let headers = new HttpHeaders()
			.set('Accept', 'application/pdf; charset=utf-8') 
			.set('Content-Type', 'application/json; charset=utf-8');
return this.http.post<Blob>(this.apiUrl88, JSON.stringify(oDat), { headers : headers,responseType : 
         'blob' as 'json'});			
	//return this.http.post(this.apiUrl85, JSON.stringify(oDat), {headers: headers}).pipe(
    // map(this.extractData),
    //catchError(this.handleError)
   //);
   }
  talkToAstro(uid: string, uuid: string, aid: string) : Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');   
	let httpParams = new HttpParams()
                        .set('uid', uid)
						.set('uuid', uuid)
						.set('aid', aid);
	return this.http.get(this.apiUrl49, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
   
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
