import {throwError as observableThrowError} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { ShareService } from './share.service';

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
  private apiUrl8 = 'https://api.vedichoroo.com/api/AstroStories';
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
  private apiUrl94 = 'https://api.vedichoroo.com/api/RecfyBTSML';
  private apiUrl95 = 'https://api.vedichoroo.com/api/StarsForMon';
  private apiUrl96 = 'https://api.vedichoroo.com/api/CompatibilityReport';
  private apiUrl97 = 'https://api.vedichoroo.com/api/Login';
  private apiUrl98 = 'https://api.vedichoroo.com/api/GetPujas';
  private apiUrl99 = 'https://api.vedichoroo.com/api/GetTickets';
  private apiUrl100 = 'https://api.vedichoroo.com/api/AddTicketResp';
  private apiUrl101 = 'https://api.vedichoroo.com/api/ApplyPromo';
  private apiUrl102 = 'https://api.vedichoroo.com/api/AddRating';
  private apiUrl103 = 'https://api.vedichoroo.com/api/GetTicketResps';
  private apiUrl104 = 'https://api.vedichoroo.com/api/AddReview';
  private apiUrl105= 'https://api.vedichoroo.com/api/GetAppVersion';
  private apiUrl106 = 'https://imgur-apiv3.p.rapidapi.com/3/image';
  private apiUrl107= 'https://api.vedichoroo.com/api/UserReviews';
  private apiUrl108= 'https://api.vedichoroo.com/api/UserRating';
  private apiUrl109= 'https://api.vedichoroo.com/api/UserReview';
  private apiUrl110= 'https://api.vedichoroo.com/api/AppRating';
  private apiUrl112 = 'https://api.vedichoroo.com/api/GetDashTrans4DT';
  private apiUrl113 = 'https://sapi.vedichoroo.com/api/LogCall';
  private apiUrl114 = 'https://sapi.vedichoroo.com/api/GetCallInfo';
  constructor(private http: HttpClient, private shareService: ShareService) { }
  getJson(url: string): Observable<{}> {
	return this.http.get(url).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  login(password: string) : Observable<{}> {
	  var oDat = {
		  name: 'VUSER',
		  password: password
	  }
	  let headers = new HttpHeaders()
		  .set('Accept', 'application/json; charset=utf-8')
		  .set('Content-Type', 'application/json; charset=utf-8');
	  
	  return this.http.post((this.shareService.isSubscr() == true) ? this.apiUrl97.replace('https://api', 'https://sapi') : this.apiUrl97, JSON.stringify(oDat), { headers: headers }).pipe(
		  map(this.extractData),
		  catchError(this.handleError)
	  );
  }
  uploadImage(b64img: string) : Observable<{}> {
  //  var oDat = {
//		key: '838018be3fb23483659f6041c6586217',
//		image: b64img.split(',')[1]
//	};
	  let headers = new HttpHeaders()
		  .set('Accept', 'application/json; charset=utf-8')
		  .set('Content-Type', 'application/json; charset=utf-8')
			.set('Authorization', 'Bearer ' + this.shareService.getToken());
   var form = new FormData();
   form.append('image', b64img.split(',')[1]);
	  return this.http.post('https://api.imgbb.com/1/upload', form, { params: {key: '838018be3fb23483659f6041c6586217'} }).pipe(
		  map(this.extractData),
		  catchError(this.handleError)
	  );
  }
  logCall(cinf: any) : Observable<{}> {
	  var oDat = {
		  uid: cinf.uid,
		  cid: '',
		  name: cinf.name,
		  uuid: cinf.uuid,
		  date: cinf.date,
		  duration: cinf.duration
	  };
	  let headers = new HttpHeaders()
		  .set('Accept', 'application/json; charset=utf-8')
		  .set('Content-Type', 'application/json; charset=utf-8')
			.set('Authorization', 'Bearer ' + this.shareService.getToken());
	  return this.http.post(this.apiUrl113, JSON.stringify(oDat), { headers: headers }).pipe(
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
		  .set('Content-Type', 'application/json; charset=utf-8')
			.set('Authorization', 'Bearer ' + this.shareService.getToken());
	  return this.http.post((this.shareService.isSubscr() == true) ? this.apiUrl86.replace('https://api', 'https://sapi') : this.apiUrl86, JSON.stringify(oDat), { headers: headers }).pipe(
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
		  .set('Content-Type', 'application/json; charset=utf-8')
			.set('Authorization', 'Bearer ' + this.shareService.getToken());
	  return this.http.post((this.shareService.isSubscr() == true) ? this.apiUrl87.replace('https://api', 'https://sapi') : this.apiUrl87, JSON.stringify(oDat), { headers: headers }).pipe(
		  map(this.extractData),
		  catchError(this.handleError)
	  );
 }
  getDailyHoro(moonSign: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
			.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('sign', moonSign);
	console.log('calling api', this.apiUrl2);
  return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl2.replace('https://api', 'https://sapi') : this.apiUrl2, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  subscribeAstroUser(token: string, moonSign: string, moonDeg: number): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')   
			.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('token', token)
						.set('sign', moonSign)
						.set('deg', moonDeg.toString())
  return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl3.replace('https://api', 'https://sapi') : this.apiUrl3, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  addSubscriber(uuid: string, pln: string, nam: string, mob: string, eml: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
			.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('pln', pln)
						.set('nam', nam)
						.set('mob', mob)
						.set('eml', eml);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl30.replace('https://api', 'https://sapi') : this.apiUrl30, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  applyPromo(uuid: string, promo: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
			.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('promo', promo);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl101.replace('https://api', 'https://sapi') : this.apiUrl101, {headers: headers, params: httpParams}).pipe(
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
			.set('Accept', 'application/json; charset=utf-8')
			.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0')
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('lang', lang);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl1111.replace('https://api', 'https://sapi') : this.apiUrl1111, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  calcVim(dob: string, lord: string, mpos: number, nsp: number, msi: number, nsi: number, lang: string): Observable<{}> {

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
			.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob)
						.set('lord', lord)
						.set('mpos', mpos.toString())
						.set('nsp', nsp.toString())
						.set('msi', msi.toString())
						.set('nsi', nsi.toString())
						.set('lang', lang);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl55.replace('https://api', 'https://sapi') : this.apiUrl55, {headers: headers, params: httpParams}).pipe(
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
			.set('Accept', 'application/json; charset=utf-8')  
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0')
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('lang', lang)
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl50.replace('https://api', 'https://sapi') : this.apiUrl50, {headers: headers, params: httpParams}).pipe(
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
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
						.set('das', das)
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0')
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('lang', lang)
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl57.replace('https://api', 'https://sapi') : this.apiUrl57, {headers: headers, params: httpParams}).pipe(
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
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0')
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('lang', lang)
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl58.replace('https://api', 'https://sapi') : this.apiUrl58, {headers: headers, params: httpParams}).pipe(
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
			.set('Accept', 'application/json; charset=utf-8') 
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' +  tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('dstofset', dstofset.toString())
						.set('ayanid', ayanid.toString())
						.set('lang', lang);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl92.replace('https://api', 'https://sapi') : this.apiUrl92, {headers: headers, params: httpParams}).pipe(
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
			.set('Accept', 'application/json; charset=utf-8')   
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' +  tsec)
						.set('gen', gen)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('dstofset', dstofset.toString())
						.set('ayanid', ayanid.toString())
						.set('lang', lang);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl93.replace('https://api', 'https://sapi') : this.apiUrl93, {headers: headers, params: httpParams}).pipe(
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
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('lang', lang)
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl60.replace('https://api', 'https://sapi') : this.apiUrl60, {headers: headers, params: httpParams}).pipe(
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
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
						.set('mdas', mdas)
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0')
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('lang', lang)
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl51.replace('https://api', 'https://sapi') : this.apiUrl51, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getTransPreds(dob: string): Observable<{}> {

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0');
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl38.replace('https://api', 'https://sapi') : this.apiUrl38, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getNotif(uuid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl29.replace('https://api', 'https://sapi') : this.apiUrl29, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getQuota(uuid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8') 
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl77.replace('https://api', 'https://sapi') : this.apiUrl77, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getPlan(uuid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl23.replace('https://api', 'https://sapi') : this.apiUrl23, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getOffer(uuid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl53.replace('https://api', 'https://sapi') : this.apiUrl53, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  getAllAstrologers(): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl36.replace('https://api', 'https://sapi') : this.apiUrl36, {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  getPujas(): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl98.replace('https://api', 'https://sapi') : this.apiUrl98, {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getRating(pid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('pid', pid);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl110.replace('https://api', 'https://sapi') : this.apiUrl110, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }   
  getReviews(pid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('pid', pid);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl107.replace('https://api', 'https://sapi') : this.apiUrl107, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  } 
  userRating(uuid: string,  name: string, avatar: string, pid: string, rating: number): Observable<{}> {
	  var oDat = {
		  uuid: uuid,
		  name: name,
		  avatar: avatar,
		  pid: pid,
		  rating: rating,
		  review: ''
	  };
  	  let headers = new HttpHeaders()
		  .set('Accept', 'application/json; charset=utf-8')
		  .set('Content-Type', 'application/json; charset=utf-8')
			.set('Authorization', 'Bearer ' + this.shareService.getToken());
	  return this.http.post((this.shareService.isSubscr() == true) ? this.apiUrl108.replace('https://api', 'https://sapi') : this.apiUrl108, JSON.stringify(oDat), { headers: headers }).pipe(
		  map(this.extractData),
		  catchError(this.handleError)
	  );
 }
  userReview(uuid: string, name: string, avatar: string, pid: string, rating: number, review: string): Observable<{}> {
	  var oDat = {
		  uuid: uuid,
		  name: name,
		  avatar: avatar,
		  pid: pid,
		  rating: rating,
		  review: review
	  };
  	  let headers = new HttpHeaders()
		  .set('Accept', 'application/json; charset=utf-8')
		  .set('Content-Type', 'application/json; charset=utf-8')
			.set('Authorization', 'Bearer ' + this.shareService.getToken());
	  return this.http.post((this.shareService.isSubscr() == true) ? this.apiUrl109.replace('https://api', 'https://sapi') : this.apiUrl109, JSON.stringify(oDat), { headers: headers }).pipe(
		  map(this.extractData),
		  catchError(this.handleError)
	  );
 }
  
  getTickets(): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl99.replace('https://api', 'https://sapi') : this.apiUrl99, {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
    getAppVersion(): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl105.replace('https://api', 'https://sapi') : this.apiUrl105, {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  

  getTicketResps(uuid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl103.replace('https://api', 'https://sapi') : this.apiUrl103, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  getAllReports(): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl68.replace('https://api', 'https://sapi') : this.apiUrl68, {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  getReports(uuid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')   
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl70.replace('https://api', 'https://sapi') : this.apiUrl70, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  getCallInfo(uid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')   
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uid', uid);
	return this.http.get(this.apiUrl114, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  getAllHobbyAsts(): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')   
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl52.replace('https://api', 'https://sapi') : this.apiUrl52, {headers: headers}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }   
  getAstrologer(uuid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl32.replace('https://api', 'https://sapi') : this.apiUrl32, {headers: headers, params: httpParams}).pipe(
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
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl74.replace('https://api', 'https://sapi') : this.apiUrl74, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getComments(title: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');
	let httpParams = new HttpParams()
						.set('page_id', title);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl83.replace('https://api', 'https://sapi') : this.apiUrl83, {headers: headers, params: httpParams}).pipe(
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
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl75.replace('https://api', 'https://sapi') : this.apiUrl75, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getProfile(uuid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')  
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl72.replace('https://api', 'https://sapi') : this.apiUrl72, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  setProfile(uuid: string, avatar: string, dob: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')  
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('avatar', avatar)
						.set('dob', dob);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl73.replace('https://api', 'https://sapi') : this.apiUrl73, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  
  isAdmin(uuid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl67.replace('https://api', 'https://sapi') : this.apiUrl67, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getAstroBio(uid: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uid', uid);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl64.replace('https://api', 'https://sapi') : this.apiUrl64, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  setAstStatus(uuid: string, status: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('status', status);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl33.replace('https://api', 'https://sapi') : this.apiUrl33, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  setAstTagline(uuid: string, tagline: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')   
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('tagline', tagline);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl34.replace('https://api', 'https://sapi') : this.apiUrl34, {headers: headers, params: httpParams}).pipe(
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
			.set('Accept', 'application/json; charset=utf-8')   
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('avatar', avatar);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl35.replace('https://api', 'https://sapi') : this.apiUrl35, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
setQuota(uuid: string, qta: number): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8') 
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('qta', qta.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl78.replace('https://api', 'https://sapi') : this.apiUrl78, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  setPlan(uuid: string, name: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')   
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('name', name);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl24.replace('https://api', 'https://sapi') : this.apiUrl24, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  addCredits(uuid: string, credits: number): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('credits', credits.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl25.replace('https://api', 'https://sapi') : this.apiUrl25, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  addReview(uuid: string, review: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')  
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('review', review);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl104.replace('https://api', 'https://sapi') : this.apiUrl104, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  addRating(uuid: string, rating: number): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')   
						.set('Authorization', 'Bearer ' + this.shareService.getToken());
let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('rating', rating.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl102.replace('https://api', 'https://sapi') : this.apiUrl102, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  addDOB(uuid: string, dob: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')  
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('dob', dob);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl26.replace('https://api', 'https://sapi') : this.apiUrl26, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  remDOB(uuid: string, dob: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8') 
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('dob', dob);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl81.replace('https://api', 'https://sapi') : this.apiUrl81, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  addTicket(uuid: string, cat: string, sub: string, msg: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')  
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('cat', cat)
						.set('sub', sub)
						.set('msg', msg);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl27.replace('https://api', 'https://sapi') : this.apiUrl27, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  addTicketResp(uuid: string, guid: string, resp: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('guid', guid)
						.set('resp', resp);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl100.replace('https://api', 'https://sapi') : this.apiUrl100, {headers: headers, params: httpParams}).pipe(
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
 	return this.http.post((this.shareService.isSubscr() == true) ? this.apiUrl84.replace('https://api', 'https://sapi') : this.apiUrl84, JSON.stringify(oDat), {headers: headers}).pipe(
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
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('guid', guid)
						.set('msg', msg);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl28.replace('https://api', 'https://sapi') : this.apiUrl28, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  } 
  addReport(uuid: string, dobs: string, chtyp: string, aynm: string, lan: string, eml: string, mob: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8') 
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('dobs', dobs)
						.set('chtyp', chtyp)
						.set('aynm', aynm)
						.set('lan', lan)
						.set('eml', eml)
						.set('mob', mob);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl69.replace('https://api', 'https://sapi') : this.apiUrl69, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
  updateReport(uuid: string, guid: string, lnk: string): Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid)
						.set('guid', guid)
						.set('lnk', lnk);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl71.replace('https://api', 'https://sapi') : this.apiUrl71, {headers: headers, params: httpParams}).pipe(
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
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0')
						.set('latlng', latlng)
						.set('timezone', tz);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl.replace('https://api', 'https://sapi') : this.apiUrl, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
getProHoro(lat: number, lng: number, dob: string, tz: string, ofset: number, ayanid: number): Observable<{}> {
	//var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	//var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	//if(lat.toString().indexOf('º') > -1)
		//lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	//if(lng.toString().indexOf('º') > -1)
		//lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat.toString() + '|' + lng.toString();
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0')
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('tzofset', ofset.toString())
						.set('name', '')
						.set('eml', '')
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl54.replace('https://api', 'https://sapi') : this.apiUrl54, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
getBirthchartEx2(lat: number, lng: number, dob: string, tz: string, dstofset: number, ayanid: number): Observable<{}> {
	//var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	//var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	//if(lat.toString().indexOf('º') > -1)
		//lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	//if(lng.toString().indexOf('º') > -1)
		//lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat.toString() + '|' + lng.toString();
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';

   //let headers = new Headers({ 'Accept': 'application/json; charset=utf-8' });
   let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
    tsec = (tsec == '00') ? '0' : tsec;
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('dstofset', dstofset.toString())
						.set('name', '')
						.set('eml', '')
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl80.replace('https://api', 'https://sapi') : this.apiUrl80, {headers: headers, params: httpParams}).pipe(
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
			.set('Accept', 'application/json; charset=utf-8')  
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
    let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
	 tsec = (tsec == '00') ? '0' : tsec;
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('tzofset', ofset.toString())
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl63.replace('https://api', 'https://sapi') : this.apiUrl63, {headers: headers, params: httpParams}).pipe(
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
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('tzofset', ofset.toString())
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl65.replace('https://api', 'https://sapi') : this.apiUrl65, {headers: headers, params: httpParams}).pipe(
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
			.set('Accept', 'application/json; charset=utf-8') 
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('tzofset', ofset.toString())
						.set('name', '')
						.set('eml', '')
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl56.replace('https://api', 'https://sapi') : this.apiUrl56, {headers: headers, params: httpParams}).pipe(
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
	headers.append('Pragma', 'no-cache')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' +  tsec)
						.set('latlng', latlng)
						.set('timezone', tz);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl42.replace('https://api', 'https://sapi') : this.apiUrl42, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
 getProMoonPhase(lat: number, lng: number, dob: string, tz: string, ayanid: number): Observable<{}> {
	//var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
	//var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
	var latlng = lat.toString() + '|' + lng.toString();
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
	headers.append('Pragma', 'no-cache')	
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl47.replace('https://api', 'https://sapi') : this.apiUrl47, {headers: headers, params: httpParams}).pipe(
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
	headers.append('Pragma', 'no-cache')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('msgn', msgn)
						.set('dstofset', dstofset.toString())
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl90.replace('https://api', 'https://sapi') : this.apiUrl90, {headers: headers, params: httpParams}).pipe(
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
	headers.append('Pragma', 'no-cache')	
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' +  tsec)
						.set('latlng', latlng)
						.set('timezone', tz);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl9.replace('https://api', 'https://sapi') : this.apiUrl9, {headers: headers, params: httpParams}).pipe(
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
	headers.append('Pragma', 'no-cache')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('dstofset', dstofset.toString())
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl48.replace('https://api', 'https://sapi') : this.apiUrl48, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
recfyBTSML(dobf: string, dobr: string, lat: any, lng: any, tz: string, dstofset: number, ayanid: number): Observable<{}> {
	 var oDat = {
	   dobf: dobf,
	   dobr: dobr,
	   lat: lat,
	   lng: lng,
	   timezone: tz,
	   dstofset: dstofset,
	   ayanid: ayanid
	 };
	  let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8')
				.set('Content-Type', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	return this.http.post((this.shareService.isSubscr() == true) ? this.apiUrl94.replace('https://api', 'https://sapi') : this.apiUrl94, JSON.stringify(oDat), { headers: headers }).pipe(
		  map(this.extractData),
		  catchError(this.handleError)
		  );
  }
 async getCuspsPromise(lat: any, lng: any, dob: string, tz: string, dstofset: number, ayanid: number) : Promise<any>{
   return await this.getCuspsEx(lat, lng, dob, tz, dstofset, ayanid).toPromise();
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
	headers.append('Pragma', 'no-cache')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('znum', znum.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl37.replace('https://api', 'https://sapi') : this.apiUrl37, {headers: headers, params: httpParams}).pipe(
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
	headers.append('Pragma', 'no-cache')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('tzofset', ofset.toString())
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl22.replace('https://api', 'https://sapi') : this.apiUrl22, {headers: headers, params: httpParams}).pipe(
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
	headers = headers.set('Accept', 'application/json; charset=utf-8') 
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '-' + partnerdob.split('T')[0].split('-')[2] + '|' + partnerdob.split('T')[0].split('-')[1] + '|' + partnerdob.split('T')[0].split('-')[0])
						.set('tob',  dob.split('T')[1].split(':')[0] + '|'+ dob.split('T')[1].split(':')[1]+'|' + tsec + '-'+ partnerdob.split('T')[1].split(':')[0]+'|' + partnerdob.split('T')[1].split(':')[1]+ '|'+ tsec2)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl4.replace('https://api', 'https://sapi') : this.apiUrl4, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getCompatibilityReport(dob: string, partner_dob: string, lat: number, lng: number, partner_lat: number, partner_lng: number, tz: string, partner_tz: string, dst: number, partner_dst: number, ayanid: number): Observable<{}> {
	 var oDat = {
	   dob: dob,
	   partner_dob: partner_dob,
	   lat: lat,
	   lng: lng,
	   partner_lat: partner_lat,
	   partner_lng: partner_lng,
	   tz: tz,
	   partner_tz: partner_tz,
	   dst: dst,
	   partner_dst: partner_dst,
	   ayanid: ayanid
	 };
	  let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8')
				.set('Content-Type', 'application/json; charset=utf-8')
				.set('Access-Control-Allow-Origin', '*')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	return this.http.post((this.shareService.isSubscr() == true) ? this.apiUrl96.replace('https://api', 'https://sapi') : this.apiUrl96, JSON.stringify(oDat), { headers: headers }).pipe(
		  map(this.extractData),
		  catchError(this.handleError)
		  );
  }
  getBirthStar(dob: string): Observable<{}> {
	//var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0');
  return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl5.replace('https://api', 'https://sapi') : this.apiUrl5, {headers: headers, params: httpParams}).pipe(
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
				.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('ayanid', ayanid.toString());
  return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl45.replace('https://api', 'https://sapi') : this.apiUrl45, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getStarConst(star: string, sign: string, moondeg: string): Observable<{}> {
	//var oDat = 'star=' + star + '&sign=' + sign + '&moondeg=' + moondeg;
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('star', star)
						.set('sign', sign)
						.set('moondeg', moondeg);
  return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl6.replace('https://api', 'https://sapi') : this.apiUrl6, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getProStarConst(star: string, sign: string, moondeg: string, latlng: string, tz: string, ayanid: number): Observable<{}> {
	//var oDat = 'star=' + star + '&sign=' + sign + '&moondeg=' + moondeg;
	
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
				//.set('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0');
	let httpParams = new HttpParams()
                        .set('star', star)
						.set('sign', sign)
						.set('moondeg', moondeg)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('ayanid', ayanid.toString());
  return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl46.replace('https://api', 'https://sapi') : this.apiUrl46, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getStarsForMon(star: string, sign: string, lat: number, lng: number, tz: string, dstofset: number, ayanid: number) : Observable<{}> {
  	 var oDat = {
	   star: star,
	   sign: sign,
	   lat: lat,
	   lng: lng,
	   timezone: tz,
	   dstofset: dstofset,
	   ayanid: ayanid
	 };
	  let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8')
				.set('Content-Type', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	return this.http.post((this.shareService.isSubscr() == true) ? this.apiUrl95.replace('https://api', 'https://sapi') : this.apiUrl95, JSON.stringify(oDat), { headers: headers }).pipe(
		  map(this.extractData),
		  catchError(this.handleError)
		  );
}
  getStarsForDay(dob: string, star: string, sign: string, moondeg: string, latlng: string, tz: string, dstofset: number, ayanid: number): Observable<{}> {
	//var oDat = 'star=' + star + '&sign=' + sign + '&moondeg=' + moondeg;
   let tsec: string = dob.split('T')[1].split(':')[2].split('Z')[0]; 
   (tsec == '00') ? '0' :  tsec;
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
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
  return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl89.replace('https://api', 'https://sapi') : this.apiUrl89, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  calForMon(mon: number, yer: number, latlng: string, tz: string, ayanid: number): Observable<{}> {
	//var oDat = 'star=' + star + '&sign=' + sign + '&moondeg=' + moondeg;
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('mon', mon.toString())
						.set('yer', yer.toString())
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('ayanid', ayanid.toString());
  return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl82.replace('https://api', 'https://sapi') : this.apiUrl82, {headers: headers, params: httpParams}).pipe(
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
  return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl7.replace('https://api', 'https://sapi') : this.apiUrl7, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
 getStories(): Observable<{}> {
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8');
   return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl8.replace('https://api', 'https://sapi') : this.apiUrl8, {headers: headers}).pipe(
	map(this.extractData),
    catchError(this.handleError)
	);
  }
getArticle(tok: string): Observable<{}> {
  let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8');
	let httpParams = new HttpParams()
                        .set('tok', tok);
   return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl44.replace('https://api', 'https://sapi') : this.apiUrl44, {headers: headers, params: httpParams}).pipe(
	map(this.extractData),
    catchError(this.handleError)
	);
  }  
  
getBlogs(uid: string): Observable<{}> {
  let headers = new HttpHeaders()
  .set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uid', uid);
   return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl39.replace('https://api', 'https://sapi') : this.apiUrl39, {headers: headers, params: httpParams}).pipe(
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
   return this.http.post((this.shareService.isSubscr() == true) ? this.apiUrl40.replace('https://api', 'https://sapi') : this.apiUrl40, JSON.stringify(oDat), {headers: headers}).pipe(
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
		.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
   return this.http.post((this.shareService.isSubscr() == true) ? this.apiUrl44.replace('https://api', 'https://sapi') : this.apiUrl44, JSON.stringify(oDat), {headers: headers}).pipe(
	map(this.extractData),
    catchError(this.handleError)
	);
  }   
getTransits(mdas: string, adas: string, pdas: string, pend: string): Observable<{}> {
	let headers = new HttpHeaders();
	headers = headers.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('mdas', mdas)
						.set('adas', adas)
						.set('pdas', pdas)
						.set('pend', pend);
  return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl10.replace('https://api', 'https://sapi') : this.apiUrl10, {headers: headers, params: httpParams}).pipe(
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
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('mdas', mdas)
						.set('adas', adas)
						.set('pdas', pdas)
						.set('pend', pend)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('ayanid', ayanid.toString());
  return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl59.replace('https://api', 'https://sapi') : this.apiUrl59, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
getDashTrans4DT(cdt: any, mdas: string, adas: string, pdas: string, lat: any, lng: any, tz: string, ayanid: number): Observable<{}> {
	if(lat.toString().indexOf('º') > -1)
		lat = lat.split("º")[0] + '.' + lat.split("º")[1].split("'")[0];
	if(lng.toString().indexOf('º') > -1)
		lng = lng.split("º")[0] + '.' + lng.split("º")[1].split("'")[0];
	var latlng = lat + '|' + lng;
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', cdt.getDate().toString() + '|' + (cdt.getMonth()+1).toString() + '|' + cdt.getFullYear().toString())
						.set('tob', cdt.getHours().toString()  + '|' + cdt.getMinutes().toString() + '|' + cdt.getSeconds().toString())
                        .set('mdas', mdas)
						.set('adas', adas)
						.set('pdas', pdas)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('ayanid', ayanid.toString());
  return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl112.replace('https://api', 'https://sapi') : this.apiUrl112, {headers: headers, params: httpParams}).pipe(
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
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('mdas', mdas)
						.set('adas', adas)
						.set('pdas', pdas)
						.set('pend', pend);
			
  return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl20.replace('https://api', 'https://sapi') : this.apiUrl20, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }  
getDashaTransits(vim: any): Observable<{}> {
   
	let headers = new HttpHeaders();
	headers = headers.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
  return this.http.post((this.shareService.isSubscr() == true) ? this.apiUrl11.replace('https://api', 'https://sapi') : this.apiUrl11, JSON.stringify(vim), {headers: headers}).pipe(
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

   return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl111.replace('https://api', 'https://sapi') : this.apiUrl111, {params: httpParams}).pipe(
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
				.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl31.replace('https://api', 'https://sapi') : this.apiUrl31, {headers: headers, params: httpParams}).pipe(
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
				.set('Accept', 'application/json; charset=utf-8')  
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl79.replace('https://api', 'https://sapi') : this.apiUrl79, {headers: headers, params: httpParams}).pipe(
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
				.set('Accept', 'application/json; charset=utf-8')  
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('dob', dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0])
						.set('tob', dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + tsec)
						.set('latlng', latlng)
						.set('timezone', tz)
						.set('dstofset', dstofset.toString())
						.set('ayanid', ayanid.toString());
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl91.replace('https://api', 'https://sapi') : this.apiUrl91, {headers: headers, params: httpParams}).pipe(
    map(this.extractData),
    catchError(this.handleError)
   );
  }
  getKPHouseGroup(uuid: string) : Observable<{}> {
	let headers = new HttpHeaders()
				.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uuid', uuid);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl61.replace('https://api', 'https://sapi') : this.apiUrl61, {headers: headers, params: httpParams}).pipe(
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
			.set('Content-Type', 'application/json; charset=utf-8') 
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	return this.http.post((this.shareService.isSubscr() == true) ? this.apiUrl62.replace('https://api', 'https://sapi') : this.apiUrl62, JSON.stringify(oDat), {headers: headers}).pipe(
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
			.set('Content-Type', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
return this.http.post<Blob>((this.shareService.isSubscr() == true) ? this.apiUrl85.replace('https://api', 'https://sapi') : this.apiUrl85, JSON.stringify(oDat), { headers : headers,responseType : 
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
			.set('Content-Type', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
return this.http.post<Blob>((this.shareService.isSubscr() == true) ? this.apiUrl88.replace('https://api', 'https://sapi') : this.apiUrl88, JSON.stringify(oDat), { headers : headers,responseType : 
         'blob' as 'json'});			
	//return this.http.post(this.apiUrl85, JSON.stringify(oDat), {headers: headers}).pipe(
    // map(this.extractData),
    //catchError(this.handleError)
   //);
   }
  talkToAstro(uid: string, uuid: string, aid: string) : Observable<{}> {
	let headers = new HttpHeaders()
			.set('Accept', 'application/json; charset=utf-8')
					.set('Authorization', 'Bearer ' + this.shareService.getToken());
	let httpParams = new HttpParams()
                        .set('uid', uid)
						.set('uuid', uuid)
						.set('aid', aid);
	return this.http.get((this.shareService.isSubscr() == true) ? this.apiUrl49.replace('https://api', 'https://sapi') : this.apiUrl49, {headers: headers, params: httpParams}).pipe(
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
