import Component from '@glimmer/component';
import { action } from '@ember/object';


export default class CmsListItemComponent extends Component {

  @action
  primaryAction() {
    this.args.primaryAction()
  }

  @action
  secondaryAction() {
    this.args.secondaryAction()
  }


}

