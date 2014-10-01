var includesDir = '../main/webapp/WEB-INF/views/includes/';
var minDir = '../main/webapp/resources/tsb/min/';

module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		concat: {
			js: {
			     src:[ '../main/webapp/resources/vendor/JSON/*.js',
	                   '../main/webapp/resources/vendor/image_upload/jquery-1.10.1.min.js',
	                   '../main/webapp/resources/vendor/image_upload/jquery-ui-1.10.2.min.js',
	                   '../main/webapp/resources/vendor/angular/*.js',
	                      
	                   '../main/webapp/resources/vendor/image_upload/jquery.ui.widget.js',
	                   '../main/webapp/resources/vendor/image_upload/jquery.iframe-transport.js',
	                   '../main/webapp/resources/vendor/image_upload/jquery.fileupload.js',
	                   '../main/webapp/resources/vendor/image_upload/jquery.fileupload-process.js',
	                      
	                   '../main/webapp/resources/vendor/image_upload/blueimp/*.js',
	                   '../main/webapp/resources/vendor/image_upload/addons/*.js',
	                   '../main/webapp/resources/tsb/js/tsb.js',
	                   '../main/webapp/resources/tsb/js/controllers/*.js',
	                   '../main/webapp/resources/tsb/js/directives/*.js',                     
	                   '../main/webapp/resources/tsb/js/services/*.js'
	                  ],
				dest: minDir + '/tsb.' +  (new Date()).getTime() +'.js'
			}
			, css: {
				src:[
					'../main/webapp/resources/tsb/css_sbac/**/*.css',
					'../main/webapp/resources/tsb/css/**/*.css'],
				dest: minDir + '/tsb.' +  (new Date()).getTime() +'.css'
			}
		}
		, jspinclude : {
			template:'templates/jsppage.us',
			dev:{
				dest:includesDir + 'exploded/js-includes.jsp',
				context:{
					js:'<%= concat.js.src %>'
				}
			},
			prod:{
				dest:includesDir + 'min/js-includes.jsp',
				context:{
					js:'<%= concat.js.dest %>'
				}
			}
		}
		, cssinclude : {
			template:'templates/csspage.us',
			dev:{
				dest:includesDir+'exploded/css-includes.jsp',
				context:{
					css:'<%= concat.css.src %>'
				}
			},
			prod:{
				dest:includesDir + 'min/css-includes.jsp',
				context:{
					css:'<%= concat.css.dest %>'
				}
			}
		},
		
		clean: {
		    folder: minDir
		},
		
		jshint: {
			    all: ['Gruntfile.js',
			          '../main/webapp/resources/tsb/js/tsb.js',
			          '../main/webapp/resources/tsb/js/controllers/*.js',
			          '../main/webapp/resources/tsb/js/directives/*.js',
			          '../main/webapp/resources/tsb/js/services/*.js'
				      ]
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadTasks("tasks");
	grunt.registerTask("default",["clean", "concat", "jspinclude:dev" , "cssinclude:dev" , "jspinclude:prod","cssinclude:prod"]);
	//,"jshint"
};
