/*╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺
    ⭐ＰＲＯＪＥＣＴ ＮＡＭＥ:
    ＳＵＢＺＥＲＯ  ＭＤ ᐯ2
    
    ⭐ＤＥＶＥＬＯＰＥＲ
     ＭＲ ＦＲＡＮＫ 
     
    ⭐ ＭＹ ＴＥＡＭ
     ＸＥＲＯ ＣＯＤＥＲＳ
     
    ⭐ ＯＵＲ ＷＥＢＳＩＴＥ
     https://github.com/mrfrank-ofc/SUBZERO-V2

© Recoding This Script In Unacceptable⚠

╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺*/
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import _0xcd8fee from 'node-fetch';
import _0x46f0f8 from 'yt-search';
import 'ytdl-core';
import 'axios';
const handler = async (_0x38e9da, {
  conn: _0x13077c,
  command: _0x53700a,
  args: _0x4f953c,
  text: _0x4de361,
  usedPrefix: _0x4e04ab
}) => {
  if (_0x53700a == 'play3' || _0x53700a == "song3") {
    if (!_0x4de361) {
      return _0x38e9da.reply(mssg.example + "   *" + _0x4e04ab + _0x53700a + "* Enter Song Name Please.");
    }
    const _0x467832 = await search(_0x4f953c.join(" "));
    const _0x4f0037 = ("📌 *" + mssg.title + "* : " + _0x467832[0x0].title + "\n📆 *" + mssg.aploud + ":* " + _0x467832[0x0].ago + "\n⌚ *" + mssg.duration + ":* " + secondString(_0x467832[0x0].duration.seconds) + "\n\n_*The Audio 🔊 is downloading, wait a moment....*_\n\n> _*If this command fails to use the follow you way:*_ #play4 " + _0x467832[0x0].url).trim();
    await _0x13077c.sendFile(_0x38e9da.chat, _0x467832[0x0].thumbnail, 'error.jpg', _0x4f0037, _0x38e9da, null);
    try {
      const _0x594094 = "https://deliriussapi-oficial.vercel.app/download/ytmp4?url=" + encodeURIComponent(_0x467832[0x0].url);
      const _0x424620 = await _0xcd8fee(_0x594094);
      const _0x50c2ac = await _0x424620.json();
      if (!_0x50c2ac.status) {
        return _0x38e9da.react('❌');
      }
      const _0x143c2c = _0x50c2ac.data.download.url;
      await _0x13077c.sendMessage(_0x38e9da.chat, {
        'audio': {
          'url': _0x143c2c
        },
        'mimetype': "audio/mpeg"
      }, {
        'quoted': _0x38e9da
      });
    } catch (_0x274702) {
      try {
        const _0x1ee96f = await youtubedl(_0x467832[0x0].url)["catch"](async _0x56eae5 => await youtubedlv2(_0x467832[0x0].url));
        const _0xa13037 = await _0x1ee96f.audio["128kbps"].download();
        const _0x270aa1 = await _0x1ee96f.title;
        await _0x13077c.sendFile(_0x38e9da.chat, _0xa13037, _0x270aa1 + ".mp3", null, _0x38e9da, false, {
          'mimetype': 'audio/mp4'
        });
      } catch (_0x312fc1) {
        try {
          const _0x1884f3 = await fetch9Convert(_0x467832[0x0].url);
          await _0x13077c.sendFile(_0x38e9da.chat, _0x1884f3, 'audio.mp3', null, _0x38e9da, false, {
            'mimetype': "audio/mp4"
          });
        } catch (_0x448446) {
          try {
            const _0x20e255 = await fetchY2mate(_0x467832[0x0].url);
            await _0x13077c.sendFile(_0x38e9da.chat, _0x20e255, "audio.mp3", null, _0x38e9da, false, {
              'mimetype': "audio/mp4"
            });
          } catch (_0x4605bb) {
            try {
              const _0x502814 = await _0xcd8fee("https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=" + _0x467832[0x0].url);
              const _0x3aa5e5 = await _0x502814.json();
              if (_0x3aa5e5.status && _0x3aa5e5.result?.["downloadUrl"]) {
                await _0x13077c.sendMessage(_0x38e9da.chat, {
                  'audio': {
                    'url': _0x3aa5e5.result.downloadUrl
                  },
                  'mimetype': "audio/mpeg"
                }, {
                  'quoted': _0x38e9da
                });
              }
            } catch (_0x5b56b8) {
              try {
                let _0x851f2a = await _0xcd8fee("https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=" + _0x467832[0x0].url);
                let _0x2a7c64 = await _0x851f2a.json();
                const _0x46173f = await getBuffer(_0x2a7c64.result.media.mp3);
                const _0x6c386 = await getFileSize(_0x2a7c64.result.media.mp3);
                await _0x13077c.sendMessage(_0x38e9da.chat, {
                  'audio': {
                    'url': _0x46173f
                  },
                  'mimetype': "audio/mpeg"
                }, {
                  'quoted': _0x38e9da
                });
                if (_0x6c386 > 760217600) {
                  return await _0x13077c.sendMessage(_0x38e9da.chat, {
                    'document': {
                      'url': _0x46173f
                    },
                    'mimetype': 'audio.mp3',
                    'fileName': _0x467832[0x0].title + ".mp3"
                  }, {
                    'quoted': _0x38e9da
                  });
                }
              } catch (_0x19e132) {
                await _0x38e9da.react('❌');
                console.log(_0x19e132);
              }
            }
          }
        }
      }
    }
  }
  if (_0x53700a == 'play2' || _0x53700a == 'video') {
    if (!_0x4de361) {
      return _0x38e9da.reply(mssg.example + "   *" + _0x4e04ab + _0x53700a + "*  Bardo jholi meri Tahir Qadri Naat...");
    }
    const _0x3ce379 = await search(_0x4f953c.join(" "));
    const _0x73d887 = ("📌 *" + mssg.title + "* : " + _0x3ce379[0x0].title + "\n📆 *" + mssg.aploud + ":* " + _0x3ce379[0x0].ago + "\n⌚ *" + mssg.duration + ":* " + secondString(_0x3ce379[0x0].duration.seconds) + "\n\n_*Downloading your videos, wait a moment....*_\n\n> _*If this command fails to use the follow you way:*_ #ytmp4 " + _0x3ce379[0x0].url).trim();
    await _0x13077c.sendFile(_0x38e9da.chat, _0x3ce379[0x0].thumbnail, "error.jpg", _0x73d887, _0x38e9da, null);
    try {
      const _0x28cf51 = 'https://deliriussapi-oficial.vercel.app/download/ytmp4?url=' + encodeURIComponent(_0x3ce379[0x0].url);
      const _0x168a17 = await _0xcd8fee(_0x28cf51);
      const _0x4cd945 = await _0x168a17.json();
      if (!_0x4cd945.status) {
        return _0x38e9da.react('❌');
      }
      const _0x1bcc06 = _0x4cd945.data.download.url;
      const _0x115c7d = await getFileSize(_0x1bcc06);
      if (_0x115c7d > 445644800) {
        await _0x13077c.sendMessage(_0x38e9da.chat, {
          'document': {
            'url': _0x1bcc06
          },
          'fileName': _0x3ce379[0x0].title + ".mp4",
          'caption': vidcap + " \n💫 " + mssg.title + ": " + _0x3ce379[0x0].title
        }, {
          'quoted': _0x38e9da
        });
      } else {
        await _0x13077c.sendMessage(_0x38e9da.chat, {
          'video': {
            'url': _0x1bcc06
          },
          'fileName': _0x3ce379[0x0].title + ".mp4",
          'caption': vidcap + " \n💫 " + mssg.title + ": " + _0x3ce379[0x0].title,
          'thumbnail': _0x3ce379[0x0].thumbnail,
          'mimetype': 'video/mp4'
        }, {
          'quoted': _0x38e9da
        });
      }
    } catch (_0x17e986) {
      try {
        let _0x30ca5b = _0x4f953c[0x1] || "360";
        let _0x1b4a7f = _0x30ca5b + 'p';
        const _0x6eb515 = await youtubedl(_0x3ce379[0x0].url)["catch"](async _0xc8f965 => await youtubedlv2(_0x3ce379[0x0].url));
        const _0x144ddb = await _0x6eb515.video[_0x1b4a7f].download();
        const _0x3c1fb0 = await _0x6eb515.title;
        await await _0x13077c.sendMessage(_0x38e9da.chat, {
          'video': {
            'url': _0x144ddb
          },
          'fileName': _0x3c1fb0 + ".mp4",
          'mimetype': "video/mp4",
          'caption': vidcap + "\n💫 " + mssg.title + ": " + _0x3c1fb0,
          'thumbnail': await _0xcd8fee(_0x6eb515.thumbnail)
        }, {
          'quoted': _0x38e9da
        });
      } catch (_0x56709c) {
        try {
          const _0x593cff = await fetch9Convert(_0x3ce379[0x0].url);
          await _0x13077c.sendMessage(_0x38e9da.chat, {
            'video': {
              'url': _0x593cff
            },
            'fileName': _0x3ce379[0x0].title + ".mp4",
            'caption': vidcap + "\n💫 " + mssg.title + ": " + _0x3ce379[0x0].title,
            'thumbnail': _0x3ce379[0x0].thumbnail,
            'mimetype': "video/mp4"
          }, {
            'quoted': _0x38e9da
          });
        } catch (_0x2504d0) {
          try {
            const _0x5da6e4 = await fetchY2mate(_0x3ce379[0x0].url);
            await _0x13077c.sendMessage(_0x38e9da.chat, {
              'video': {
                'url': _0x5da6e4
              },
              'fileName': _0x3ce379[0x0].title + ".mp4",
              'caption': vidcap + " \n💫 " + mssg.title + ": " + _0x3ce379[0x0].title,
              'thumbnail': _0x3ce379[0x0].thumbnail,
              'mimetype': 'video/mp4'
            }, {
              'quoted': _0x38e9da
            });
          } catch (_0x24f07a) {
            try {
              const _0x19b08a = await fetchInvidious(_0x3ce379[0x0].url);
              const _0x448590 = _0x19b08a.videoFormats.find(_0x28491d => _0x28491d.mimeType === "audio/mp4").url;
              await _0x13077c.sendMessage(_0x38e9da.chat, {
                'video': {
                  'url': _0x448590
                },
                'fileName': _0x3ce379[0x0].title + ".mp4",
                'caption': vidcap + " \n 💫 " + mssg.title + ": " + _0x3ce379[0x0].title,
                'thumbnail': _0x3ce379[0x0].thumbnail,
                'mimetype': "video/mp4"
              }, {
                'quoted': _0x38e9da
              });
            } catch (_0x3ee2d4) {
              try {
                _0x13077c.sendMessage(_0x38e9da.chat, {
                  'video': {
                    'url': downloadUrl
                  },
                  'fileName': _0x3ce379[0x0].title + '.mp4',
                  'caption': vidcap + "\n💫 " + mssg.title + ": " + _0x3ce379[0x0].title,
                  'thumbnail': _0x3ce379[0x0].thumbnail,
                  'mimetype': "video/mp4"
                }, {
                  'quoted': _0x38e9da
                });
              } catch (_0x3ace91) {
                try {
                  let _0x2ebc42 = await _0xcd8fee('https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=' + _0x3ce379[0x0].url);
                  let _0x3e93a8 = await _0x2ebc42.json();
                  const _0x5e5cf6 = await getBuffer(_0x3e93a8.result.media.mp4);
                  const _0x1bd69c = await getFileSize(_0x3e93a8.result.media.mp4);
                  if (_0x1bd69c > 445644800) {
                    await _0x13077c.sendMessage(_0x38e9da.chat, {
                      'document': {
                        'url': _0x5e5cf6
                      },
                      'fileName': _0x3ce379[0x0].title + ".mp4",
                      'caption': vidcap + "\n💫 " + mssg.title + ": " + _0x3ce379[0x0].title
                    }, {
                      'quoted': _0x38e9da
                    });
                  } else {
                    await _0x13077c.sendMessage(_0x38e9da.chat, {
                      'video': {
                        'url': _0x5e5cf6
                      },
                      'fileName': _0x3ce379[0x0].title + '.mp4',
                      'caption': vidcap + "\n💫 " + mssg.title + ": " + _0x3ce379[0x0].title,
                      'thumbnail': _0x3ce379[0x0].thumbnail,
                      'mimetype': "video/mp4"
                    }, {
                      'quoted': _0x38e9da
                    });
                  }
                } catch (_0x1f9ba8) {
                  await _0x38e9da.react('❌');
                  console.log(_0x1f9ba8);
                }
              }
            }
          }
        }
      }
    }
  }
  if (_0x53700a == 'play' || _0x53700a == 'song') {
    if (!_0x4de361) {
      return _0x38e9da.reply(mssg.example + "   *" + _0x4e04ab + _0x53700a + "*  Enter Song name.");
    }
    const _0x356081 = await search(_0x4f953c.join(" "));
    const _0x4f794a = ("📌 *" + mssg.title + "* : " + _0x356081[0x0].title + "\n📆 *" + mssg.aploud + ":* " + _0x356081[0x0].ago + "\n⌚ *" + mssg.duration + ":* " + secondString(_0x356081[0x0].duration.seconds) + "\n\n> *Downloading the audio 🔊 in documents, please wait a moment....*\n\n> SUBZERO V2 ❄️#ytmp3doc " + _0x356081[0x0].url).trim();
    await _0x13077c.sendFile(_0x38e9da.chat, _0x356081[0x0].thumbnail, "error.jpg", _0x4f794a, _0x38e9da, null);
    try {
      const _0x1cf8c6 = "https://deliriussapi-oficial.vercel.app/download/ytmp4?url=" + encodeURIComponent(_0x356081[0x0].url);
      const _0x34651d = await _0xcd8fee(_0x1cf8c6);
      const _0xc410ae = await _0x34651d.json();
      if (!_0xc410ae.status) {
        return _0x38e9da.react('❌');
      }
      const _0x405a5d = _0xc410ae.data.download.url;
      await _0x13077c.sendMessage(_0x38e9da.chat, {
        'document': {
          'url': _0x405a5d
        },
        'mimetype': "audio/mpeg",
        'fileName': _0x356081[0x0].title + ".mp3"
      }, {
        'quoted': _0x38e9da
      });
    } catch (_0x3bac30) {
      try {
        const _0xc282fc = await youtubedl(_0x356081[0x0].url)["catch"](async _0x2191e => await youtubedlv2(_0x356081[0x0].url));
        const _0x3ec005 = await _0xc282fc.audio["128kbps"].download();
        const _0x468c1e = await _0xc282fc.title;
        await _0x13077c.sendMessage(_0x38e9da.chat, {
          'document': {
            'url': _0x3ec005
          },
          'mimetype': "audio/mpeg",
          'fileName': _0x468c1e + ".mp3"
        }, {
          'quoted': _0x38e9da
        });
      } catch (_0xb76ea3) {
        try {
          const _0x4602a1 = await fetch9Convert(_0x356081[0x0].url);
          await _0x13077c.sendMessage(_0x38e9da.chat, {
            'document': {
              'url': _0x4602a1
            },
            'mimetype': "audio/mpeg",
            'fileName': _0x356081[0x0].title + ".mp3"
          }, {
            'quoted': _0x38e9da
          });
        } catch (_0x359d61) {
          try {
            const _0x2fda02 = await fetchY2mate(_0x356081[0x0].url);
            await _0x13077c.sendMessage(_0x38e9da.chat, {
              'document': {
                'url': _0x2fda02
              },
              'mimetype': "audio/mpeg",
              'fileName': _0x356081[0x0].title + ".mp3"
            }, {
              'quoted': _0x38e9da
            });
          } catch (_0x3a7724) {
            try {
              const _0x3081fa = await _0xcd8fee('https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=' + _0x356081[0x0].url);
              const _0x109861 = await _0x3081fa.json();
              if (_0x109861.status && _0x109861.result?.["downloadUrl"]) {
                await _0x13077c.sendMessage(_0x38e9da.chat, {
                  'document': {
                    'url': _0x109861.result.downloadUrl
                  },
                  'mimetype': "audio/mpeg",
                  'fileName': _0x356081[0x0].title + ".mp3"
                }, {
                  'quoted': _0x38e9da
                });
              }
            } catch (_0x555906) {
              try {
                await _0x13077c.sendMessage(_0x38e9da.chat, {
                  'document': {
                    'url': audioData.result.downloadUrl
                  },
                  'mimetype': "audio/mpeg",
                  'fileName': _0x356081[0x0].title + '.mp3'
                }, {
                  'quoted': _0x38e9da
                });
              } catch (_0x3b9e4d) {
                await _0x38e9da.react('❌');
                console.log(_0x3b9e4d);
              }
            }
          }
        }
      }
    }
  }
  if (_0x53700a == 'play4' || _0x53700a == "playdoc2") {
    if (!_0x4de361) {
      return _0x38e9da.reply(mssg.example + "   *" + _0x4e04ab + _0x53700a + "*  Bardo jholi meri Tahir Qadri Naat...");
    }
    const _0x32da89 = await search(_0x4f953c.join(" "));
    const _0x148f6d = ("📌 *" + mssg.title + "* : " + _0x32da89[0x0].title + "\n📆 *" + mssg.aploud + ":* " + _0x32da89[0x0].ago + "\n⌚ *" + mssg.duration + ":* " + secondString(_0x32da89[0x0].duration.seconds) + "\n\n_*Downloading your video in document, wait a moment please....*_\n\n> _*If this command fails to use the follow you way:*_ #ytmp4doc " + _0x32da89[0x0].url).trim();
    await _0x13077c.sendFile(_0x38e9da.chat, _0x32da89[0x0].thumbnail, 'error.jpg', _0x148f6d, _0x38e9da, null);
    try {
      const _0x47a060 = "https://deliriussapi-oficial.vercel.app/download/ytmp4?url=" + encodeURIComponent(_0x32da89[0x0].url);
      const _0x9be17a = await _0xcd8fee(_0x47a060);
      const _0x5e5ec0 = await _0x9be17a.json();
      if (!_0x5e5ec0.status) {
        return _0x38e9da.react('❌');
      }
      const _0x4f45fe = _0x5e5ec0.data.download.url;
      await _0x13077c.sendMessage(_0x38e9da.chat, {
        'document': {
          'url': _0x4f45fe
        },
        'fileName': _0x32da89[0x0].title + ".mp4",
        'caption': '' + wm,
        'thumbnail': _0x32da89[0x0].thumbnail,
        'mimetype': 'video/mp4'
      }, {
        'quoted': _0x38e9da
      });
    } catch (_0x58161b) {
      try {
        let _0x21c915 = await _0xcd8fee("https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=" + _0x32da89[0x0].url);
        let _0x2311b6 = await _0x21c915.json();
        const _0x380e37 = await getBuffer(_0x2311b6.result.media.mp4);
        await _0x13077c.sendMessage(_0x38e9da.chat, {
          'document': {
            'url': _0x380e37
          },
          'fileName': _0x32da89[0x0].title + ".mp4",
          'caption': null,
          'thumbnail': _0x32da89[0x0].thumbnail,
          'mimetype': "video/mp4"
        }, {
          'quoted': _0x38e9da
        });
      } catch (_0xc67182) {
        await _0x38e9da.react('❌');
        console.log(_0xc67182);
      }
    }
  }
};
handler.help = ["play", 'song', 'play2', "play3", "play4", "playdoc"];
handler.tags = ["downloader"];
handler.command = ['play', 'song', 'play2', "play3", 'play4', "audio", 'video', "playdoc", 'playdoc2'];
handler.register = false;
export default handler;
async function search(_0x39bd30, _0x29c977 = {}) {
  const _0x96d44c = await _0x46f0f8.search({
    'query': _0x39bd30,
    'hl': 'es',
    'gl': 'ES',
    ..._0x29c977
  });
  return _0x96d44c.videos;
}
function MilesNumber(_0x4f0771) {
  const _0x22b29c = /(\d)(?=(\d{3})+(?!\d))/g;
  const _0x21e83a = _0x4f0771.toString().split('.');
  _0x21e83a[0x0] = _0x21e83a[0x0].replace(_0x22b29c, '$1.');
  return _0x21e83a[0x1] ? _0x21e83a.join('.') : _0x21e83a[0x0];
}
function secondString(_0x18b6d9) {
  _0x18b6d9 = Number(_0x18b6d9);
  const _0x12b1e5 = Math.floor(_0x18b6d9 / 86400);
  const _0x1558ab = Math.floor(_0x18b6d9 % 86400 / 0xe10);
  const _0x4bad00 = Math.floor(_0x18b6d9 % 0xe10 / 0x3c);
  const _0x42cfd1 = Math.floor(_0x18b6d9 % 0x3c);
  const _0x5146df = _0x12b1e5 > 0x0 ? _0x12b1e5 + (_0x12b1e5 == 0x1 ? " day, " : " days, ") : '';
  const _0x431f74 = _0x1558ab > 0x0 ? _0x1558ab + (_0x1558ab == 0x1 ? " hour, " : " hours, ") : '';
  const _0x2a9217 = _0x4bad00 > 0x0 ? _0x4bad00 + (_0x4bad00 == 0x1 ? " minute, " : " minutes, ") : '';
  const _0x488790 = _0x42cfd1 > 0x0 ? _0x42cfd1 + (_0x42cfd1 == 0x1 ? " second" : " Seconds") : '';
  return _0x5146df + _0x431f74 + _0x2a9217 + _0x488790;
}
const getBuffer = async _0x496dfa => {
  try {
    const _0x5a8df9 = await _0xcd8fee(_0x496dfa);
    const _0x3ecc29 = await _0x5a8df9.arrayBuffer();
    return Buffer.from(_0x3ecc29);
  } catch (_0x13794c) {
    console.error("Error getting the buffer", _0x13794c);
    throw new Error("Error getting the buffer");
  }
};
async function getFileSize(_0x3f7d3f) {
  try {
    const _0xfb8a8 = await _0xcd8fee(_0x3f7d3f, {
      'method': "HEAD"
    });
    const _0x23fc58 = _0xfb8a8.headers.get("content-length");
    return _0x23fc58 ? parseInt(_0x23fc58, 0xa) : 0x0;
  } catch (_0x5f5752) {
    console.error("Error Getting File Size", _0x5f5752);
    return 0x0;
  }
}
async function fetchY2mate(_0xe982b1) {
  const _0x39e695 = await _0xcd8fee("https://www.y2mate.com/mates/en60/analyze/ajax", {
    'method': "POST",
    'headers': {
      'Content-Type': "application/x-www-form-urlencoded"
    },
    'body': new URLSearchParams({
      'url': _0xe982b1,
      'q_auto': 0x0
    })
  }).then(_0x2eed7f => _0x2eed7f.json());
  const _0x388430 = _0x39e695.result.id;
  const _0x484ac0 = await _0xcd8fee("https://www.y2mate.com/mates/en60/convert", {
    'method': "POST",
    'headers': {
      'Content-Type': "application/x-www-form-urlencoded"
    },
    'body': new URLSearchParams({
      'type': "youtube",
      '_id': _0x388430,
      'v_id': _0xe982b1,
      'token': '',
      'ftype': "mp4",
      'fquality': "360p"
    })
  }).then(_0x27bab1 => _0x27bab1.json());
  return _0x484ac0.result.url;
}
async function fetchInvidious(_0x3b0673) {
  const _0x40e202 = await _0xcd8fee("https://invidious.io/api/v1/get_video_info?url=" + encodeURIComponent(_0x3b0673));
  const _0x78212f = await _0x40e202.json();
  if (_0x78212f && _0x78212f.video) {
    const _0x1eeca9 = _0x78212f.video;
    return _0x1eeca9;
  } else {
    throw new Error("Video information could not be obtained from Invidious");
  }
}
async function fetch9Convert(_0x8354c9) {
  const _0x5e2e12 = await _0xcd8fee("https://9convert.com/en429/api?url=" + encodeURIComponent(_0x8354c9));
  const _0x512d46 = await _0x5e2e12.json();
  if (_0x512d46.status === 'ok') {
    return _0x512d46.result.mp3;
  } else {
    throw new Error("Could not get download from 9Convert");
  }
}
