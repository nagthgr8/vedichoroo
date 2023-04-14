import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { HoroscopeService } from '../horoscope.service';
import { CallService } from '../call.service';
import { ShareService } from '../share.service';
import { Device } from '@ionic-native/device/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { Rating } from '../rating';
import { User } from '../user';
import { Location } from '../location';
import * as AWS from 'aws-sdk';

declare var google; 
/**
 * Generated class for the astrologer page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'app-astrologer',
  templateUrl: './astrologer.page.html',
  styleUrls: ['./astrologer.page.scss'],
})

export class AstrologerPage {
  public data               : any;
	str1: string = 'star-outline';
	str2: string = 'star-outline';
	str3: string = 'star-outline';
	str4: string = 'star-outline';
	str5: string = 'star-outline';
	rating: number = null;
	urat: Rating = {
		uuid: null,
		name: null,
		pid: null,
		rating: null,
		review: null,
		avatar: null,
		str1: 'star-outline',
		str2: 'star-outline',
		str3: 'star-outline',
		str4: 'star-outline',
		str5: 'star-outline'
	};
  ast: any;
  showASU: boolean = false;
  info: string = '';
  bio: string = '';
  walnk: string = '';
  showP: boolean = false;
  showPUJ: boolean = false;
  edit: boolean = false;
    cropOptions: CropOptions = {
    quality: 50
  }
  oRev: Rating[] = [];
  objectKeys = Object.keys;
  showRVW: boolean = false;
  rated: boolean = false;
  constructor(private platform: Platform, private router: Router, private horoService: HoroscopeService, private callService: CallService, private shareService: ShareService, public device: Device, private camera: Camera, private crop: Crop, private filePath: FilePath, private file: File) {
	console.log('AstrologerPage: Constructor called');
  }
ngOnInit()
{
	this.info = 'Loading..';
	this.data = {};
	this.ast = this.router.getCurrentNavigation().extras.state;
	if(this.ast.uid == 'sankethsharma') this.showPUJ = true;
	this.urat.uuid = this.device.uuid;
	this.urat.pid = this.ast.uid;
	this.shareService.getUPRO().then( upro => {
		if(upro) {
			this.info = '';
			this.urat.avatar = upro['avatar'];
			if(upro['dob'].indexOf('#') > -1) {
				var ng = upro['dob'].split('#')[1];
				this.urat.name = ng.split('&')[0];
			}
		} else {
			this.horoService.getProfile(this.device.uuid)
			.subscribe(res => {
				this.info = '';
				this.urat.avatar = res['avatar'];
				if(res['dob'].indexOf('#') > -1) {
					var ng = res['dob'].split('#')[1];
					this.urat.name = ng.split('&')[0];
				}
			});
		}
	});
	if(this.device.uuid == this.ast.uuid) {
		console.log('edit', 'true');
		this.edit = true;
	}
	this.walnk = this.ast.walnk;
    this.showASU = this.ast.isavailable;
		this.horoService.getAstroBio(this.ast.uid)
		.subscribe(res => {
		   this.info = '';
		   this.showP = true;
		   if(res['bio'] != 'Not Available') this.bio = res['bio'];
		  this.data.image= res['banner'];
		},(err) => {
		  this.info = err;
		});
	this.horoService.getReviews(this.ast.uid)
		.subscribe(rvws => {
					for(var i = 0; i < (rvws as any).length; i++) {
						if(rvws[i].uuid == this.device.uuid) {
							this.urat.rating = rvws[i].rating;
							this.urat.avatar = rvws[i].avatar;
							this.urat.review = rvws[i].review;
							if(this.urat.rating > 0) {
								this.rated = true;
								//updatestrs(this.urat.rating);
							}
						}
						if(rvws[i].review != '') {
							let r : Rating = {
							  uuid: rvws[i].uuid,
							  name: rvws[i].name,
							  pid: rvws[i].pid,
							  avatar: rvws[i].avatar,
							  rating: rvws[i].rating,
							  review: rvws[i].review,
							  str1: 'star-outline',
							  str2: 'str-outline',
							  str3: 'str-outline',
							  str4: 'str-outline',
							  str5: 'str-outline'
							};
							switch(rvws[i].rating) 
							{
								case 1:
								   r.str1 = 'star';
								   r.str2 = 'star-outline';
								   r.str3 = 'star-outline';
								   r.str4 = 'star-outline';
								   r.str5 = 'star-outline';
								   if(rvws[i].uuid == this.device.uuid) {
									   this.urat.str1 = 'star';
									   this.urat.str2 = 'star-outline';
									   this.urat.str3 = 'star-outline';
									   this.urat.str4 = 'star-outline';
									   this.urat.str5 = 'star-outline';
								   }
								   break;
								case 2:
								   r.str1 = 'star';
								   r.str2 = 'star';
								   r.str3 = 'star-outline';
								   r.str4 = 'star-outline';
								   r.str5 = 'star-outline';
								   if(rvws[i].uuid == this.device.uuid) {
									   this.urat.str1 = 'star';
									   this.urat.str2 = 'star';
									   this.urat.str3 = 'star-outline';
									   this.urat.str4 = 'star-outline';
									   this.urat.str5 = 'star-outline';
								   }
								   break;
								case 3:
								   r.str1 = 'star';
								   r.str2 = 'star';
								   r.str3 = 'star';
								   r.str4 = 'star-outline';
								   r.str5 = 'star-outline';
								   if(rvws[i].uuid == this.device.uuid) {
									   this.urat.str1 = 'star';
									   this.urat.str2 = 'star';
									   this.urat.str3 = 'star';
									   this.urat.str4 = 'star-outline';
									   this.urat.str5 = 'star-outline';
								   }
								   break;
								case 4:
								   r.str1 = 'star';
								   r.str2 = 'star';
								   r.str3 = 'star';
								   r.str4 = 'star';
								   r.str5 = 'star-outline';
								   if(rvws[i].uuid == this.device.uuid) {
									   this.urat.str1 = 'star';
									   this.urat.str2 = 'star';
									   this.urat.str3 = 'star';
									   this.urat.str4 = 'star';
									   this.urat.str5 = 'star';
								   }
								   break;
								case 5:
								   r.str1 = 'star';
								   r.str2 = 'star';
								   r.str3 = 'star';
								   r.str4 = 'star';
								   r.str5 = 'star';
								   if(rvws[i].uuid == this.device.uuid) {
									   this.urat.str1 = 'star';
									   this.urat.str2 = 'star';
									   this.urat.str3 = 'star';
									   this.urat.str4 = 'star';
									   this.urat.str5 = 'star';
								   }
								   break;
								 default:
									break;
							}
							this.oRev[i] = r;
						}
					}
			        if(this.oRev.length > 0) this.showRVW = true;
		});
//	this.horoService.getRating(this.ast.uid)
//		.subscribe(res => {
//			this.rating = res['rating'];
//		});
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AstrologerPage');
	//if(this.showBLG == false) {
	//}
  }
	async callreq(evt) {
	  //console.log('ast', ast);
	  evt.stopPropagation();
	  //check balance, if is insufficient invoke the recharge dialog 
	  let user: User = await this.shareService.getItem('user') as User;
	  if(!user) { this.shareService.setGEVT('login'); return; }
	  else if(user.dob == ''){
	      this.shareService.setGEVT('dob');
	  } else {
	    console.log('user', user);
		this.horoService.getBalance(user.email).subscribe((res) => {	
		  //if(res['balance'] > 0) {
		  // Parse the astrologer's fee from the string format
		   this.shareService.getItem('vho:loc').then((loc: Location) => {
			this.getMinBal(this.ast.cfee, this.ast.ccy, loc.country_code).then(minBal => {
				//const estimatedCallCost = astrologerFeePerMinute*5; //minimum 5 minutes of balance is required;
				//if (user.balance >= minBal) {
			this.callService.callAstro(this.ast.eml, this.ast.name, this.ast.avatar, user.email, user.dob, (user.isprivate) ? 'https://i.imgur.com/LR7e1vw.png' : user.imageUrl).then(() => {
							   
							});
				//} else {
							//display recharge dialog
				//	this.shareService.setGEVT('recharge');
				//}
			});
		   });
		// } else {
			// if(res['balance'] == 0) {
				// this.shareService.setGEVT('recharge');
			// } else {
				// alert('Our server did not respond, please try afer sometime.');
			// }
	    // }
	}, (err) => {
		      console.log(JSON.stringify(err));
	}); 
	
     }
	  
	}
    async getMinBal(fee: string, ccy: string, ccode: string): Promise<number> {
	  const res = await this.horoService.getCurrencyExchangeRate(ccode, ccy);

	  const [price,per,unit] = fee.split(' ');

	  let rate: number;
	  if (per === 'per' && (unit === 'min' || unit === 'minute')) {
		rate = Number(price) * res['ConversionRate'] * 5;
	  } else if (per === 'per' && unit === 'hour') {
		rate = Number(price) * res['ConversionRate'];
	  } else {
		rate = parseFloat(price);
	  }
	  return rate;
	} 
	public uploadPic() {
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
          this.showCroppedImage(newPath.split('?')[0])
        },
        error => {
          alert('Error cropping image' + error);
        }
      );
  }
    showCroppedImage(ImagePath) {
    //this.isLoading = true;
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.data.image = base64;
      //this.isLoading = false;
	  this.uploadImage(this.data.image);
    }, error => {
      alert('Error in showing image' + error);
      //this.isLoading = false;
    });
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
					//this.avatar = 'https://vedichoroo.s3-ap-southeast-1.amazonaws.com/' + result.toString();
					this.info = 'Saving the profile..';
					this.horoService.setProfileBnr(this.device.uuid, 'https://vhoimages.s3-us-east-1.amazonaws.com/' + result.toString())
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
   s3Putimage(file, key, encoding){
    return new Promise((resolve, reject) => {
      AWS.config.accessKeyId = 'AKIA3CSAFOUNKLLKS7OY';
      AWS.config.secretAccessKey = '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';
      AWS.config.region = 'us-east-1';
      AWS.config.signatureVersion = 'v4';
      let s3 = new AWS.S3();
      
      const params = {
        Body: file.body,
        Bucket: 'vhoimages',
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
  }  
  edtbio() {
	  this.edit = true;
  }
  save() {
 					this.info = 'Saving the profile..';
					this.horoService.setProfileBio(this.device.uuid, this.bio)
						.subscribe(res => {
							this.info = '';
							this.edit = false;
						}, (err) => {
							this.info = err;
						});
 }	  
 opuja(event) {
	 event.stopPropagation();
	 this.router.navigate(['/pujalist'], {state: this.ast});
 }
 	stars(evt, s) {
		evt.stopPropagation();
	  if(s != this.rating) {
		this.urat.rating = s;
		this.updatestrs(s);
		  this.horoService.userRating(this.device.uuid, this.urat.name, this.urat.avatar, this.ast.uid, s)
			   .subscribe(res => {
				 console.log('rating', res['rating']);
				this.rating = res['rating'];
				console.log('rating updated to server');
				}, (err) => {
				});
	  }
		//else this.racmt = 'Please Tell Us How We Can Improve';
		//if(this.plan.rating != s) this.rat = true;
	}
	updatestrs(s) {
			switch(s) 
			{
				case 1:
				   this.str1 = 'star';
				   this.str2 = 'star-outline';
				   this.str3 = 'star-outline';
				   this.str4 = 'star-outline';
				   this.str5 = 'star-outline';
				   break;
				case 2:
				   this.str1 = 'star';
				   this.str2 = 'star';
				   this.str3 = 'star-outline';
				   this.str4 = 'star-outline';
				   this.str5 = 'star-outline';
				   break;
				case 3:
				   this.str1 = 'star';
				   this.str2 = 'star';
				   this.str3 = 'star';
				   this.str4 = 'star-outline';
				   this.str5 = 'star-outline';
				   break;
				case 4:
				   this.str1 = 'star';
				   this.str2 = 'star';
				   this.str3 = 'star';
				   this.str4 = 'star';
				   this.str5 = 'star-outline';
				   break;
				case 5:
				   this.str1 = 'star';
				   this.str2 = 'star';
				   this.str3 = 'star';
				   this.str4 = 'star';
				   this.str5 = 'star';
				   break;
				 default:
					break;
			}
	}
    wrev(event) {
		event.stopPropagation();
		this.router.navigate(['/ratings'], {state : this.urat});
	}
}
