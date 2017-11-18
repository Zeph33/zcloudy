const prod = process.env.NODE_ENV ? process.env.NODE_ENV=='production' : false
const minJsCss = prod ? '.min' : ''
const vuetifySrc = prod ? 'js' : 'dist'
let arCopyCSS = ['node_modules/vuetify/dist/vuetify'+minJsCss+'.css']
let arCopyJS = ['node_modules/vuetify/dist/vuetify'+minJsCss+'.js', 'node_modules/vue/dist/vue.runtime'+minJsCss+'.js']
if(!prod) arCopyJS.push('node_modules/vuetify/dist/vuetify.js.map')

module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app)/, // Files that are not in `app` dir.
        'app.js': /^app/,
      },
    },
    stylesheets: {
      joinTo: {
        'css/app.css': /^app/
        }
    },
    templates: {
      joinTo: 'app.js'
    }
  },
  server: {
    path: 'server.js'
  },
  plugins: {
    stylus: {
        modules: true
    },
    pug: {
      locals: { MIN: minJsCss , VUETIFY_SRC: vuetifySrc},
      preCompile: true
    },    
    babel: {
      presets: [
        ['env'],
        ['stage-2']
      ],
      comments: false
    },
    vue: {
      extractCSS: true,
      out: 'public/css/components.css'
    },
    copyfilemon:{
      'css': arCopyCSS,
      'js': arCopyJS
    },
    uglify: {
      mangle: true,
      compress: {
        global_defs: {
          DEBUG: false
        }
      }
    }    
  }
}
