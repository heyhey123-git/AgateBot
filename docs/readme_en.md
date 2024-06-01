# Plugin Introduction

## Language
[Simplified Chinese](../README.md) | English

## Table of Contents

<a href="#sec1">Introduction</a>

<a href="#sec2">Installation</a>

<a href="#sec3">Configuration</a>

<a href="#sec4">Extension Plugins</a>

<a href="#sec5">Feedback and Issues</a>

<h2 id="sec1">Introduction</h2>

AgateBot is a QQ bot plugin designed to integrate with BDS and a certain OneBot plugin for LiteLoaderQQNT. It follows the OneBot 11 standard and provides developers with the necessary interfaces to create their own custom robot plugins.

### Why Choose AgateBot?

- **Comprehensive Features:**
  AgateBot supports nearly all OneBot 11 interfaces, allowing you to easily customize your robot using these APIs. There are up to 39 APIs and 16 listeners available.

- **Efficient Development:**
  Detailed development guides and installation instructions are provided in the documentation and d.ts files, reducing the time spent searching for information.

- **Open Source and Free:**
  AgateBot is released under the GPL-3.0 license, making it freely available for learning and feedback. If you have any suggestions or feedback, feel free to raise them in the issues or discussion section.

<h2 id="sec2">Installation</h2>

### Installing QQNT and Its Plugins

- **For Windows Users:**
  - You can use the [one-click installer](https://github.com/super1207/install_llob/releases) to install QQNT and its plugins.

- **For Linux Users:**
  1. First, install QQNT from the official website.
  2. Next, use the [one-click installer for LiteLoaderQQNT](https://github.com/Mzdyl/LiteLoaderQQNT_Install/releases).
  3. Download the [AgateBot plugin](https://github.com/LLOneBot/LLOneBot/releases).
  4. Place the plugin in the `plugins` folder within the data directory indicated by LiteLoaderQQNT settings. The structure should look like this:
     ```bash
     ├── plugins
     │   ├── YourPluginName
     │   │   └── manifest.json
     │   │   └── node_modules/...
     ```

### Installing AgateBot

- **Using `lip`:**
  ```bash
  lip install github.com/heyhey123-git/AgateBot
  ```
- **Downlown from release:**
    Download the latest [release](https://github.com/heyhey123-git/AgateBot/releases), unzip it, and place it in the `./plugins/ `directory.

<h2 id="sec3"> Configuration </h2>

The configuration file is located at `./plugins/AgateBot/config/config.json` and is automatically generated after the server starts. Here's what it contains:

```jsonc
{
    "Bot_Host": "ws://localhost:3001", // The address and port of the robot, corresponding to the QQ settings - Robot Plugin - Forward WebSocket Service Listening Port
    "max_Reconnection_Times": 0, // Maximum automatic reconnection times when the connection fails. If set to 0, it will keep retrying.
    "language": "zh_CN" // Language (default is en_US). The plugin supports Chinese and English.
}
```

The configuration files for extension plugins are determined by those plugins themselves.

<h2 id="sec4"> Extension Plugins </h2>

You can place extension plugins for this bot either inside the "plugins" folder within the AgateBot directory (as sub-plugins) or independently outside the plugin folder. The choice won't affect the ability to call the interfaces provided by this plugin.

### Sub-Plugins (Inside the AgateBot Folder)

For sub-plugins placed inside the "plugins" folder within the AgateBot directory, the file structure should be as follows:

```bash
├── AgateBot
│   ├── plugins
│   │   ├── YourPluginName
│   │   │    └── manifest.json
│   │   │    └── index.js...
```

The `manifest.json` file contains information about the sub-plugin:

```jsonc
{
    "name": "atInformation", // Plugin name
    "entry": "index.js", // Entry file for the plugin
    "description": "Forward messages to and from BDS and QQ group to each other." // Other information...
}
```

### Usage of Interfaces

For details on how to use the interfaces, please refer to the [API documentation](./API/API_en.md).

<h2 id="sec5"> Feedback and Issues </h2>

If you have any feedback or encounter issues, feel free to raise them in the [issues section](https://github.com/heyhey123-git/AgateBot/issues) or discuss them in the Minebbs forum. Additionally, if you have any improvements or ideas, you're welcome to submit a pull request on GitHub.