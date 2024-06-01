<h1>插件介绍</h1>

## 语言
简中 | [English](./docs/readme_en.md)

<h2>目录</h2>

<a href="#sec1">简介</a>

<a href="#sec2">安装</a>

<a href="#sec3">配置</a>

<a href="#sec4">扩展插件</a>

<a href="#sec5">反馈与问题</a>

<h2 id="sec1">简介</h2>
AgateBot,是一个计划将BDS与[LiteLoaderQQNT](https://github.com/LiteLoaderQQNT/LiteLoaderQQNT)的某个onebot插件进行对接的QQ机器人插件，采用OneBot11标准，并可为开发者提供自行编写机器人插件所需的接口。

<h3>为什么选择AgateBot？</h3>

- ___特性完善___

对接onebot11几乎所有接口，因此你可以方便地使用这些接口定制出你想要的机器人，api多达39种，监听器多达16种

- ___开发高效___

文档和d.ts文件为你提供了详细的开发指南与安装教程，降低查找资料的时间成本

- ___开源和免费___

本插件采用GPL-3.0协议免费开源，供大家学习与批评。若对插件有何意见与反馈，可以在issues里或者讨论区里提出


<h2 id="sec2">安装</h2>
<h3>安装qqnt与其插件 </h3>

- ___windows用户___

<a href="https://github.com/super1207/install_llob/releases">一键安装</a>

- ___Linux用户___

首先，在官网安装qqnt

<a href="https://github.com/Mzdyl/LiteLoaderQQNT_Install/releases">一键安装liteloaderqqnt</a>

<a href="https://github.com/LLOneBot/LLOneBot/releases">下载插件</a>，把插件放在qq设置页面中liteloader指示的数据目录当中的plugins文件夹。结构如下：
```bash
├── plugins
│   ├── 插件名
│   │   └── manifest.json
│   │   └── node_modules/...
```

<h3>安装本插件 </h3>

- ___使用lip___
```bash
lip install github.com/heyhey123-git/AgateBot
```
- **Downlown from release:**
    下载最新的[release](https://github.com/heyhey123-git/AgateBot/releases)，解压并放入`./plugins/中`即可


<h2 id="sec3">配置</h2>

配置文件路径：./plugins/AgateBot/config/config.json，开服后自动生成。
```jsonc
{
    "Bot_Host": "ws://localhost:3001",//机器人的端口与地址，与qq中设置-机器人插件-正向WebSocket服务监听端口相对应
    "max_Reconnection_Times": 0,//连接失败时最大自动重连次数，若为0则会一直重连
    "language": "zh_CN"//语言，默认为en_US，插件自带的只支持中英
}
```
扩展插件的配置文件由扩展插件决定。

<h2 id="sec4">扩展插件</h2>

本插件的扩展插件可以放在本插件文件夹内部的"plugins"文件夹中作为本插件的附属插件；扩展插件也可以独立于插件文件夹，不影响调用本插件的接口。
对于放在本插件文件夹内部的plugins文件夹中的扩展插件，文件结构应该为：
```bash
├── AgateBot
│   ├── plugins
│   │   ├── 插件名
│   │   │    └──manifest.json
│   │   │    └──index.js...
```

其中manifest.json文件放置着插件的信息。
```jsonc
{
    "name": "atInformation", //插件名称
    "entry": "index.js",//插件入口文件名
    "description":"Forward messages to and from BDS and QQgroup to each other."//其它信息...
}
```
对于如何使用接口，请见[API介绍](./docs/API/API.md)

<h2 id="sec5">反馈与问题</h2>

对于反馈与问题，您可以在[issues](https://github.com/heyhey123-git/AgateBot/issues)中提出，也可以在minebbs的讨论区中提出。如果你有更好的想法，欢迎在github里PR
