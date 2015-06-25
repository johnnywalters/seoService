module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		// linter
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			appFiles: {
				src: [
					'server/*.js',
					'tests/*.js',
					'Gruntfile.js',
					'app.js',
					'package.json'
				]
			}
		},
		// linter
		jscs: {
			options: {
				config: '.jscsrc'
			},
			appFiles: {
				src: [
					'server/*.js',
					'tests/*.js',
					'Gruntfile.js',
					'app.js'
				]
			}
		},
		// mocha tests (server)
		mochaTest: {
			options: {
				reporter: 'progress',
				bail: true
			},
			testApp: {
				src: 'tests/seo.spec.js'
			}
		},
		// express deploy
		express: {
			options: {
				port: 8080
			},
			dev: {
				options: {
					script: './app.js',
					node_env: 'dev',
					nospawn: true,
					delay: 5
				}
			}
		},
		// live watcher for file changes
		watch: {
			appFile: {
				files: [
					'server/*.js',
					'spec/*.js',
					'Gruntfile.js',
					'app.js',
					'package.json'
				],
				tasks: [
					'express:dev:stop',
					'jshint:appFiles',
					'jscs:appFiles',
					'mochaTest:testApp',
					'express:dev:start'
				]
			}
		}
	});
	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');
	// Tasks.
	grunt.registerTask('default', [
		'jshint',
		'jscs',
		'watch'
	]);
};
