(function(D){D._deps.audioutils=function(w,l){function p(a){l.loadDecodedBuffer(a);w.fireEvent("DidUpdateLen",l.getDuration())}function r(a,b){for(var d=l.backend.buffer,c=b/1*d.sampleRate>>0,e=a/1*d.sampleRate>>0,f=l.backend.ac.createBuffer(l.SelectedChannelsLen,c,d.sampleRate),g=0,h=0;g<l.ActiveChannels.length;++g)0!==l.ActiveChannels[g]&&(f.getChannelData(h).set(d.getChannelData(g).slice(e,c+e)),++h);return f}function x(a,b,d){var c=l.backend.buffer;b=b/1*c.sampleRate>>0;a=a/1*c.sampleRate>>0;
var e=l.backend.ac.createBuffer(d?c.numberOfChannels:l.SelectedChannelsLen,b,c.sampleRate);if(d||1!==l.SelectedChannelsLen)for(d=l.backend.ac.createBuffer(c.numberOfChannels,c.length-b,c.sampleRate),f=0;f<c.numberOfChannels;++f)g=c.getChannelData(f),k=e.getChannelData(f),h=d.getChannelData(f),k.set(g.slice(a,a+b)),h.set(g.slice(0,a)),h.set(g.slice(a+b),a);else{d=l.backend.ac.createBuffer(c.numberOfChannels,c.length,c.sampleRate);for(var f=0;f<c.numberOfChannels;++f){var g=c.getChannelData(f),h=d.getChannelData(f);
if(0===l.ActiveChannels[f])h.set(g);else{var k=e.getChannelData(0);k.set(g.slice(a,a+b));h.set(g.slice(0,a));h.set(g.slice(a+b),a+b)}}}p(d,c);return e}function y(a,b){var d=l.backend.buffer,c=l.backend.ac.createBuffer(d.numberOfChannels,d.length+b.length,d.sampleRate);a=a/1*d.sampleRate>>0;for(var e=0;e<d.numberOfChannels;++e){var f=d.getChannelData(e),g=c.getChannelData(e);var h=1===b.numberOfChannels?b.getChannelData(0):b.getChannelData(e);1===l.SelectedChannelsLen&&0===l.ActiveChannels[e]?g.set(f):
(0<a&&g.set(f.slice(0,a)),g.set(h,a),a<d.length+b.length&&g.set(f.slice(a),a+h.length))}p(c,d);return[a/d.sampleRate,a/d.sampleRate+b.length/d.sampleRate]}function z(){if(this.previewing){if(this.PreviewFilter)if(0<this.PreviewFilter.length)for(var a=0;a<this.PreviewFilter.length;++a)this.PreviewFilter[a].disconnect();else this.PreviewFilter.disconnect();A.disconnect();l.backend.scriptNode.connect(v.destination);this.PreviewSource.stop();this.PreviewSource.disconnect();this.PreviewDestination=this.PreviewSource=
this.PreviewFilter=this.PreviewUpdate=null;this.previewing=0}}function B(){if(!this.previewing)return this.previewVal=!this.previewVal;if(2===this.previewing)return this.PreviewSource.disconnect(),this.PreviewSource.connect(this.PreviewDestination),this.previewing=1,this.previewVal=!1;this.PreviewSource.disconnect();this.PreviewFilter&&(0<this.PreviewFilter.length?!this.PreviewFilter[0].buffer&&this.PreviewSource.connect(this.PreviewFilter[0]):(!this.PreviewFilter.buffer&&this.PreviewSource.connect(this.PreviewFilter),
this.PreviewFilter.disconnect(),this.PreviewFilter.connect(this.PreviewDestination)));this.previewing=2;return this.previewVal=!0}var m=l.backend.analyser,v=l.backend.ac,A=v.createScriptProcessor(256),q=null;this.FXPreviewUpdate=function(a){this.previewing&&this.PreviewUpdate&&this.PreviewUpdate(this.PreviewFilter,v,a,this.PreviewSource)};this.FXPreviewStop=z;this.FXPreviewToggle=B;this.FXPreviewInit=function(a){this.previewVal=a};this.FXPreview=function(a,b,d){this.previewing&&z();var c=l.backend.buffer;
a||b||(a=0,b=c.length/c.sampleRate>>0);c=A;a=r(a,b);var e;(e=l.backend.ac)||(window.WaveSurferAudioContext||(window.WaveSurferAudioContext=new (window.AudioContext||window.webkitAudioContext)),e=window.WaveSurferAudioContext);var f=e.createBufferSource();f.buffer=a;f.loop=!0;this.PreviewFilter=null;d?(this.PreviewUpdate=d.update,this.PreviewFilter=d.filter(e,m,f,b/1)):f.connect(m);c.disconnect();l.backend.scriptNode.disconnect();c.connect(e.destination);var g=1;c.onaudioprocess=function(b){b=[0,0];
var c=0;--g;if(0===g){if(m.getFloatTimeDomainData){var d=new Float32Array(m.fftSize);m.getFloatTimeDomainData(d);for(var a=0;a<m.fftSize;a+=1){var f=d[a];Math.abs(f)>=c&&(c=Math.abs(f))}b[0]=20*Math.log10(c)+.001}else{d=new Uint8Array(m.fftSize);m.getByteTimeDomainData(d);for(a=c=0;a<m.fftSize;a+=1)f=d[a]/128-1,c+=f*f;b[0]=Math.log(Math.sqrt(c/m.fftSize))/Math.log(10)*20}-100>b[0]&&(b[0]=-100);b[1]=b[0];m.getByteFrequencyData(l.backend.FreqArr);w.fireEvent("DidAudioProcess",[-1,b],l.backend.FreqArr);
g=2}};f.start();this.PreviewSource=f;this.PreviewDestination=m;this.previewing=2;this.previewVal||B.call(this);return f};this.FX=function(a,b,d){var c=l.backend.buffer;a||b||(a=0,b=c.length/c.sampleRate>>0);0>a&&(a=0);l.getDuration()<b&&(b=l.getDuration());var e=r(a,b),f=a/1*c.sampleRate>>0;a=new (window.OfflineAudioContext||window.webkitOfflineAudioContext)(l.SelectedChannelsLen,e.length,c.sampleRate);var g=a.createBufferSource();g.buffer=e;var h=null;d&&(h=d.filter(a,a.destination,g,b/1));g.start();
var k=function(b){for(var d=l.backend.ac.createBuffer(c.numberOfChannels,c.length,c.sampleRate),a=0;a<c.numberOfChannels;++a){var k=d.getChannelData(a),C=c.getChannelData(a);if(0===l.ActiveChannels[a])k.set(C);else{var u=1===b.numberOfChannels?b.getChannelData(0):b.getChannelData(a);k.set(C);k.set(u,f,u.length-f)}}p(d);if(0<h.length)for(a=0;a<h.length;++a)h[a].disconnect();else h&&h.disconnect&&h.disconnect();e=h=null;g.disconnect()};(b=a.startRendering())?b.then(k)["catch"](function(b){console.log("Rendering failed: "+
b)}):a.oncomplete=function(b){k(b.renderedBuffer)}};this.FXBank={Gain:function(a){return{filter:function(b,d,c,e){e=b.createGain();e.gain.setValueAtTime(a,b.currentTime);e.connect(d);c.connect(e);return e},update:function(b,a,c){b.gain.setValueAtTime(c,a.currentTime)}}},FadeIn:function(a){return{filter:function(b,a,c,e){var d=b.createGain();d.gain.setValueAtTime(0,b.currentTime);d.gain.linearRampToValueAtTime(1,b.currentTime+e/1);d.connect(a);c.connect(d);return d}}},FadeOut:function(a){return{filter:function(b,
a,c,e){var d=b.createGain();d.gain.linearRampToValueAtTime(0,b.currentTime+e/1);d.connect(a);c.connect(d);return d}}},Compressor:function(a){return{filter:function(b,d,c,e){b=b.createDynamicsCompressor();b.threshold.setValueAtTime(a.threshold,0);b.knee.setValueAtTime(a.knee,0);b.ratio.setValueAtTime(a.ratio,0);b.attack.setValueAtTime(a.attack,0);b.release.setValueAtTime(a.release,0);b.connect(d);c.connect(b);return b},update:function(b,a,c){b.threshold.setValueAtTime(c.threshold,0);b.knee.setValueAtTime(c.knee,
0);b.ratio.setValueAtTime(c.ratio,0);b.attack.setValueAtTime(c.attack,0);b.release.setValueAtTime(c.release,0)}}},Reverse:function(a){return{filter:function(b,a,c,e){for(b=0;b<c.buffer.numberOfChannels;++b)Array.prototype.reverse.call(c.buffer.getChannelData(b));c.connect(a);return null},update:function(){}}},Invert:function(a){return{filter:function(b,a,c,e){for(b=0;b<c.buffer.numberOfChannels;++b){e=c.buffer.getChannelData(b);for(var d=0;d<e.length;++d)e[d]*=-1}c.connect(a);return null},update:function(){}}},
Normalize:function(a){return{filter:function(b,d,c,e){b=a[1]||1;e=a[0];for(var f=0,g=0;g<c.buffer.numberOfChannels;++g){for(var h=c.buffer.getChannelData(g),k=1,l=h.length;k<l;k+=10){var n=Math.abs(h[k]);f<n&&(f=n)}n=b/f;if(!e){k=0;for(l=h.length;k<l;++k)h[k]*=n;f=0}}if(e)for(n=b/f,g=0;g<c.buffer.numberOfChannels;++g)for(h=c.buffer.getChannelData(g),k=0,l=h.length;k<l;++k)h[k]*=n;c.connect(d);return null},update:function(){}}},HardLimit:function(a){return{filter:function(b,d,c,e){var f=a[1]||1,g=
a[2]||0,h=a[3]||15,k=0;e=b.createBuffer(c.buffer.numberOfChannels,c.buffer.length,c.buffer.sampleRate);h=h*e.sampleRate/1E3>>0;for(var l=0;l<e.numberOfChannels;++l){var n=e.getChannelData(l);n.set(c.buffer.getChannelData(l));for(var m=0,q=n.length;m<q;++m){for(var t=0;t<h;t+=10){var u=Math.abs(n[m+t]);k<u&&(k=u)}k=f/k;for(t=0;t<h;++t){u=n[m+t];var p=u*k,r=f-Math.abs(p);r*=0>u?-g:g;n[m+t]=p+r}m+=h;k=0}}b=b.createBufferSource();b.buffer=e;b.loop=!0;b.start();b.connect(d);return b},update:function(b,
a,c,e){b.disconnect();b.buffer=null;this.PreviewFilter=this.FXBank.HardLimit(c).filter(a,m,e,0)}}},ParametricEQ:function(a){return{filter:function(b,d,c,e){e=[];var f=a.length,g=function(a){var c=b.createBiquadFilter();c.type=a.type;c.gain.value=~~a.val;c.Q.value=a.q||1;c.frequency.value=a.freq;return c};a[0]||(a[0]={type:"peaking",val:0,q:1,freq:500});var h=g(a[0]);e.push(h);c.connect(h);if(1===a.length)return h.connect(d),e;for(c=1;c<f-1;++c)h=g(a[c]),e[c-1].connect(h),e.push(h);h=g(a[f-1]);e[e.length-
1].connect(h);e.push(h);h.connect(d);return e},update:function(b,a,c,e){if(b.length!==c.length)if(b.length<c.length){for(var d=c.length-b.length;0<d--;){var g=a.createBiquadFilter();var h=b[0];b.unshift(g);g.connect(h)}e.disconnect();e.connect(b[0])}else if(0<c.length){d=b.length-c.length;e.disconnect();for(a=0;a<d;++a)g=b.shift(),g.disconnect();e.connect(b[0])}else c[0]={type:"peaking",val:0,q:1,freq:500};e=c.length;for(a=0;a<e;++a)g=b[a],g.type=c[a].type,g.gain.value=~~c[a].val,g.Q.value=c[a].q||
1,g.frequency.value=c[a].freq}}},Speed:function(a){return{filter:function(b,d,c,e){b=b.createGain();c.playbackRate.value=a;c.connect(b);b.connect(d);return[b]},update:function(b,a,c,e){e.playbackRate.value=c}}},Delay:function(a){return{filter:function(b,d,c,e){var f=b.createGain(),g=b.createGain();e=b.createGain();var h=b.createGain(),k=b.createGain();b=b.createDelay();c.connect(f);f.connect(e);e.connect(g);b.connect(k);k.connect(b);f.connect(b);b.connect(h);h.connect(g);g.connect(d);d=[f,g,e,h,k,
b];b.delayTime.value=a.delay;k.gain.value=a.feedback;e.gain.value=1-2*(a.mix-.5);h.gain.value=1-2*(.5-a.mix);return d},update:function(b,a,c){a=b[2];var d=b[3],f=b[4];b[5].delayTime.value=c.delay;f.gain.value=c.feedback;a.gain.value=1-2*(c.mix-.5);d.gain.value=1-2*(.5-c.mix)}}},Distortion:function(a){return{filter:function(b,a,c,e){b=b.createWaveShaper();e=new Float32Array(44100);for(var d=Math.PI/180,g,h=0;44100>h;++h)g=2*h/44100-1,e[h]=1060*g*d/(Math.PI+50*Math.abs(g));b.curve=e;c.connect(b);b.connect(a);
return b},update:function(b,a,c){a=parseInt(c/1*100,10);c=new Float32Array(44100);for(var d=Math.PI/180,f,g=0;44100>g;++g)f=2*g/44100-1,c[g]=(3+a)*f*20*d/(Math.PI+a*Math.abs(f));b.curve=c}}},Reverb:function(a){return{filter:function(b,d,c,e){var f=b.createGain();e=b.createConvolver();var g=b.createGain(),h=b.createGain(),k=b.createGain();c.connect(f);f.connect(e);e.connect(h);f.connect(k);k.connect(g);h.connect(g);g.connect(d);d=[f,g,e,k,h];k.gain.value=1-2*(a.mix-.5);h.gain.value=1-2*(.5-a.mix);
c=b.sampleRate*a.time;b=b.createBuffer(2,c,b.sampleRate);h=b.getChannelData(0);k=b.getChannelData(1);for(g=0;g<c;g++)f=a.reverse?c-g:g,h[g]=(2*Math.random()-1)*Math.pow(1-f/c,a.decay),k[g]=(2*Math.random()-1)*Math.pow(1-f/c,a.decay);e.buffer=b;return d},update:function(b,a,c){a=l.backend.ac;var d=b[2],f=b[4];b[3].gain.value=1-2*(c.mix-.5);f.gain.value=1-2*(.5-c.mix);b=a.sampleRate*c.time;a=a.createBuffer(2,b,a.sampleRate);f=a.getChannelData(0);var g=a.getChannelData(1),h;for(h=0;h<b;h++){var k=c.reverse?
b-h:h;f[h]=(2*Math.random()-1)*Math.pow(1-k/b,c.decay);g[h]=(2*Math.random()-1)*Math.pow(1-k/b,c.decay)}d.buffer=a}}}};this.Trim=x;this.Copy=r;this.Insert=y;this.InsertFloatArrays=function(a,b){var d=l.backend.buffer,c=b.length,e=b[0].length,f=e*c;a=a/1*d.sampleRate>>0;for(var g=l.backend.ac.createBuffer(d.numberOfChannels,d.length+f,d.sampleRate),h=0;h<d.numberOfChannels;h++){var k=d.getChannelData(h),m=g.getChannelData(h);0<a&&m.set(k.slice(0,a));for(var n=0;n<c;++n)m.set(b[n],a+n*e);a<d.length+
f&&m.set(k.slice(a),a+f)}p(g,d);return[a/d.sampleRate,a/d.sampleRate+f/d.sampleRate]};this.ReplaceFloatArrays=function(a,b){var d=l.backend.buffer,c=b.length,e=b[0].length,f=e*c;a=a/1*d.sampleRate>>0;for(var g=l.backend.ac.createBuffer(d.numberOfChannels,d.length,d.sampleRate),h=0;h<d.numberOfChannels;h++){var k=d.getChannelData(h),m=g.getChannelData(h);0<a&&m.set(k.slice(0,a));for(var n=0;n<c;++n)m.set(b[n],a+n*e);a<d.length+f&&m.set(k.slice(a+f),a+f)}p(g,d);return[a/d.sampleRate,a/d.sampleRate+
f/d.sampleRate]};this.Replace=function(a,b,d){x(a,b,!0);a=y(a,d);setTimeout(function(){l.drawBuffer()},40);return a};this.MakeSilence=function(a){var b=l.backend.buffer;return l.backend.ac.createBuffer(b.numberOfChannels,a*b.sampleRate,b.sampleRate)};this.DownloadFile=function(a,b,d,c){function e(a){return Math.max(-32768,Math.min(32768,0>a?32768*a:32767*a))}if(!(l&&l.backend&&l.backend.buffer))return!1;q=new Worker("lame.js");var f=l.backend.buffer,g=f.sampleRate,h=f.numberOfChannels,k=f.getChannelData(0),
m=null;2===h&&(m=f.getChannelData(1));f=k.length;var n=0,p=0;d&&(p=d[0]*g>>0,f=(d[1]*g>>0)-p);d=new Int16Array(f);var r=null;if(m)for(r=new Int16Array(f);n<f;)d[n]=e(k[p+n]),r[n]=e(m[p+n]),++n;else for(;n<f;)d[n]=e(k[p+n]),++n;q.onmessage=function(b){if(b.data.percentage)c&&c(b.data.percentage);else{b=new Blob(b.data,{type:"audio/mp3"});b=(window.URL||window.webkitURL).createObjectURL(b);var d=document.createElement("a");d.href=b;d.download=a?a:"output.mp3";d.style.display="none";document.body.appendChild(d);
d.click();c&&c("done");q.terminate();q=null}};q.postMessage({sample_rate:g,kbps:b?b:128,channels:h});q.postMessage(d.buffer,[d.buffer]);m?q.postMessage(r.buffer,[r.buffer]):q.postMessage(null)};this.DownloadFileCancel=function(){q&&(q.terminate(),q=null)}}})(PKAudioEditor);