var srcHome = '../../main/webapp/resources/';

module.exports = function(config) {
	config.set({

		basePath : '../',

		frameworks : [ 'jasmine' ],

		files : [ srcHome + 'vendor/JSON/json2.js',
                srcHome + 'vendor/image_upload/jquery-1.10.1.min.js',
                srcHome + 'vendor/image_upload/jquery-ui-1.10.2.min.js',
                srcHome + 'vendor/angular/*.js',

                srcHome + 'vendor/image_upload/jquery.ui.widget.js',
                srcHome + 'vendor/image_upload/jquery.iframe-transport.js',
                srcHome + 'vendor/image_upload/jquery.fileupload.js',
                srcHome + 'vendor/image_upload/jquery.fileupload-process.js',

                srcHome + 'vendor/image_upload/blueimp/*.js',
                srcHome + 'vendor/image_upload/addons/*.js',
                
                srcHome + 'vendor/spec/jasmine-jquery.js',

                srcHome + 'tsb/js/tsb.js',
                srcHome + 'tsb/js/controllers/*.js',
                srcHome + 'tsb/js/directives/*.js',
                srcHome + 'tsb/js/services/*.js',
                srcHome + 'jasmine/spec/controllers/*.js',
                srcHome + 'jasmine/spec/directives/*.js',
                srcHome + 'jasmine/spec/services/*.js',
                
                srcHome + 'tsb/partials/*.html'
        ],
				
		singleRun : true,
		autoWatch : false,
		// browsers = ['PhantomJS','Chrome','IE'];
		browsers : [ 'PhantomJS' ],
		reporters : [ 'dots', 'junit', 'coverage' ],

		junitReporter : {
			outputFile : 'karma-test-results.xml'
		},

		coverageReporter : {
			//type : 'html',
			type : 'cobertura',
			dir : 'coverage/',
			file: 'coverage.xml'
		},
		
		preprocessors : {
			'../../main/webapp/resources/tsb/js/tsb.js': 'coverage',
			'../../main/webapp/resources/tsb/js/controllers/*.js': 'coverage',
			'../../main/webapp/resources/tsb/js/directives/*.js': 'coverage',
			'../../main/webapp/resources/tsb/js/services/*.js': 'coverage',
			'../../main/webapp/resources/tsb/partials/*.html': 'ng-html2js'
		},

	});
};