import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import UserValidation from '../validations/user';

export default class SignupController extends Controller {

  @inject
  me;

  queryParams = ['invite_code'];


  UserValidation = UserValidation;

  @action
  signupSuccess() {
    // this.transitionToRoute('upload');

    this.transitionToRoute('profile-image-upload', { queryParams: { signup: 'true' } });
  }

}
