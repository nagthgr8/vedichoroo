import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { HoroscopeService } from '../horoscope.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import * as AWS from 'aws-sdk';

declare var google; 
/**
 * Generated class for the BmvsivaPage page.
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
  ast: any;
  showASU: boolean = false;
  info: string = '';
  bio: string = '';
  walnk: string = '';
  showP: boolean = false;
  edit: boolean = false;
    cropOptions: CropOptions = {
    quality: 50
  }
  constructor(private platform: Platform, private router: Router, private callNumber: CallNumber, private horoService: HoroscopeService, public device: Device, private camera: Camera, private crop: Crop, private filePath: FilePath, private file: File) {
	console.log('AstrologerPage: Constructor called');
  }
ngOnInit()
{
	this.info = 'Loading..';
	this.data = {};
	this.ast = this.router.getCurrentNavigation().extras.state;
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
		  this.bio = res['bio'];
		  this.data.image= res['banner'];
		},(err) => {
		  this.info = err;
		});
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AstrologerPage');
	//if(this.showBLG == false) {
	//}
  }
callreq(event) {	
     event.stopPropagation();
     console.log(this.ast.mob);
	 this.callNumber.callNumber(this.ast.mob, true)
		.then(res => console.log('Launched dialer!', res))
		.catch(err => console.log('Error launching dialer', err));
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
					this.horoService.setProfileBnr(this.device.uuid, 'https://126images.s3-us-east-2.amazonaws.com/' + result.toString())
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
}
