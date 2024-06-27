# ![](https://avatars1.githubusercontent.com/u/8237355?v=2&s=50) Grav

Grav is a **Fast**, **Simple**, and **Flexible**, file-based Web-platform.  There is **Zero** installation required.  Just extract the ZIP archive, and you are already up and running.  It follows similar principles to other flat-file CMS platforms, but has a different design philosophy than most. Grav comes with a powerful **Package Management System** to allow for simple installation and upgrading of plugins and themes, as well as simple updating of Grav itself.

The underlying architecture of Grav is designed to use well-established and _best-in-class_ technologies to ensure that Grav is simple to use and easy to extend. Some of these key technologies include:

* [Twig Templating](https://twig.symfony.com/): for powerful control of the user interface
* [Markdown](https://en.wikipedia.org/wiki/Markdown): for easy content creation
* [YAML](https://yaml.org): for simple configuration

# Requirements

PHP 7.3.6 or higher. Check the [required modules list](https://learn.getgrav.org/basics/requirements#php-requirements)
Check the [Apache](https://learn.getgrav.org/basics/requirements#apache-requirements) requirements.Below requirements observed in above website links
1. Web Server (Apache, Nginx, LiteSpeed, Lightly, IIS, etc.)
2. PHP 7.3.6 or higher

# PHP Requirements
* curl (client for URL handling used by GPM)
* ctype (used by symfony/yaml/Inline)
* dom (used by grav/admin newsfeed)
* gd (a graphics library used to manipulate images)
* json (used by Symfony/Composer/GPM)
* mbstring (multibyte string support)
* openssl (secure sockets library used by GPM)
* session (used by toolbox)
* simplexml (used by grav/admin newsfeed)
* xml (XML support)
* zip extension support (used by GPM)
Make sure whether all above modules are present or install properly during PHP installation.

_**To check whether this above are installed or not** _

* you will  find the **php.ini** file  in _C:\xampp\php\php.ini_  configuration file. now open that file in **VS code** and  **ctrl+f** to find the extensions.
```
;extension=openssl.so
;extension=zip.so
```
And remove the leading semicolon. To enable the modules which require modules are missing.

# Webservers
- Grav is so simple and versatile that you don't even need a web server to run it. You can run it directly off the built-in PHP webserver, as long as you're running PHP 7.3.6 or later.

- Testing with the built-in webservers is a useful way to check a Grav install and perform some brief development, but it is not recommended for a live site or even for advanced development tasks. We've outlined how in our Installation guide.

- Even though technically you do not need a standalone web server, it is better to run one, even for local development. There are many great options available:

### Mac
- MacOS 10.14 Mojave already ships with the Apache Web server and PHP 7.1, so job done!
1. MAMP/MAMP Pro comes with Apache, MySQL and of course PHP. It is a great way to get more control over which version of PHP you are running, setting up virtual hosts, plus other useful features such as automatically handling dynamic DNS.
2. AMPPS is a software stack from Softaculous enabling Apache, PHP, Perl, Python,.. This includes everything you need (and more) for GRAV development.
3. Brew Apache/PHP is an alternative approach that allows a fully configurable installation with various PHP versions.

> **Note:** Any one of them should present in your system based on your requirement

### Windows
1. Laragon portable, isolated, fast & powerful universal development environment for PHP, Node.js, and more. It is fast, lightweight, easy-		to-use and easy-to-extend.
2. XAMPP provides Apache, PHP, and MySQL in one simple package.
3. EasyPHP provides a personal Web hosting package as well as a more powerful developer version.
4. MAMP for Windows is a long-time Mac favorite, but now available for Windows.
5. IIS with PHP is a fast way to run PHP on Windows.
6. AMPPS is a software stack from Softaculous enabling Apache, PHP, Perl, Python,.. This includes everything you need (and more) for GRAV development.
7. Linux Subsystem is a great way to Run a linux-like environment on Windows

> **Note:** Any one of them should present in your system based on your requirement

# Documentation
#### If you face any difficulty while installing please visit official documentation given below
The full documentation can be found from [learn.getgrav.org](https://learn.getgrav.org).

# QuickStart
Once you installed the PHP check whether it installed properly by following command:
* open the **cmd** prompt, Enter
```
php --version
```
you can see the php version **ex: v4.2.12,** in command prompt.
_whooohooo..! You did well🥳..._

### Downloading a Grav Package

You can download a **Grav Application** package from my  Github Repo [https://github.com/Rangha-Vardhan-1552/GravCMS_UpdatedAPP](https://github.com/Rangha-Vardhan-1552/GravCMS_UpdatedAPP)

### From GitHub

1. Clone the Grav repository from [https://github.com/Rangha-Vardhan-1552/GravCMS_UpdatedAPP]() to a  specific folder in your system
2. e.g. `GravApp`. Launch a **terminal** or **console** and navigate to the GravApp folder:
   ```
   $ cd GravApp
   $ git clone https://github.com/Rangha-Vardhan-1552/GravCMS_UpdatedAPP
   ```
   
> **Note:** Ensure that php version should be able to see even you check  in Grav App folder as well . If not ,check the enviornmental variable path  set correctly or not.
> you can observe the path like : **C:\xampp\php **.

### Run Application
Now it's time to Run the application ,If  above steps are clear you are ready to make application run🤩
```
php -S localhost:8000 system/router.php
```
> **Note** Make sure you should be in your root folder i.e. GravApp folder ,here

>_If there  every things works fine then  following  line is observed <br/> **Wed May 29 21:26:02 2024] PHP 8.2.12 Development Server (http://localhost:8000) started**_

Visit [http://localhost:8000](http://localhost:8000)

> _**Whooohoo🥳🤩..! Awesome, Now you are seeing the Grav Application**_

# Ollama Installation
### What is OLLAMA?
OLLAMA is a cutting-edge platform designed to run open-source large language models locally on your machine. It takes the complexity out of the equation by bundling model weights, configuration, and data into a single package defined by a Modelfile. This means you no longer have to worry about intricate setup and configuration details, including leveraging your GPU for better performance.

### Features and Benefits
* **Simplicity:** OLLAMA offers a straightforward setup process. You don't need a PhD in machine learning to get it up and running.

* **Cost-Effectiveness:** Running models locally means you're not racking up cloud costs. Your wallet will thank you.

* **Privacy:** With OLLAMA, all data processing happens on your local machine. This is a big win for user privacy.

* **Versatility:** OLLAMA is not just for Python aficionados. Its flexibility allows it to be used in various applications, including web development.

### How to Set Up OLLAMA 
#### Windows
Setting up OLLAMA on Windows is a breeze. Here's how:
1. **Download the Executable:** Visit the official OLLAMA GitHub repository and download the latest Windows executable.
     ```
     git clone https://github.com/jmorganca/ollama.git	
     ```
     
     **or**
     
	> visit the website [Ollama install](https://ollama.com/download/windows)

2. **Run the Installer:** Double-click the downloaded executable to start the installation process. Follow the on-screen instructions.
3. **Open Command Prompt:** Once installed, open the Command Prompt and navigate to the directory where OLLAMA is installed.
 	```
    cd path/to/ollama
    ```
    _ex: C:\Users\username\Downloads_>
    
4. **Run OLLAMA:** Use the following command to run OLLAMA.
	```
    ollama.exe run
    ```
5. **Verify Installation:**
	After the installation is complete, you can verify that Ollama is installed correctly by running:
    ```
    ollama --version
    ```
And that's it! You've successfully set up OLLAMA on a Windows machine. The process is straightforward, and within minutes, you'll be ready to run local language models on your Windows PC.

#### Mac
**To install Ollama on a Mac, follow these steps:**
1. **Install Homebrew** (if you haven't already):
    Homebrew is a package manager for macOS that makes it easy to install software.
    Open the Terminal application and run the following command:
    ```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
2. **Install Ollama:**
	Once Homebrew is installed, you can use it to install Ollama.
    In the Terminal, run the following command:
    ```
    brew install ollama
    ```
3. **Verify Installation:**
	After the installation is complete, you can verify that Ollama is installed correctly by running:
    ```
    ollama --version
    ```
This command should display the version of Ollama that has been installed, confirming a successful installation.

## OLLAMA Shell Commands: 
Once you've got OLLAMA up and running, you'll find that the shell commands are incredibly user-friendly. Here are some basic commands to get you started:
* **List Models:** To see the available models, use the ollama list command.
	```
    ollama list
    ```
* **Run a Model:** To run a specific model, use the ollama run command followed by the model name.
	```
    ollama run <model_name>
    ```
* **Stop a Model:** To stop a running model, you can use the ollama stop command.
	```
    ollama stop <model_name>
    ```
    
These are the basic commands for OLLAMA.

 
# License

See [LICENSE](LICENSE.txt)

