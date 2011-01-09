/* -*- javascript -*- 
     Copyright 2006 MPIMG Berlin, Germany.
     All Rights Reserved
     System        : JSDEBUGGER_JS : 
     Object Name   : $RCS_FILE$
     Revision      : $REVISION$
     Date          : Sun Nov 19 07:59:01 2006
     Created By    : Dr. Detlef Groth, MPIMG Berlin, Germany
     Created       : Sun Nov 19 07:59:01 2006

     Last Modified : <070308.1527>
     ID            : $Id$
     Source        : $Source$
     Description	
     Notes: Based on ideas of David F. Miller and his article: http://www.alistapart.com/articles/jslogging/
     */
function JSDebugger (element) {
    var TITLE = "JSDebugger" ;
    var LICENSE= "LGPL 2.1 http://creativecommons.org/licenses/LGPL/2.1/";
    var VERSION = "1.0" ;
    var AUTHOR = "Dr. Detlef Groth, http://www.dgroth.de" ;
    var ACK = "\nAfter ideas of David F. Miller in his article at: \n http://www.alistapart.com/articles/jslogging/"
    var div = document.createElement("div");
    this.showAll = showAll ;
    this.showPrint = showPrint ;
    this.showBench = showBench ;
    this.showDebug=showDebug ;
    this.showWarn=showWarn;
    this.showError = showError ;
    this.showFatal = showFatal;
    this.eraseLog = eraseLog ;

    this.evalCode = evalCode ;
    this.addMessage = addMessage;
    this.windowError = windowError ;
    this.showAbout = showAbout;

    window.onerror = windowError ;
    div.className = "JSTabs2" ;
    //div.setAttribute("id","jsDebugger");
    // build the debugger
    var ul = document.createElement("ul");
    div.appendChild(ul);
  
    var LEVEL_DEBUG = 1 ;
    var LEVEL_PRINT = 2 ;
    var LEVEL_BENCH = 3 ;
    var LEVEL_WARN = 4 ;
    var LEVEL_ERROR = 5 ;
    var LEVEL_FATAL = 6 ;
    var texts = new Array("all","debug","print","bench","warn","error","fatal","erase","about");
   
    for (var i = 0 ; i < texts.length; i++) {
      
        var li = document.createElement("li");
        li.className = "Logger"+i;
        li.appendChild(document.createTextNode(" "+texts[i]+" "));
        li.setAttribute("title", "show "+ texts[i]);
        var funcText ;
        if (texts[i] == "erase") {
            funcText = "this.eraseLog;"; 
        } else {
            funcText = "this.show"+texts[i].slice(0,1).toUpperCase()+texts[i].slice(1)+";";
        }
       
        funcText = "f = "+funcText ;
        eval (funcText);
        evtAdd(li,"click",f);
        ul.appendChild(li);
    }
    var mlog = document.createElement("ul"); 
    mlog.setAttribute("id","logger");
    var form = document.createElement("form");
    form.setAttribute("name","jseval");
    var ide = document.createElement("div");
    ide.className = "JSTabBox";
    var items =Array("JS","CSS");
  
    for (var i = 0; i < items.length; i++) {
        var t = items[i];
        var panelJS = document.createElement("div");
        panelJS.className = "JSTabPanel";
        panelJS.setAttribute("title",t+" Eval");
        ide.appendChild(panelJS);
        // build a interactive javascript console
       
        
        var text = document.createElement("textarea");
        text.setAttribute("name",t + "EvalCode");
        text.setAttribute("id",t+"EvalCode");
        text.setAttribute("cols",53);
        text.setAttribute("rows",10);
        var button = document.createElement("input");
        button.setAttribute("type","button");
        evtAdd(button,"click",this.evalCode);   
        button.setAttribute("value",t+" Eval Code");
        button.setAttribute("name",t+ " Eval Code");
        panelJS.appendChild(text);
        panelJS.appendChild(document.createElement("br"));
        panelJS.appendChild(button);
    }
    var panelJS = document.createElement("div");
    panelJS.className = "JSTabPanel";
    panelJS.setAttribute("id","JSDebuggerToolsPanel");
    panelJS.setAttribute("title","Tools");
    try {
        JSDebuggerTools(panelJS);
    } catch (ev) {}
    ide.appendChild(panelJS);

    jsComponent(ide);
    form.appendChild(ide);
    element.appendChild(div);
   
    element.appendChild(mlog);
    element.appendChild(document.createElement("br"));
    element.appendChild(form);
   
    function addMessage(message,level) { 
        var logger = document.getElementById("logger");
        var li = document.createElement("li");
        li.className="Logger"+level;
        li.appendChild(document.createTextNode(message));
        //logger.insertBefore(li,logger.firstChild);
        logger.appendChild(li);
        showLevel(0);   

    }
    function iwarn (message)  { this.addMessage(message,LEVEL_WARN);  }
    function idebug (message) { this.addMessage(message,LEVEL_DEBUG); }
    function iprint (message) { this.addMessage(message,LEVEL_PRINT); }
    function ierror (message) { this.addMessage(message,LEVEL_ERROR); }
    function ibench (j,message,func) { 
        var start = new Date().getTime();
        for (var i = 0 ; i<j;i++) {
            func() ;
        }
        var end = new Date().getTime();
        this.addMessage("Total:     "+message+" "+((end-start)/1000+" seconds"),LEVEL_BENCH);
        this.addMessage("Iteration: "+message+" "+((end-start)/j+" millseconds"),LEVEL_BENCH);
    }
    function windowError(message, url, line,except) {
	//this.addMessage('Error on line ' + line + ' of document ' + url + ': ' + message, LEVEL_FATAL);
        if(except.message) {
            message = except.message ;
        }
        var origMessage = message ;
        message = message.replace(/Statement on line [0-9]+:/,"");
        if (message.search(/Backtrace:/) > 0) {
            message = message.slice(0,message.search(/Backtrace:/)) ;
        }
        if (message != origMessage) {
            this.addMessage('Fatal: '+ message +" ("+origMessage+")", LEVEL_FATAL);
        } else {
            this.addMessage('Fatal: '+ message, LEVEL_FATAL);
        }
	return true; 
    }
    
    function loadScript(url) {
        var newScript = document.createElement("script");
        newScript.src =url ;
        newScript.type ="text/javascript" ;
        document.getElementsByTagName("head")[0].appendChild(newScript); 
    }
    function loadStyle(url) {
        var newSS=document.createElement("link"); 
        newSS.rel="stylesheet"; newSS.type="text/css"; 
        newSS.href = url; 
        document.getElementsByTagName("head")[0].appendChild(newSS); 
    }
    function evalCode (e) {
        e = e || window.event ;
        var el = evtGetTarget(e);
        var id = el.value.replace(/ /g, "");
        var ta = document.getElementById(id);
        if (id == "JSEvalCode")  {
            try {
                eval(ta.value);
            } catch (e) {
                windowError(null, null, null, e);
                
            } 
        } else {
            // css code
            var head = document.getElementsByTagName("head")[0];
            var style = document.createElement("style");
            style.type = "text/css" ;
            var mtext = ta.value ;
            if (style.styleSheet) {
                // IE has it's own non DOM way ;
                mtext=mtext.replace(/\n/g, " ");
                var reg = new RegExp("(.*){(.*)}") ;
                var index = mtext.indexOf("}");
                while (index > 0) {
                    reg.exec(mtext.slice(0,index+1));
                    var r1 = RegExp.$1;
                    var r2 = RegExp.$2 ;
                    if (r1.indexOf("{") > -1 || r1.indexOf(";") > -1) {
                        error("missing or wrong setting of curly braces inside :"+r1);
                        break ;
                    } else {
                        r1 = r1.replace(/^ /g,"").replace(/ +$/,"");
                        style.styleSheet.addRule(r1,r2);
                        mtext=mtext.slice(index+2);
                        index = mtext.indexOf("}");
                    }
                }
            } else {
                style.appendChild(document.createTextNode(mtext)) ;
            }
            head.appendChild(style);
        }
    }
    function showLevel (Level) {
        var logger = document.getElementById("logger");
        var lis = logger.getElementsByTagName("li");
        var l = lis.length ;   
        for (var i = 0; i < l; i++) { 
            if (lis.item(i).className=="Logger"+Level || Level == 0) {
                lis.item(i).style.display = "" ;
            } else {
                lis.item(i).style.display = "none" ;
            }
        }
    }
    function showAll ()   { showLevel(0);             }
    function showPrint () { showLevel(LEVEL_PRINT);   }    

    function showDebug () { showLevel(LEVEL_DEBUG);   }
    function showBench () { showLevel(LEVEL_BENCH);   }
    function showWarn ()  { showLevel(LEVEL_WARN);    }
    function showError () { showLevel(LEVEL_ERROR);   }
    function showFatal () { showLevel(LEVEL_FATAL);   }
    function eraseLog () {
	if (confirm("Are you sure you wish to erase the log?")) {
            var logger = document.getElementById("logger");
            var lis = logger.getElementsByTagName("li");
            var l = lis.length ;
            for (var i = 0; i < l; i++) { logger.removeChild(lis[l - i - 1]); }
	}
        
    }
    function showAbout() {
        alert(TITLE+" "+VERSION+"\n"+AUTHOR+"\nLicense: "+LICENSE+ACK);
    }
    print = iprint ;
    debug = idebug ;
    error = ierror;
    warn = iwarn;
    bench = ibench ;
    
}
// public methods to be used inside your JavaScript-Code
var print, debug, warn, error, bench ; 

