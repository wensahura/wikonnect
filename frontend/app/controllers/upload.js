import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Uploader from '../utils/uploader';




export default class UploadController extends Controller {
  @inject
  me

  @inject
  store;


  @tracked
  name;

  stage = "init";

  bg_color = "ff0000";
  text_color = "ffffff";

  @tracked thumbnail = this.bg_thumbnail(this.text_color, this.bg_color, this.name);


  @action
  next() {
    console.log(this.getProperties())
    console.log(this.name)
    this.set('stage', "thumbnail");


  }

  bg_thumbnail(text_color, bg_color, name) {

    return "http://placehold.jp/20/" + bg_color + "/" + text_color + "/440x280.png?text=" + name;
  }


  @action
  submit() {

  }

  @action
  async uploadPic(files) {


    const uploader = Uploader.create({
      file: files[0],
      filename: files[0].name,
    });

    this.set('uploader', uploader);

    const host = '/' + this.store.adapterFor('application').urlPrefix();
    console.log("host");
    console.log(host);

    const uploadRes = await uploader.startUpload([host, 'users', this.me.user.id, 'profile-image'].join('/'));
    console.log("uploadRes");
    console.log(uploadRes.path);
    console.log("http://localhost:3000/" + uploadRes.path);

    this.set("thumbnail", "http://localhost:3000/" + uploadRes.path);
    this.set("complete", true);


    //upload
  }


  @action
  async fileAdded(files) {


    const uploader = Uploader.create({
      file: files[0],
      filename: files[0].name,
    });

    this.set('uploader', uploader);

    const host = '/' + this.store.adapterFor('application').urlPrefix();
    console.log("host");
    console.log(host);

    const uploadRes = await uploader.startUpload([host, 'users', this.me.user.id, 'profile-image'].join('/'));
    console.log("uploadRes");
    console.log(uploadRes.path);
    console.log("http://localhost:3000/" + uploadRes.path);

    this.set("profileImage", "http://localhost:3000/" + uploadRes.path);
    this.set("complete", true);


    //upload
  }
} 
