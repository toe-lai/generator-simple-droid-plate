'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the mathematical ' + chalk.red('generator-test') + ' generator!'
    ));

    var prompts = [{
      name: 'app_name',
      message: 'app_name?',
      store: true,
      default: this.appname,
      validate: function (input) {
        if (/^([a-zA-Z0-9_]*)$/.test(input)) {
          return true;
        }
        return 'Your application name cannot contain special characters or a blank space, using the default name instead : ' + this.appname;
      }
    }, {
      name: 'app_package',
      message: 'app_package?',
      validate: function (input) {
        if (/^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input)) {
          return true;
        }
        return 'The package name you have provided is not a valid Java package name.';
      },
      default: 'com.toelie.sample',
      store: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    // this.fs.copy(
    //   this.templatePath('dummyfile.txt'),
    //   this.destinationPath('dummyfile.txt')
    // );

    // this.fs.copyTpl(
    //   this.templatePath('index.html'),
    //   this.destinationPath('public/index.html'),
    //   { title: 'Welcome to Templating with Yeoman' }
    // );


    var sourceProjectName = "LittdroidTemplate";

    var packageDir = this.props.app_package.replace(/\./g, '/');
    mkdirp('app');
    mkdirp('app/src/androidTest/java/' + packageDir);
    mkdirp('app/src/main/java/' + packageDir);
    mkdirp('app/src/test/java/' + packageDir);

    this.fs.copy(this.sourceRoot() + '/' + sourceProjectName + '/gradle', 'gradle');
    this.fs.copy(this.sourceRoot() + '/' + sourceProjectName + '/app/src/main/res', 'app/src/main/res');

    this.fs.copy(this.sourceRoot() + '/' + sourceProjectName + '/.gitignore', '.gitignore');
    this.fs.copy(this.sourceRoot() + '/' + sourceProjectName + '/build.gradle', 'build.gradle');
    this.fs.copy(this.sourceRoot() + '/' + sourceProjectName + '/gradle.properties', 'gradle.properties');
    this.fs.copy(this.sourceRoot() + '/' + sourceProjectName + '/gradlew', 'gradlew');
    this.fs.copy(this.sourceRoot() + '/' + sourceProjectName + '/gradlew.bat', 'gradlew.bat');
    this.fs.copy(this.sourceRoot() + '/' + sourceProjectName + '/settings.gradle', 'settings.gradle');
    this.fs.copy(this.sourceRoot() + '/' + sourceProjectName + '/app/.gitignore', 'app/.gitignore');
    this.fs.copy(this.sourceRoot() + '/' + sourceProjectName + '/app/proguard-rules.pro', 'app/proguard-rules.pro');

    this.fs.copyTpl(this.sourceRoot() + '/' + sourceProjectName + '/app/build.gradle', 'app/build.gradle', this.props);
    this.fs.copyTpl(this.sourceRoot() + '/' + sourceProjectName + '/app/src/androidTest/java/com/toelie/tools/littdroidtemplate', 'app/src/androidTest/java/' + packageDir, this.props);
    this.fs.copyTpl(this.sourceRoot() + '/' + sourceProjectName + '/app/src/main/java/com/toelie/tools/littdroidtemplate', 'app/src/main/java/' + packageDir, this.props);
    this.fs.copyTpl(this.sourceRoot() + '/' + sourceProjectName + '/app/src/test/java/com/toelie/tools/littdroidtemplate', 'app/src/test/java/' + packageDir, this.props);
    this.fs.copyTpl(this.sourceRoot() + '/' + sourceProjectName + '/app/src/main/AndroidManifest.xml', 'app/src/main/AndroidManifest.xml', this.props);
    this.fs.copyTpl(this.sourceRoot() + '/' + sourceProjectName + '/app/src/main/res/values', 'app/src/main/res/values', this.props);
    this.fs.copyTpl(this.sourceRoot() + '/' + sourceProjectName + '/app/src/main/res/values-v21', 'app/src/main/res/values-v21', this.props);
    this.fs.copyTpl(this.sourceRoot() + '/' + sourceProjectName + '/app/src/main/res/layout', 'app/src/main/res/layout', this.props);

  },

//  install: function () {
//    this.installDependencies();
//  }
});
