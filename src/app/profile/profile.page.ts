import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, ActivatedRoute} from '@angular/router';
import { Platform } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service';
import { User } from '../user';
import * as AWS from 'aws-sdk';

declare var google; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  service = new google.maps.places.AutocompleteService();
  public data               : any;
  autocomplete;
  autocompleteItems;
  nam: string = '';
    day: number;
  mon: number;
  year: number;
  hou: number;
  min: number;
  sec: number;
dob: string = '';
  tob: string = '';
  latlng: string = '';
  dstofset: number = -1;
  tz: string = '';
  place: string = '';
  gen: string = '';
  info: string = '';
  info1: string = '';
  showL: boolean = false;
  showP: boolean = true;
  chg: boolean = false;
  tagline: string = '';
  status: boolean = false;
  showASU: boolean = false;
  showS: boolean = true;
  isLoading: boolean = false;
  source: any;
  cropOptions: CropOptions = {
    quality: 50
  }
  avatar: string = 'https://i.imgur.com/LR7e1vw.png';
  constructor(private router: Router, private route: ActivatedRoute, private zone: NgZone, private datePicker: DatePicker, public shareService: ShareService, public horoService: HoroscopeService, public platform: Platform, public device: Device, private camera: Camera, private crop: Crop, private filePath: FilePath, private file: File) { 
  this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
        this.data = {}; 
		this.data.image = 'https://i.imgur.com/LR7e1vw.png';
	}

  ngOnInit() {
	  this.isLoading = true;
	this.source = this.router.getCurrentNavigation().extras.state;
        console.log('source', this.source); 
		if(this.source == 'proreq-home') {
			this.showP = true;
			this.showL = false;
			this.info1 = '';
		}
    this.platform.ready().then(() => {
	this.shareService.getItem('user').then( user => {
	  this.nam = user['name'];
	  this.data.image = user['imageUrl'];
	  this.avatar = user['imageUrl'];
	})
	.catch(e => {
	});
    this.shareService.getPLAN().then((pln) => {
			this.info = 'Finding your profle information..';
			this.horoService.getProfile(this.device.uuid)
		.subscribe(res => {
		   this.isLoading = false;
		   this.info = '';
		   if(res['status'].length != 'X' && res['status'] != 'E') {
			   if(res['avatar'].length > 0) {
				 //let image : any        = new Image();
				 //image.src 				= res['avatar'];
				 // Assign the Image object to the ImageCropper component 
				 //this.data.image = res['avatar'];
				 //this.avatar = res['avatar'];
			   } else {
					if(pln.name == 'com.mypubz.eportal.astrologer') {
					   this.horoService.getAstrologer(this.device.uuid)
							.subscribe(res2 => {
								if(res2['status'] != 'X' && res2['status'] != 'E') {
									this.showASU = true;
									this.tagline = res2['tagline'];
									this.status = (res2['status'] == 'A') ? true : false;
									//if(res2['avatar'] != '') {
									//this.avatar = res2['avatar'];
									 //let image : any        = new Image();
									 //image.src 				= res2['avatar'];
									 // Assign the Image object to the ImageCropper component 
									 //this.data.image = image;
									//} else this.data.image = 'https://i.imgur.com/LR7e1vw.png';
								} //else this.data.image = 'https://i.imgur.com/LR7e1vw.png';
							}, (err) => {
								this.info = JSON.stringify(err);
							});
					}
			   }
				   
			   //this.nam = res['name'];
			   this.gen = res['gen'];
			   let db: string = res['dob'].replace('$NaN$0$0','').replace('$NaN','');
			   console.log('db', db);
			   if(db.indexOf('L') > -1) {
					this.dstofset = (db.indexOf('$') > -1) ? Number(db.split('$')[1].split('@')[0]) : -1;
					let dtm: string = db.split('L')[0].trim();
					this.dob = dtm.split('T')[0];
					console.log('dob', this.dob);
					if(dtm.indexOf('T') > -1)
						this.tob = dtm.split('T')[1];
					this.year = Number(this.dob.split('-')[0]);
					this.mon = Number(this.dob.split('-')[1]);
					this.day = Number(this.dob.split('-')[2]);
					this.hou = Number(this.tob.split(':')[0]);
					this.min = Number(this.tob.split(':')[1]);
					this.sec = (this.tob.split(':').length > 2) ? Number(this.tob.split(':')[2].slice(0,-1)) : 0; 
					console.log('tob', this.tob);
					if(db.indexOf('@') > -1) {
						this.latlng = (db.indexOf('$') > -1) ? db.split('L')[1].split('$')[0] : db.split('L')[1].split('@')[0];
					let tng: string = db.split('@')[1];
					if(tng.indexOf('#') > -1) this.tz = tng.split('#')[0];
					else this.tz = tng;
				} else if(db.indexOf('#') > -1) {
					this.latlng = (db.indexOf('$') > -1) ? db.split('L')[1].split('$')[0] : db.split('L')[1].split('#')[0];
				} else {
					this.latlng = (db.indexOf('$') > -1) ? db.split('L')[1].split('$')[0] : db.split('L')[1];
				}
				this.showL = true;
				this.showP = false;
								//let tng: string = db.split('L')[1].split('@')[1];
				if(db.indexOf('#') > -1) {
					var ng = db.split('#')[1];
					this.nam = ng.split('&')[0];
					this.gen = ng.split('&')[1];
				}
			}
			if(this.dstofset == -1) { 
			  this.showP = true;
			  this.showL = false;
			}
		} else {
			this.info = 'Please enter your birth details';
		}
	}, (err) => {
			this.info = 'Error while calling getProfile ' + JSON.stringify(err);
	});
    }, (err) => {
		this.info = 'Error while getting the PLAN ' + JSON.stringify(err);
	});
   });
  }
   enter()
   {
	   this.showL = false;
	   this.showP = true;
   }
   save(evt)
   {
	   evt.stopPropagation();
	   this.info = '';
	   if(this.dstofset == -1) {
			this.info = 'Please enter your place of birth';
			return;
	   }
	if(this.day == null || this.mon == null || this.year == null) {
		this.info = 'Please enter date of birth';
		return;
	} else {
        this.dob = this.year.toString()+'-'+ this.mon.toString()+'-'+this.day.toString();
	}
	if(this.hou == null || this.min == null) {
		this.info = 'Please enter time of birth';
		return;
	} else  {
		let s = (this.sec == null) ? '00Z':this.sec.toString()+'Z';
        this.tob = this.hou.toString()+':'+this.min.toString()+':'+s ;
	}
	if(!this.isValidDate(this.day, this.mon, this.year, this.hou, this.min, (this.sec == null) ? 0 : this.sec)) {
		this.info = 'Please enter valid date & time';
		return;
	}
			let db: string = '';
			if(this.dob.length > 0 && this.tob.length > 0)
				db = this.dob + 'T' + this.tob;
			else {
				this.info = 'Please enter your date & time of birth';
				return;
			}
				
			if(this.latlng.length > 0) db += 'L' + this.latlng;
			else {
				this.info = 'Please enter your place of birth';
				return;
			}
			db += '$' + this.dstofset;
			if(this.tz.length > 0) db += '@' + this.tz;
			if(this.nam.length > 0) db += '#' + this.nam;
			if(this.gen.length > 0) db += '&' + this.gen;
			if(db != '') {
				this.info = 'Saving the profile..';
				this.shareService.getItem('user').then((user: User) => {
						user.dob = db;
						console.log('user.dob', user.dob);
						this.shareService.setItem('user', JSON.stringify(user));
				})
				.catch(e => {
					console.log(e);
					this.info = JSON.stringify(e);
				});
				
						this.shareService.setPDOB(db);
				this.horoService.setProfile(this.device.uuid, this.avatar, db)
				.subscribe(res => {
					this.showS = false;
					if(res['status'] == 'E') this.info = res['dob'];
					else{
						this.info = 'Profile saved successfully.';
						this.shareService.setUPRO(res);
					}
				}, (err) => {
					this.info = err;
				});
			//	if(this.source == 'home' || this.source == 'proreq-home') {
					let ayanid: number = 4;
					var res = this.shareService.getAYNM();
					if(res) ayanid = Number(res);
					this.info = 'Please wait...';
					this.horoService.getProBirthStar(this.latlng.split(',')[0], this.latlng.split(',')[1], this.dob + 'T' + this.tob + ':00Z', this.tz, ayanid)
				   .subscribe(res => {
					 console.log(res);
					 this.shareService.setMoonSign(res['birthSign']);
					 this.shareService.setMSD(res['birthSignDeg']);
					 this.shareService.setBirthStar(res['birthStar']);
					 this.shareService.setSSGN(res['sunSign']);
					 this.shareService.setASGN(res['ascSign'])
					// this.info = '';
					 //this.nwait = 0;
					 this.info = '';
					 this.shareService.getPRED().then( pred => {
						if(pred) {}
						else this.shareService.setPRED('Mo');
						 if(this.source == 'home') {
							  let dho: any = {
								  sho: false,
								  msgn: res['birthSign'],
								  msg: '',
								  smsg:'',
								  img: ''
							  };
							 this.router.navigate(['/daily-forecast'], {state : dho});
						 } else this.router.navigate(['/tabs'], {replaceUrl : true});
					 })
					.catch(e => {
						console.log(e);
						this.shareService.setPRED('Mo');
						 if(this.source == 'home') { 
							  let dho: any = {
								  sho: false,
								  msgn: res['birthSign'],
								  msg: '',
								  smsg:'',
								  img: ''
							  };
								this.router.navigate(['/daily-forecast'], {state : dho});
						 } else this.router.navigate(['/tabs'], {replaceUrl : true});
					 });        
					}, (err) => {
						this.info = JSON.stringify(err);
						//this.nwait = 0;
					}) ;
				//} else {
					//this.router.navigate(['/home']);
				//}
			}
	  // }
   }
 isValidDate(d, m, y, hou, min, sec) {
  var dt = new Date(y,m,d,hou,min,sec);
  if (Object.prototype.toString.call(dt) === "[object Date]") {
  // it is a date
   if (isNaN(dt.getTime())) {  // dt.valueOf() could also work
    // date is not valid
    return false;
   } else {
    return true;
   }
  } else {
   return false;
  }
 }
   
   s3Putimage(file, key, encoding){
    return new Promise((resolve, reject) => {
      AWS.config.accessKeyId = 'AKIATA2OQZZZQI3VYSGZ';
      AWS.config.secretAccessKey = '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';
      AWS.config.region = 'us-east-2';
      AWS.config.signatureVersion = 'v4';
      let s3 = new AWS.S3();
      
      const params = {
        Body: file.body,
        Bucket: '126images',
        Key: key,
        ACL: "public-read",
      };
      
      s3.putObject(params, (err, data) => {
        console.log("S3 Response is", data)
        if(err) {
          reject(err);
        } else { 
          resolve(key); }
      });
    })
  }  public uploadPic() {
    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  }
  public takePic() {
    this.takePicture(this.camera.PictureSourceType.CAMERA);
  }
  public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
	    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          //this.cpyNupload(correctPath, currentName, this.createFileName());
		  this.cropImage(filePath);
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      //this.cpyNupload(correctPath, currentName, this.createFileName());
	  this.cropImage(imagePath);
    }
  }, (err) => {
      this.info =  'Error while selecting image.';
  });
 }  
 cropImage(imgPath) {
    this.crop.crop(imgPath, this.cropOptions)
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0]);
		  this.shareService.setPIMG(newPath.split('?')[0]);
		  
        },
        error => {
          alert('Error cropping image' + error);
        }
      );
  }
  
  showCroppedImage(ImagePath) {
    this.isLoading = true;
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];
   
    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.data.image = base64;
      this.isLoading = false;
	  this.horoService.uploadImage(base64).subscribe( img  => {
		  console.log('uploadimg', img);
		  this.avatar = img['data'].url;
	  });
	  //this.uploadImage(this.data.image);
    }, error => {
      alert('Error in showing image' + error);
      this.isLoading = false;
    });
  }
  /*cropImage(ImagePath) {
	 console.log('crop', ImagePath);
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      // Create an Image object, assign retrieved base64 image from 
         // the device photo library
         let image : any        = new Image();
         image.src 				= base64;
		 // Assign the Image object to the ImageCropper component 
         this.localFile = image;
		 this.chg = true;
    }, error => {
      console.log('Error in showing image' + error);
    });	 
    //this.crop.crop(fileUrl, { quality: 50 })
     // .then(
      //  newPath => {
        //  this.showCroppedImage(newPath.split('?')[0])
        //},
       // error => {
       //   console.log('Error cropping image' + error);
       // }
     // );
  }*/

 // Create a new name for the image
 private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
 }

	
 uploadImage(image) {
    return new Promise((resolve, reject) => {

      const body = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      const ext = image.split(';')[0].split('/')[1] || 'jpg';
      let date =  Date.now();
      let key = 'images/profile-126-' + date + '.jpg';
      this.s3Putimage({ body, mime: `image/${ext}` }, key, 'base64').then((result) => { 
					resolve(result); 
					console.log('aws', result);
					this.avatar = 'https://126images.s3-us-east-2.amazonaws.com/' + result.toString();
					let db: string = '';
					if(this.dob.length > 0 && this.tob.length > 0)
						db = this.dob + 'T' + this.tob;
					if(this.latlng.length > 0) db += 'L' + this.latlng;
					if(this.tz.length > 0) db += '@' + this.tz;
					if(this.nam.length > 0) db += '#' + this.nam;
					if(this.gen.length > 0) db += '&' + this.gen;
					this.info = 'Saving the profile..';
					this.horoService.setProfile(this.device.uuid, 'https://126images.s3-us-east-2.amazonaws.com/' + result.toString(), db)
						.subscribe(res => {
							this.info = 'Profile is saved.';
						}, (err) => {
							this.info = err;
						});
				}).catch((err) => { 
					reject(err); 
				});
    })
  }
  updateSearch() {
    console.log('updateSearch');
    if (this.autocomplete.query == '' || this.autocomplete.query.length < 3 || this.autocomplete.query == this.place) {
     this.autocompleteItems = [];
     return;
    }

    let me = this;
    this.service.getPlacePredictions({
    input: this.autocomplete.query,
    
   }, (predictions, status) => {
     console.log('getPlacePredictions', predictions);
     me.autocompleteItems = [];

   me.zone.run(() => {
     console.log('zone.run', predictions);
     if (predictions != null) {
        predictions.forEach((prediction) => {
          me.autocompleteItems.push(prediction.description);
        });
       }
     });
   });
  }
  chooseItem(item: any) {
	this.place = item;
	this.autocomplete.query = item;
    this.geoCode(item);
	this.autocompleteItems = [];
  }
//convert Address string to lat and long
  geoCode(address:any) {
    this.info = 'geocoding..';
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
    this.latlng = results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng();
	//this.shareService.setLAT( latitude);
	//this.shareService.setLNG(longitude);
	//let utc_offset: number = 0;
	//if(results[0].geometry.hasOwnProperty('utc_offset'))
		//utc_offset = results[0].geometry.utc_offset;
    this.horoService.getTimezone(results[0].geometry.location.lat(), results[0].geometry.location.lng(), (Math.round((new Date().getTime())/1000)).toString())
		.subscribe(res2 => {
		   this.tz = res2['timeZoneId'];
		   this.dstofset = res2['dstOffset'];
		   console.log(res2['timeZoneId']);
		   this.info = '';
		}, (err) => {
		  console.log(err);
		  this.info = err;
		}) ;

   });
 }
  chgtagline() {
   this.horoService.setAstTagline(this.device.uuid, this.tagline)
   .subscribe(res => {
   }, (err) => {
   });
  }
  chgstatus() {
   this.horoService.setAstStatus(this.device.uuid, (this.status == true) ? 'A' : 'NA')
   .subscribe(res => {
   }, (err) => {
   });
  }
  showDatePicker() {
	var dt = new Date();
	if(this.dob != '') {
		dt.setFullYear(Number(this.dob.split('-')[0]));
		dt.setMonth(Number(this.dob.split('-')[1])-1);
		dt.setDate(Number(this.dob.split('-')[2]));
	}
	this.datePicker.show({
	  date: dt,
	  mode: 'date',
	  androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
	}).then(
	  date => {
        this.dob = date.getFullYear().toString()+"-"+ (date.getMonth()+1).toString()+"-"+date.getDate().toString();
		this.year = date.getFullYear();
		this.mon = date.getMonth()+1;
		this.day = date.getDate();
      },
	  err => console.log('Error occurred while getting date: ', err)
	);
  }
 showTimePicker() {
	var dt = new Date();
	if(this.tob != '') {
		dt.setHours(Number(this.tob.split(':')[0]));
		dt.setMinutes(Number(this.tob.split(':')[1]));
	}
	this.datePicker.show({
	  date: dt,
	  mode: 'time',
	  androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
	}).then(
	  date => {
        this.tob = date.getHours().toString()+":"+date.getMinutes().toString();
		this.hou = date.getHours();
		this.min = date.getMinutes();
		this.sec = 0;
      },
	  err => console.log('Error occurred while getting date: ', err)
	);
 }
}
