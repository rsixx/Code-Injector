
/** get the requested template 
 * 
 * @param {string} _name 
 * @param {function} _cb 
 */
function getTemplate(_name, _cb){

    var elTmpl = document.querySelector('.template[data-name="'+_name+'"]');
    if (elTmpl === null) return null;

    var template = elTmpl.content.cloneNode(true); 
    if (template === undefined) return null;

    if (typeof _cb === 'function') _cb(template);

    return template;
}

/** 
 * loop an array/object 
 * 
 * @param {array|object|HTMLElementsCollection} _obj 
 * @param {function} _fn 
 */
function each(_obj, _fn){

    if (!_obj) return;
    
    if (_obj.constructor === Object){
        for(var ind = 0, keys = Object.keys(_obj), ln = keys.length; ind < ln; ind++)
            if (_fn.call(_obj[keys[ind]], keys[ind], _obj[keys[ind]]) === false) break;
    }
    else{ //if (_obj.constructor === Array){
        for(var ind = 0, ln = _obj.length; ind < ln; ind++)
            if (_fn.call(_obj[ind], ind, _obj[ind]) === false) break;
    }
}

/** 
 * Search from the _el parents the corresponding element with the _fn 
 * 
 * @param {HTMLElement} _el 
 * @param {string|function} _fn 
 */
function closest(_el, _fn) {
    var el = _el;
    var fn = _fn;

    if (typeof fn === 'string'){
        var query = fn.trim();
        if (query[0] === '.') 
            fn = function(_el) { return _el.classList.contains(query.substr(1)); };
        else
        if (query[0] === '#') 
            fn = function(_el) { return _el.id === query.substr(1); };
        else
            fn = function(_el) { return _el.tagName === query.toUpperCase(); };
    }

    while(el) if (fn(el)) return el;
                else el = el.parentElement;

    return null;
}

/**
 * remove the highlight from the page
 */
function clearSelection(){

    if (window.getSelection) 
        window.getSelection().removeAllRanges();

    else 
    if (document.selection)
        document.selection.empty();
}

/** 
 * convert a string to an DOM Element parsing it 
 * with a set of given parameters to be replaced 
 * 
 * @param {string} _string 
 * @param {object} _data 
 */
function stringToElement(_string, _data){

    if (_data && _data.constructor === Object){
        each(_data, function(_key){
            _string = _string.replace(new RegExp('\{'+_key+'\}', 'g'), this);
        });
    }

    var div = document.createElement('div');
        div.innerHTML = _string;

    return div.firstElementChild;
}

/** 
 * get the Element position index in the parent's childs list
 * 
 * @param {Element} _el 
 */
function getElementIndex(_el){

    var index = 0;
    var currEl = _el;

    while(currEl.previousElementSibling){
        currEl = currEl.previousElementSibling;
        index++;
    }

    return index; 
}

/** 
 * check if the given editor contains actual code (tripping the comments)
 * 
 * @param {MonacoEditor} _editor 
 */
function editorHasCode(_editor){ 
    return containsCode(_editor.getValue());
}

/** 
 * check if the given scring contains code (tripping the comments)
 * 
 * @param {string} _string 
 */
function containsCode(_string){
    return !!_string.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*|<!--[\s\S]*?-->$/gm, '').trim();
}

/** 
 * check if the given _path is local or remote 
 * 
 * @param {string} _path 
 */
function isLocalURL(_path){
    return !/^(?:[a-z]+:)?\/\//i.test(_path);
}

/** 
 * get the extension of a given string path (only "js", "css", "html" allowed)
 * 
 * @param {string} _path 
 */
function getPathExtension(_path){

    if (!_path) return '';

    try{
        _path = _path.trim();
        _path = isLocalURL(_path) ? 'file://local/'+_path : 'https://'+_path;

        var url = new URL(_path);
        var spl = url.pathname.split('.');
        var ext = spl.length > 1 && spl[0] && (spl.pop() || '').toLowerCase();
        if (ext === false) ext = '';

        return ext && ['js', 'css', 'html'].indexOf(ext) !== -1 ? ext : '';
    }
    catch(ex){
        return '';
    }    
    
    /*
    if (!_path) return '';

    var splitted = _path.trim().split('.');
    var ext = splitted.length > 1 && splitted[0] && (splitted.pop() || '').toLowerCase();
    if (ext === false) ext = '';

    return ext && ['js', 'css', 'html'].indexOf(ext) !== -1 ? ext : '';
    */
}

/** 
 * try to copy in clipboard a given string
 * 
 * @param {string} _string 
 */
var copyString = (function(){
    
    var el = null;

    if (typeof document !== 'undefined' && document.createElement){
        el = document.createElement('textarea');
        el.id = "clipboard";
        el.setAttribute('tabindex', '-1');
    }

    return function copyString(_string){

        if (!el) return false;

        document.body.appendChild(el);

        el.value = String(_string);
        el.select();

        var res = document.execCommand("copy");

        document.body.focus();

        return res;
    };

}());

/** 
 * get the hostname of a given path
 * 
 * @param {string} _path 
 */
var getPathHost = (function(){
    
    var a = null;

    if (typeof document !== 'undefined' && document.createElement)
        a = document.createElement('a');

    return function(_path){

        if (!a) return _path;

        a.href = _path;

        return a.hostname;
    };

}());