function mimetypes(options){
     let returned
     switch (options) {
          case 'aac':
               returned = 'audio/aac'
               break
          case 'abw':
               returned = 'application/x-abiword'
               break
          case 'arc':
               returned = 'application/x-freearc'
               break
          case 'avi':
               returned = 'video/x-msvideo'
               break
          case 'azw':
               returned = 'application/vnd.amazon.ebook'
               break
          case 'apk':
               returned = 'application/vnd.android.package-archive'
               break
          case 'bin':
               returned = 'application/octet-stream'
               break
          case 'bmp':
               returned = 'image/bmp'
               break
          case 'css':
               returned = 'text/css'
               break
          case 'csv':
               returned = 'text/csv'
               break
          case 'doc':
               returned = 'application/msword'
               break
          case 'docx':
               returned = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
               break
          case 'eot':
               returned = 'application/vnd.ms-fontobject'
               break
          case 'epub':
               returned = 'application/epub+zip'
               break
          case 'gz':
               returned = 'application/gzip'
               break
          case 'gif':
               returned = 'image/gif'
               break
          case 'ico':
               returned = 'image/vnd.microsoft.icon'
               break
          case 'jpeg':
          case 'jpg':
               returned = '	image/jpeg'
               break
          case 'jar':
               returned = 'application/java-archive'
               break
          case 'mp3':
               returned = 'audio/mpeg'
               break
          case 'mpeg':
               returned = 'video/mpeg'
               break
          case 'oga':
               returned = 'audio/ogg'
               break
          case 'opus':
               returned = 'audio/opus'
               break
          case 'otf':
               returned = 'font/otf'
               break
          case 'png':
               returned = 'image/png'
               break
          case 'pdf':
               returned = 'application/pdf'
               break
          case 'ppt':
               returned = 'application/vnd.ms-powerpoint'
               break
          case 'pptx':
               returned = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
               break
          case 'rar':
               returned = 'application/vnd.rar'
               break
          case 'svg':
               returned = 'image/svg+xml'
               break
          case 'wav':
               returned = 'audio/wav'
               break
          case 'ppt':
               returned = 'application/vnd.ms-powerpoint'
               break
          case 'weba':
               returned = 'audio/webm'
               break
          case 'webp':
               returned = 'image/webp'
               break
          case 'xls':
               returned = 'application/vnd.ms-excel'
               break
          case 'xlsx':
               returned = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
               break
          case 'webm':
               returned = 'video/webm'
               break
          case 'zip':
               returned = 'application/zip'
               break
          case '3gpv':
               returned = 'video/3gpp'
               break
          case '3gpa':
               returned = 'audio/3gpp'
               break
          case '7z':
               returned = 'application/x-7z-compressed'
               break
          default:
               returned = 'application/octet-stream'
               break;
     }
     return returned
}

module.exports.mimetypes = mimetypes