import Component from '@glimmer/component';
import { action } from '@ember/object';


export default class CmsListItemComponent extends Component {

  @action
  viewMore() {
    this.args.viewMore()
  }

  @action
  edit() {
    this.args.edit()
  }


}

\