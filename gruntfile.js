// Grunt

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

  //  Config
    pkg: grunt.file.readJSON('package.json')
   ,dir: {
      theme: 'web/content/themes/tm_engage'  // <%= dir.theme %>/
     ,plugin: 'web/content/plugins'  // <%= dir.plugin %>/
   }
  //  Build Site

   ,watch: {
      less: {
        files: ['<%= dir.theme %>/sass/**/*']
       ,tasks: ['recess']
      }
     ,image: {
        files: ['<%= dir.theme %>/gui/**/*']
      }
     ,theme: {
        files: ['<%= dir.theme %>/**/*.php']
      }
     ,plugin: {
        files: ['<%= dir.plugin %>/*']
      }
     ,options: {
        livereload: true
      }
    }

  // Compile

	 ,sass: {
     theme: {
      options: {
        sourceMap: true
      },
      files: {
        '<%= dir.theme %>/style.css': ['<%= dir.theme %>/sass/style.scss']
      }
    }
  }

  // Validate

   ,htmlhint: {
      options: {
        'tag-pair': true
       ,'tagname-lowercase': true
       ,'attr-lowercase': true
       ,'attr-value-double-quotes': true
       ,'doctype-first': true
       ,'spec-char-escape': true
       ,'id-unique': true
       ,'head-script-disabled': true
       ,'style-disabled': true
       ,'src-not-empty': true
       ,'img-alt-require': true
      },
      theme: {
        src: ['<%= dir.theme %>/**/*.php']
      }

    }

   ,csslint: {
      options: {
        'adjoining-classes': false
       ,'box-model': false
       ,'box-sizing': false
       ,'regex-selectors': false
       ,'universal-selector': false
       ,'unqualified-attributes': false
       ,'font-sizes': false  //  Until CSSLint has the option to set an amount
      },
      src: [
        '<%= dir.theme %>/style.css'
       ,'<%= dir.theme %>/rtl.css'
      ]
    }

   ,cssmetrics: {
      theme: {
        src: [
          '<%= dir.theme %>/style.css'
         ,'<%= dir.theme %>/rtl.css'
        ]
       ,options: {
          quiet: false
         ,maxSelectors: 4096
         ,maxFileSize: 10240000
        }
      }
    }

   ,jshint: {
      options: {
        browser: true
       ,curly: true
       ,eqeqeq: true
       ,eqnull: true
       ,indent: 2
       ,laxbreak: true
       ,laxcomma: true
       ,quotmark: 'single'
       ,trailing: true
       ,undef: true
       ,globals: {
          console: true
         ,module: true
         ,jQuery: true
         ,'wp': false
        }
      },
      src: [
      	'gruntfile.js',
      	'<%= dir.theme %>/js/*.js'
    	]
    }

    ,phpcs: {
      theme: {
        dir: ['<%= dir.theme %>/**/*.php']
       ,options: {
          standard: '<%= dir.theme %>/codesniffer.ruleset.xml'
        }
      }
     ,options: {
        bin: 'phpcs'
      }
    }

   ,phplint: {
      theme: ['<%= dir.theme %>/**/*.php']
     ,plugin: ['<%= dir.plugin %>/**/*.php']
    }

  // Optimise

   ,imagemin: {
      options: {
        optimizationLevel: 3
      }
     ,production: {
        files: [{
          expand: true
         ,cwd: '<%= dir.theme %>/images'
         ,src: ['**/*.{png,jpg,gif,svg}']
         ,dest: '<%= dir.theme %>/images'
        }]
      }
    }

  });

  // Tasks

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-css-metrics');
  grunt.loadNpmTasks('grunt-phpcs');
  grunt.loadNpmTasks('grunt-phplint');
  grunt.loadNpmTasks('grunt-sass');

  // Options

  grunt.registerTask('default', ['sass', 'serve']);
  grunt.registerTask('test', ['cssmetrics', 'csslint', 'jshint']);
  grunt.registerTask('standard', ['phplint']);
  grunt.registerTask('optim', ['imagemin']);
  grunt.registerTask('dev', ['sass']);
  grunt.registerTask('build', ['sass', 'optim']);
  grunt.registerTask('serve', ['watch']);

};
