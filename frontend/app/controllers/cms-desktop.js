import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import { inject } from '@ember/service';

export default class CmsDesktopController extends Controller {

  createCourseModal = false;
  editCourseModal = false;
  createModuleModal = false;
  selectedCourse;
  selectedModule;
  selectedLesson;

  myEditCourse;

  @inject
  notify;

  @inject
  me;

  @computed('name')
  get courseSlug() {
    //return "slugr";
    return name.replace(/\s/g, "-");
  }

  @computed()
  get allModules() {
    return this.store.findAll('module');
  }

  @computed()
  get allLessons() {
    return this.store.findAll('lesson');
  }


  get coursemodel() {
    return this.store.createRecord('course', {
      creator: this.me.get('user')
    });
  }



  get modulemodel() {
    return this.store.createRecord('module', {
      creator: this.me.get('user')
    });
  }


  @action
  addModule(mod) {
    this.selectedCourse.get('modules').pushObject(mod);
    this.set('selectedModule', null);
    this.selectedCourse.save();
  }




  @action
  showCourseModal() {
    this.set('createCourseModal', true);

  }
  @action
  hideCourseModal() {
    this.set('createCourseModal', false);

  }

  @action
  hideEditCourseModal() {
    this.set("editCourseModal", false);

  }

  @action
  showEditCourseModal() {
    this.set("editCourseModal", true);

  }

  @action
  toggleModuleModal() {
    this.toggleProperty('createModuleModal');

  }

  @action
  async selectCourse(course_slug) {
    this.set("selectedModule", null);
    this.set("selectedLesson", null);


    console.log("slug");
    console.log(course_slug);
    let _selectedCourse = await this.store.findBySlug('course', course_slug);
    console.log(_selectedCourse);
    this.set("selectedCourse", _selectedCourse);

  }


  @action
  async editCourseClick(course_slug) {
    let course_model = await this.store.findBySlug('course', course_slug)
    this.set("myEditCourse", course_model)
    this.set("editCourseModal", true);

  }

  @action
  async selectModule(module_slug) {
    this.set("selectedLesson", null);
    let _selectedModule = await this.store.findBySlug('module', module_slug);
    this.set("selectedModule", _selectedModule);

  }

  @action
  saveCourse(model) {
    // console.log(model.name);
    let slug = model.name.replace(/\s/g, "-");
    model.setProperties({
      slug: slug,
      status: "published",
    });

    model.save();
    // this.set("editCourseModal", false);
    // this.set("createCourseModal", false);
    //this.notify.info('Course Saved');

  }

  @action
  deleteCourse(model) {
    model.destroyRecord();
  }


  @action
  saveModule(model) {
    console.log(model.name);
    let slug = model.name.replace(/\s/g, "-");
    model.setProperties({
      slug: slug,
      status: "published"
    });
    model.save();
  }

  @action
  async selectLesson(lesson_slug) {
    let _selectedLesson = await this.store.findBySlug('lesson', lesson_slug);
    this.set("selectedLesson", _selectedLesson);

  }




  @computed()
  get allCourses() {
    return this.store.findAll('course');
  }



  @action
  submit() {
    console.log();
    // this.get('Modal').open('plain');
  }

  @action
  close() {
    console.log();
  }

}
