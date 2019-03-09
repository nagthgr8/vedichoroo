import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Camera } from '@ionic-native/camera';
import { Transfer, TransferObject, FileUploadResult  } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

import { HoroscopeService } from '../../app/horoscope.service';
/**
 * Generated class for the PublishBlogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@Component({
  selector: 'page-publish-blog',
  templateUrl: 'publish-blog.html',
})
export class PublishBlogPage {
  sub: any = '';
  msg: any = '';
  img: any = '';
  imglocal: string = null;
  info: string;
  showSU: boolean = false;
  uid: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public horoService: HoroscopeService, public platform: Platform, public device: Device, private camera: Camera, private transfer: Transfer, private filePath: FilePath, private file: File) {
	this.horoService.getAstrologer(this.device.uuid)
	.subscribe(res => {
	   this.info = '';
		if(res['status'] == 'X') {
			this.info = res['tagline'];
		} else {
		    this.showSU = true;
			this.uid = res['uid'];
		}
	}, (err) => {
		this.info = err;
	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublishBlogPage');
  }
  save()
  {
    console.log(this.sub);
	console.log(this.msg);
	console.log(this.img);
	if(this.sub.trim().length == 0) {
		this.info = 'Please enter subject line';
		return;
	}
	if(this.msg.trim().length == 0 || this.msg.trim().length < 500) {
		this.info = 'Please enter story minimum 500 characters';
		return;
	} else {
	    this.showSU = false;
		this.info = 'Please wait..';
		this.horoService.pubBlog(this.uid, this.sub, this.msg, this.img)
		.subscribe(res => {
			//this.showSU = false;
			//if(res == 'success') {
				this.info = JSON.stringify(res);
			//} else {
			  // this.info = 'There was some internal failure, we regret inconvinience. Please report to helpdesk.';
			//}
		}, (err) => {
			this.info = JSON.stringify(err);
		});	  
	}
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
          this.cpyNupload(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.cpyNupload(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
      this.info =  'Error while selecting image.';
  });
 }  
 // Create a new name for the image
 private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
 }
 
 // Copy the image to a local folder
 private cpyNupload(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.imglocal = newFileName;
    if(this.showSU) this.uploadImage();
  }, error => {
    this.info = 'Error while storing file.';
  });
 }
  
 // Always get the accurate path to your apps folder
 public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
 }
 public uploadImage() {
  // Destination URL
  var url = "http://ec2-13-228-11-53.ap-southeast-1.compute.amazonaws.com:3000/photos/upload";
 
  // File for Upload
  var targetPath = this.pathForImage(this.imglocal);
 
  // File name only
  var filename = this.imglocal;
 
  var options = {
    fileKey: "media",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename, 'name': filename}
  };
 
  const fileTransfer: TransferObject = this.transfer.create();
 
  //this.loading = this.loadingCtrl.create({
    //content: 'Uploading...',
  //});
  //this.loading.present();
  this.info = 'Uploading...';
  // Use the FileTransfer to upload the image
  console.log(targetPath, url);
  fileTransfer.upload(targetPath, url, options).then(result => {
     let robj = JSON.parse(result["response"]);
	 this.img = robj.path;
    //this.loading.dismissAll()
	//if (files.indexOf("failed") >= 0)
	//	this.info = files;
	//else
	  // this.img = files[0];
	  this.info = 'File uploaded successfully.';
	  console.log(JSON.stringify(result));
  }, (err) => {
    //this.loading.dismissAll()
	console.log(err);
    this.info = 'Error while uploading file.';
  });
 } 
  
}
