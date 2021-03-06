<img src="http://www.spazioseme.com/wp-content/uploads/2016/08/work_in_progress-350x345.jpg" style="width: 350px; height: 345px;">

# Code-Injector
A [WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions) based addon which let the user inject code into the websites

> This is an add-on which requires a minimum of knowledge of web programming to be able to properly use it.  

- [Purpose](https://github.com/Lor-Saba/Code-Injector.git#purpose)
- [Injection flow](https://github.com/Lor-Saba/Code-Injector#injection-flow)
- [How to Import / Export](https://github.com/Lor-Saba/Code-Injector#import--export)
- [Installation](https://github.com/Lor-Saba/Code-Injector#installation)
- [Files](https://github.com/Lor-Saba/Code-Injector#files)
- [URL pattern](https://github.com/Lor-Saba/Code-Injector#url-pattern)
- [What's next](https://github.com/Lor-Saba/Code-Injector#whats-next)
- [Changelog](https://github.com/Lor-Saba/Code-Injector#changelog)
- [Credits](https://github.com/Lor-Saba/Code-Injector#credits)
- [Info](https://github.com/Lor-Saba/Code-Injector#info)

## Purpose

There are several sites with invasive popups / login screens, a messy layout or some missing capabilities.  
I was usually getting around these boring stuff by opening the browser console to edit the DOM style and structure but it was starting to get tiring doing it everytime, so why not making and extension which do it by itself in background?

## Video & Screenshots

[<img src="readme-resources/screenshots/1.png" alt="screenshot" height="100"/>](https://raw.githubusercontent.com/Lor-Saba/Code-Injector/master/readme-resources/screenshots/1.png)
[<img src="readme-resources/screenshots/2.png" alt="screenshot" height="100"/>](https://raw.githubusercontent.com/Lor-Saba/Code-Injector/master/readme-resources/screenshots/2.png)
[<img src="readme-resources/screenshots/3.png" alt="screenshot" height="100"/>](https://raw.githubusercontent.com/Lor-Saba/Code-Injector/master/readme-resources/screenshots/3.png)
[<img src="readme-resources/screenshots/4.png" alt="screenshot" height="100"/>](https://raw.githubusercontent.com/Lor-Saba/Code-Injector/master/readme-resources/screenshots/4.png)
[<img src="readme-resources/screenshots/no_photo.jpg" alt="screenshot" height="100"/>]()
[<img src="readme-resources/screenshots/no_photo.jpg" alt="screenshot" height="100"/>]()
[<img src="readme-resources/screenshots/no_photo.jpg" alt="screenshot" height="100"/>]()
[<img src="readme-resources/screenshots/no_photo.jpg" alt="screenshot" height="100"/>]()

## Injection flow

The injection starts when a navigation is committed. (when the DOM is still loading)  
Anyway, a rule can be set up to be injected on page load.  
*(after the document and all its resources have finished loading)*  

The rules whose path match with the page address will be selected and queued for injection. (from top to bottom) 

Each rule may contain **JavaScript**, **CSS**, **HTML** and **Files** and will be splitted and injected with following order:  

 1. Files (from top to bottom) 
 2. CSS
 3. HTML
 4. JavaScript

Each rule will inherit the previous injected code. (same for files)  


## Import / Export

>**IMPORTANT :**   
Because of a security restriction the addon cannot create and save a file directly to the user system. For this reason the export is handled by using the user clipboard so that the user can save it by himself.  

You can import and export from the settings page.  

- To export press on the `export` button.  
If successful you should have in your clipboard a *JSON* describing the rules list. Paste and save it where you want.   

 - To import press on the `import` button.  
 Navigate into your system and select a file containing a valid *JSON* of rules list.   


*<small>( a message should appear to tell whether the operation is successful or not )</small>* 

## Installation

You can find and install this extension from the browsers store pages:

[<img title="Firefox" src="readme-resources/firefox.png"   style="width: 64px;"/>]()
[<img title="Chrome"  src="readme-resources/chrome.png"    style="width: 64px;"/>]()
[<img title="Opera"   src="readme-resources/opera.png"     style="width: 64px;"/>]()
<img title="Edge"    src="readme-resources/no_edge.png"    style="width: 64px;"/>
<img title="Safari"  src="readme-resources/no_safari.png"  style="width: 64px;"/> 

otherwise you can download, build and install the repository manually.  

- download the repository,
- launch `npm install` to download the dev-dependencies,
- launch `grunt` to build the extension,
- a *dist* folder should have been generated containing the local version of Code-injector,
- load that folder into your browser:  

  - **Firefox:**  
  go to `about:debugging` and load it as temporary extension

  - **Chrome:**  
  Options > More tools > Extensions > Load unpacked extension...  

  - **Opera:**  
  Extensions > Developer mode > Load unpacked extension...  

  - **Edge:**  
  ???  

  - **Safari:**  
  ???


## Files

Each rule can contain a list of files.  

While typing the file path, an icon should appear on the right side of the input area indicating whether the file is remote or local and it's type (js/css/html) in blue.  
If the file extension is not recognized as one of the 3 types mentioned above then the icon will show a red "X" on the edge and the file won't be injected.  

>**Note:**  
>You can force the file type by clicking on the icon and selecting the supposed language from the dropdown menu.

## URL pattern

The URL pattern specifies in what pages the rule should be applied.  

When a page is opened, the pattern will be matched against the full address of the new page, if the pattern corresponds with that address, then the code contained in the rule will be injected into the page.  

The URL pattern follows the ECMAScript (a.k.a. JavaScript) regular expressions syntax, see [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) for more detailed information.  

The add-on helps you on checking whether the pattern is correct by highlighting it in blue if it matches with the address of the current page and highlight it in red if it is invalid.  

In depth example in case of *google* as url pattern:  
<small style="color: #555">(this example is just for knowledge purposes)</small>  

```javascript
    // the URL pattern "google" is passed 
    // as argument to the RegExp constructor.
    new RegExp("google");

    // resulting in..
    /google/

    // assuming https://www.google.com as page address:
    /google/.test("https://www.google.com");

    // if TRUE the rule will be injected

```  

> **Note:**  
> Because the URL pattern text box is meant to contain only a regular expression, the forward slashes / used as delimiters in the JavaScript language are not needed.  
*You should therefore write `hello world` instead of `/hello world/`*.

## What's next 

I would like to make it more and more easy to use so that even who's new to programming can use this add-on with ease.

## Changelog

### **[1.0.0]()**  <small><small>( ?? / ?? / ???? )</small></small>
* base release of Code-Injector

## Credits

- Code editors handled using [monaco-editor](https://github.com/Microsoft/monaco-editor).
- WebExtensions API normalized using [webextension-polyfill](https://github.com/mozilla/webextension-polyfill).
- Buttons icons by [material-design-icons](https://github.com/google/material-design-icons).
- A thank you to [@JD342](https://github.com/JD342) for the help provided in the testing process and for the [Icon](https://github.com/JD342/code-injector-icons)!

## Info

Web Injector is written and maintained by [L.Sabatelli](https://github.com/Lor-Saba)  
Licenze: [GPL](https://www.gnu.org/licenses/quick-guide-gplv3.html)
