import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service';
import * as AWS from 'aws-sdk';
declare var admob;

@Component({
  selector: 'app-publish-blog',
  templateUrl: './publish-blog.page.html',
  styleUrls: ['./publish-blog.page.scss'],
})
export class PublishBlogPage implements OnInit {
  title: string = '';
  story: string = '';
  img: string = null;
  info: string;
  name: string = '';
  avatar: string = '';
  showP: boolean = false;
  msg: string = '';
  cms: string = '';
  np: boolean = false;
  cp: boolean = false;

  constructor(private router: Router, public horoService: HoroscopeService, public shareService: ShareService, public platform: Platform, public device: Device, private camera: Camera, private filePath: FilePath, private file: File) { 
   this.platform.ready().then(() => {
	this.cms = 'https://cms.126news.com?uuid=' + this.device.uuid;
	this.info = 'Fetching your profile data, please wait..';
	this.horoService.getProfile(this.device.uuid)
	.subscribe(res => {
		this.info = '';
		this.showP = true;
		if(res['status'] == 'X') {
			this.np = true;
		} else {
			this.cp = true;
			this.avatar = res['avatar'];
			if(res['dob'].indexOf('#') > 0)
				this.name = res['dob'].split('#')[1].split('&')[0];
		}
	 }, (err) => {
		this.info = JSON.stringify(err);
	 });
	 this.horoService.getMsg(this.device.uuid, 'publishblog')
	 .subscribe(res => {
		this.msg = res['msg'];
	 }, (err) => {
		//this.info = JSON.stringify(err);
	 });
	});	 
}

  ngOnInit() {
   	  this.shareService.getPLAN()
		   .then(res => {
		if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.month' && res['name'] != 'com.mypubz.eportal.year') {
			//admob.setDevMode(true);
		admob.banner.show({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/5135174044',
			  ios: 'ca-app-pub-8442845715303800/5135174044',
			},
		  }).then(() => {
				setTimeout(() => {
				  admob.banner.hide({
					// replace with your ad unit IDs
					android: 'ca-app-pub-8442845715303800/5135174044',
					ios: 'ca-app-pub-8442845715303800/5135174044',
				  })
				}, 10000)
		  })
   		}
	 });
}
  save()
  {
	if(this.title.trim().length == 0) {
		this.info = 'Please enter subject line';
		return;
	}
	if(this.story.length == 0 || this.story.length < 500) {
		this.info = 'Please enter story minimum 500 characters';
		return;
	} else {
		this.showP = false;
		this.info = 'Please wait..';
		this.horoService.pubBlog(this.device.uuid, this.name, this.avatar, this.title.trim(), this.story.replace('\r\n', '<br/>'), this.img)
		.subscribe(res => {
			//this.showSU = false;
			if(res == '200') {
				this.info = '<span><strong>Congratulations!! your article is published successfully.</strong> Check your article in <a href="">Vedic Stories</a></span> ';
			} else {
			   this.info = 'There was some internal failure, we regret inconvinience. Please report to helpdesk.';
			   this.showP = true;
			}
		}, (err) => {
			this.info = JSON.stringify(err);
		});	  
	}
  }
  vstory() {
	  this.router.navigate(['/stories']);
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
          //let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          //let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
		  this.getImage(filePath);
        });
    } else {
      //var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      //var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
	  this.getImage(imagePath);
    }
  }, (err) => {
      this.info =  'Error while selecting image.';
  });
 }  
 getImage(ImagePath) {
	 console.log('crop', ImagePath);
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];
    this.info = 'Reading..';
    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      // Create an Image object, assign retrieved base64 image from 
         // the device photo library
         //let image : any        = new Image();
        // image.src 				= base64;
		 // Assign the Image object to the ImageCropper component 
		 this.info = 'Loading..';
         this.uploadImage(base64);
    }, error => {
      console.log('Error in showing image' + error);
    });	 
  }
  uploadImage(image) {
    return new Promise((resolve, reject) => {

      const body = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      const ext = image.split(';')[0].split('/')[1] || 'jpg';
      let date =  Date.now();
      let key = 'images/blog-126-' + date + '.jpg';

     this.s3Putimage({ body, mime: `image/${ext}` }, key, 'base64').then((result) => { 
					resolve(result); 
					console.log('aws', result);
					this.info = '';
					 this.img = 'https://126images.s3-us-east-2.amazonaws.com/' + result.toString();
				}).catch((err) => {
                    this.info = JSON.stringify(err);					
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
 // Create a new name for the image
 private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
 }
 profile() {
	this.router.navigate(['/profile']);
 }
}
