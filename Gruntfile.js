module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
          banner: '/*!' +
            '\n *  <%= pkg.title %> v<%= pkg.version %>' +
            '\n *  Author: <%= pkg.authors[0].name %> | <%= pkg.authors[0].twitter %> | <%= pkg.authors[0].url %>' +
            '\n *  Demo: <%= pkg.demos[0] %>' +
            '\n *  <%= pkg.repositories[0].type %>: <%= pkg.repositories[0].url %>' +
            '\n *  Copyright <%= pkg.year %> | <%= pkg.licenses[0].name %>' +
            '\n */\n',
          filename: 'populatr'
        },
        concat: {
          dist: {
            src: ["js/src/<%= meta.filename %>.js"],
            dest: "js/dist/<%= meta.filename %>.js"
          },
          options: {
            banner: "<%= meta.banner %>"
          }
        },
        uglify: {
            options: {
              // mangle: false,
              banner: "<%= meta.banner %>"
            },
            'js/dist/<%= meta.filename %>.min.js': ['js/dist/<%= meta.filename %>.js']
        },
        jshint: {
            all: [ 'js/src/<%= meta.filename %>.js' ],
            options: {
              "boss": true,
              "devel": true,
              "curly": true,
              "eqeqeq": true,
              "eqnull": true,
              "expr": true,
              "immed": true,
              "noarg": true,
              "onevar": false,
              "quotmark": "single",
              "smarttabs": true,
              "trailing": true,
              "undef": true,
              "unused": true,
              "globals": {
                  "window": true,
                  "document": true,
                  "XMLHttpRequest": true
              }
            }
        },
        clean: ['js/dist/<%= meta.filename %>.min.js', 'js/dist/<%= meta.filename %>.js']
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-contrib-concat");

    grunt.registerTask('default', [ 'clean', 'jshint', 'concat', 'uglify' ]);
};
