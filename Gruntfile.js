module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            style: {
                files: {
                    "build/css/style.css": ["source/sass/style.scss"]
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ["last 2 version", "ie 10"]
            },
            style: {
                src: "source/sass/components/*.scss"
            }
        },

        cmq: {
            style: {
                files: {
                    "build/css/style.css": ["build/css/style.css"]
                }
            }
        },

        cssmin: {
            style: {
                options: {
                    keepSpecialComments: 0,
                    report: "gzip"
                },
                files: {
                    "build/css/style.min.css": ["build/css/style.css"]
                }
            }
        },

        csscomb: {
            style: {
                expand: true,
                src: ["source/scss/**/*.scss"]
            }
        },

        imagemin: {
            images: {
                options: {
                    optimizationLevel: 3,
                },
                files: [{
                    expand: true,
                    src: ["build/img/**/*.{png,jpg,gif,svg}"]
          }]
            }
        },

        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                }, {
                        removeUselessStrokeAndFill: false
                }
            ]
            },
            files: {
                expand: true,
                src: ["build/img/**/*.svg"],
                src: ["source/img/**/*.svg"]
            }
        },

        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: "source",
                    src: [
                  "img/*.*",
                  "js/**",
                  "route.html",
                  "bower_components"
              ],
                    dest: "build"
          }]
            },

            buildHTML: {
                files: [{
                    expand: true,
                    cwd: "source",
                    src: [
                  "route.html"
                ],
                    dest: "build"
            }]
            }
        },

        clean: {
            build: ["build"]
        },

        svgstore: {
            options: {
                includeTitleElement: false,
                svg: {
                    style: "display:none",
                },
                cleanup: [
                  "fill",
                ],
            },
            default: {
                files: {
                    "build/img/sprite.svg": ["source/img/*.svg"],
                },
            },
        },

        sprite: {
            all: {
                src: "source/img/sprite/*.png",
                retinaSrcFilter: "source/img/sprite/*@2x.png",
                dest: "build/img/sprite.png",
                retinaDest: "build/img/sprite@2x.png",
                destCss: "source/sass/sprite.scss"
            }
        },

        uglify: {
            start: {
                files: {
                    "build/js/script.min.js": ["source/js/script.js"],
                    "source/js/script.min.js": ["source/js/script.js"]
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },

            scripts: {
                files: ["source/js/script.js"],
                tasks: ["uglify"],
                options: {
                    spawn: false
                },
            },

            sass: {
                files: ["source/sass/**/*.scss"],
                tasks: ["sass"],
                options: {
                    spawn: false
                },
            },
            
            cssmin: {
                files: ["build/css/*.css"],
                tasks: ["cssmin"],
                options: {
                    spawn: false
                },
            },

            spriteSVG: {
                files: ["source/img/*.svg"],
                tasks: ["svgstore"],
                options: {
                    spawn: false
                },
            },

            html: {
                files: ["source/route.html"],
                tasks: ["copy:buildHTML"],
                options: {
                    spawn: false
                },
            },

            spritePNG: {
                files: [
                      "source/img/sprite/*.png"
                    ],
                tasks: ["sprite"],
                options: {
                    spawn: false
                },
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask("build", [
        "clean",
        "copy",
        "svgmin",
        "svgstore",
        "sprite",
        "sass",
        "autoprefixer",
        "cmq",
        "imagemin",
        "uglify"
    ]);
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-csscomb");
};