module.exports = function(grunt) {

  grunt.initConfig({
    project: {
      app: require('./bower.json').appPath || 'app',
      dist: 'build'
    },
    connect: {
      options: {
        port: 9001,
        livereload: 35729
      },
      dev: {
        options: {
          base: '<%= project.app %>'
        }
      }
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: false
        },
        files: {
          '<%= project.app %>/styles/css/style.css': '<%= project.app %>/styles/scss/main.scss'
        }
      }
    },
    watch: {
      configFiles: {
        files: ['Gruntfile.js'],
        options: {
          reload: true
        }
      },
      html: {
        files: ['<%= project.app %>/*.html'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      css: {
        files: ['<%= project.app %>/styles/scss/**/*.{scss,sass}'],
        tasks: ['sass:dev'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 'Shortcut to lauch dev static server', ['serve:dev']);

  grunt.registerTask('serve', 'Launch static server', ['sass:dev', 'connect:dev', 'watch']);
};
