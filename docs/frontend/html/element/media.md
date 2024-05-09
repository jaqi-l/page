

### video元素
#### video支持的格式：

Ogg=支持的浏览器有：Firefox、Opera、Chrome

MPEG4=支持的浏览器有：IE9+、Chrome、Safari

虽然目前应用较广，单有专利保护，是收费在

WebM=支持的浏览器有：Chrome、Opera、Safari

专门为网页传播而设计在，清晰度高，压缩率也很高，并且开源免费，未来可能会成为主流。目前国外大在视频网站很多采用

#### video属性：

src:要播放的视频的 URL地址。

width/height:设置视频播放器的宽度/高度。

autoplay:视频在就绪后自动播放。

loop:循环播放

control:向用户显示控件，比如播放按钮

### audio元素
#### audio支持的格式：

Ogg=支持的浏览器有：Firefox、Opera、Chrome 

MP3=支持的浏览器有：IE9+、Chrome、Safari

WAV=支持的浏览器有：Firefox、Chrome、Safari

#### audio属性：

src:要播放的视频的 URL地址。

control:向用户显示控件，比如播放按钮

autoplay:视频在就绪后自动播放。

loop:循环播放

preload:音频在页面加载时是否进行加载，并预备播放。一般不需要设置，使用默认值即可。

### source元素-解决浏览器额兼容
video和audio元素的子元素，可指定多个文件来源，用来解决浏览器的兼容问题

如果使用了source元素，则不可以在video和audio中设置src属性

### embed/object元素
embed定义嵌入的内容，比如插件。

embed用来嵌入对象，比如flash，但是能否正常显示，取决于浏览器是否支持或是否安装有相应的插件

embed元素的属性有src、type、width、height

object定义定义一个嵌入的对象，用于包含对象，比如图像、音频、视频、以及 Flash。

object只是用来嵌入对象，但是能否正常显示，同样取决于浏览器是否支持或是否安装有相应的插件