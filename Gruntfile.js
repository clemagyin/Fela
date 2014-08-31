'use strict'

module.exports = function(grunt) {


  /*
  Directory configuration
  */
  var dirs = {
    tmp     : '.tmp',
    src     : 'src',
    build   : 'build',
    assets  : '/assets',
    bower   : grunt.file.readJSON('.bowerrc').directory,
    sass    : '<%= dir.assets %>/_scss',
    css     : '<%= dir.assets %>/css',
    js      : '<%= dir.assets %>/js',
    images  : '<%= dir.assets %>/images',
    fonts   : '<%= dir.assets %>/fonts'
  };


  /*
  Grunt configuration
  */
  grunt.initConfig({
    dir: dirs,

    pkg : grunt.file.readJSON('package.json'),

    tag : {
      banner: '/*!\n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.description %>\n' +
              ' * <%= pkg.url %>\n' +
              ' * @author <%= pkg.author.name %> <%= pkg.author.url %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
              ' */\n'
    },


    /**
     * Clean temporarys and assets directories before release
     */
    clean : {
      build: {
        files : [{
          dot : true,
          src : [
            '.sass-cache',
            '<%= dir.tmp %>',
            'build'
          ]
        }]
      },
      release : {
        files : [{
          dot : true,
          src : [
            'assets',
            '[partials',
            '*.hbs']
        }]
      }
    },

    /*
    Copy all prepped files to either build folder or release folder
    */
    copy: {
      build: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%=dir.src%>',
            src: [
              '*.{ico,png,md,hbs}',
              'partials/**/*',
              '<%= dir.images %>/*',
              '<%= dir.fonts %>/**/*'
            ],
            dest: '<%=dir.build%>'
          },
          {
            expand: true,
            flatten: true,
            cwd: '<%=dir.bower%>',
            src: [
              '**/font*/*.{svg,eot*,ttf,woff,otf}'
            ],
            dest: '<%=dir.build%><%=dir.fonts%>',
            filter: 'isFile'
          }]
      },
      release: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= dir.build %>',
          src: ['**'],
          dest: ''
        }]
      }
    },


    /**
     * Compile Sass/SCSS files
     * Compiles all Sass/SCSS files
     */
    sass: {
      build: {
        options: {
          style: 'compressed',
          compass: true
        },
        files: [{
          expand: true,
          cwd: '<%= dir.src %><%= dir.sass %>',
          src: '*.{sass,scss}',
          dest: '<%= dir.tmp %><%= dir.css %>',
          ext: '.css'
        }]
      }
    } 

  });



  //Load Grunt plugins
  require('load-grunt-tasks')(grunt);
  
  /*
  TASKS
  */
  grunt.registerTask('build', 'Compile and compress everything to build folder', [
    'clean:build',
    'sass:build',
    'copy:build']);

  grunt.registerTask('dev build', 'Compile and compress all files to assets folder', [
    'clean:build',
    'sass:build',
    'copy:build']);
};