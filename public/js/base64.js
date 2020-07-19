// export class Base64 {
//   constructor () {
//     // private property
//     const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
//     this._keyStr = keyStr
//   }
//   // public method for encoding
//   encode (input) {
//     let output = ''
//     let chr1 = ''
//     let chr2 = ''
//     let chr3 = ''
//     let enc1 = ''
//     let enc2 = ''
//     let enc3 = ''
//     let enc4 = ''
//     let i = 0
//     input = this.utf8Encode(input)
//     while (i < input.length) {
//       chr1 = input.charCodeAt(i++)
//       chr2 = input.charCodeAt(i++)
//       chr3 = input.charCodeAt(i++)
//       enc1 = chr1 >> 2
//       enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
//       enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
//       enc4 = chr3 & 63
//       if (isNaN(chr2)) {
//         enc3 = enc4 = 64
//       } else if (isNaN(chr3)) {
//         enc4 = 64
//       }
//       output = output +
//         this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
//         this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4)
//     }
//     return output
//   }

//   // public method for decoding
//   decode (input) {
//     let output = ''
//     let chr1 = ''
//     let chr2 = ''
//     let chr3 = ''
//     let enc1 = ''
//     let enc2 = ''
//     let enc3 = ''
//     let enc4 = ''
//     let i = 0
//     // eslint-disable-next-line
//     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
//     while (i < input.length) {
//       enc1 = this._keyStr.indexOf(input.charAt(i++))
//       enc2 = this._keyStr.indexOf(input.charAt(i++))
//       enc3 = this._keyStr.indexOf(input.charAt(i++))
//       enc4 = this._keyStr.indexOf(input.charAt(i++))
//       chr1 = (enc1 << 2) | (enc2 >> 4)
//       chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
//       chr3 = ((enc3 & 3) << 6) | enc4
//       output = output + String.fromCharCode(chr1)
//       if (enc3 !== 64) {
//         output = output + String.fromCharCode(chr2)
//       }
//       if (enc4 !== 64) {
//         output = output + String.fromCharCode(chr3)
//       }
//     }
//     output = this.utf8Decode(output)
//     return output
//   }

//   // private method for UTF-8 encoding
//   utf8Encode (string) {
//     string = string.replace(/\r\n/g, '\n')
//     let utftext = ''
//     for (let n = 0; n < string.length; n++) {
//       const c = string.charCodeAt(n)
//       if (c < 128) {
//         utftext += String.fromCharCode(c)
//       } else if ((c > 127) && (c < 2048)) {
//         utftext += String.fromCharCode((c >> 6) | 192)
//         utftext += String.fromCharCode((c & 63) | 128)
//       } else {
//         utftext += String.fromCharCode((c >> 12) | 224)
//         utftext += String.fromCharCode(((c >> 6) & 63) | 128)
//         utftext += String.fromCharCode((c & 63) | 128)
//       }
//     }
//     return utftext
//   }

//   // private method for UTF-8 decoding
//   utf8Decode (utftext) {
//     // 去除转换后的字符串无用的前缀'u«ZµìmþZvÚ±î¸' 只保留后面实际的文本部分
//     utftext = utftext.split('î¸')[1]
//     let string = ''
//     let i = 0
//     let c = 0
//     let c2 = 0
//     let c3 = 0
//     while (i < utftext.length) {
//       c = utftext.charCodeAt(i)
//       if (c < 128) {
//         string += String.fromCharCode(c)
//         i++
//       } else if ((c > 191) && (c < 224)) {
//         c2 = utftext.charCodeAt(i + 1)
//         string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
//         i += 2
//       } else {
//         c2 = utftext.charCodeAt(i + 1)
//         c3 = utftext.charCodeAt(i + 2)
//         string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
//         i += 3
//       }
//     }
//     return string
//   }

//   utf8to16 (str) {
//     let out = ''
//     let i = 0
//     let c = 0
//     const len = str.length
//     let char2, char3
//     while (i < len) {
//       c = str.charCodeAt(i++)
//       switch (c >> 4) {
//         case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
//           // 0xxxxxxx
//           out += str.charAt(i - 1)
//           break
//         case 12: case 13:
//           // 110x xxxx   10xx xxxx
//           char2 = str.charCodeAt(i++)
//           out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F))
//           break
//         case 14:
//           // 1110 xxxx  10xx xxxx  10xx xxxx
//           char2 = str.charCodeAt(i++)
//           char3 = str.charCodeAt(i++)
//           out += String.fromCharCode(((c & 0x0F) << 12) |
//           ((char2 & 0x3F) << 6) |
//           ((char3 & 0x3F) << 0))
//           break
//       }
//     }
//     return out
//   }
// }
const Base64 = {

  // private property
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  // public method for encoding
  encode: function(input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;

      input = Base64._utf8_encode(input);

      while (i < input.length) {

          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
              enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
              enc4 = 64;
          }

          output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

      }

      return output;
  },

  // public method for decoding
  decode: function(input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      while (i < input.length) {

          enc1 = this._keyStr.indexOf(input.charAt(i++));
          enc2 = this._keyStr.indexOf(input.charAt(i++));
          enc3 = this._keyStr.indexOf(input.charAt(i++));
          enc4 = this._keyStr.indexOf(input.charAt(i++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
          }

      }

      output = Base64._utf8_decode(output);

      return output;

  },

  // private method for UTF-8 encoding
  _utf8_encode: function(string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";

      for (var n = 0; n < string.length; n++) {

          var c = string.charCodeAt(n);

          if (c < 128) {
              utftext += String.fromCharCode(c);
          } else if ((c > 127) && (c < 2048)) {
              utftext += String.fromCharCode((c >> 6) | 192);
              utftext += String.fromCharCode((c & 63) | 128);
          } else {
              utftext += String.fromCharCode((c >> 12) | 224);
              utftext += String.fromCharCode(((c >> 6) & 63) | 128);
              utftext += String.fromCharCode((c & 63) | 128);
          }

      }

      return utftext;
  },

  // private method for UTF-8 decoding
  _utf8_decode: function(utftext) {
      var string = "";
      var i = 0;
      var c = c1 = c2 = 0;

      while (i < utftext.length) {

          c = utftext.charCodeAt(i);

          if (c < 128) {
              string += String.fromCharCode(c);
              i++;
          } else if ((c > 191) && (c < 224)) {
              c2 = utftext.charCodeAt(i + 1);
              string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
              i += 2;
          } else {
              c2 = utftext.charCodeAt(i + 1);
              c3 = utftext.charCodeAt(i + 2);
              string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
              i += 3;
          }

      }

      return string;
  }

}
