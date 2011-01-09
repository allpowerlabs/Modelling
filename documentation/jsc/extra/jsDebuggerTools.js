/* -*- javascript -*- 
     Copyright 2006 MPIMG Berlin.
     All Rights Reserved
     System        : JSDEBUGGERTOOLS_JS : 
     Object Name   : $RCS_FILE$
     Revision      : $REVISION$
     Date          : Thu Nov 23 11:16:31 2006
     Created By    : Dr. Detlef Groth, MPIMG Berlin
     Created       : Thu Nov 23 11:16:31 2006

     Last Modified : <061125.0615>
     ID            : $Id$
     Source        : $Source$
     Description	
     Notes
     */
function JSDebuggerTools (panelJS) {
    //this.panelJS = panelJS ;
    this.listClasses = listClasses ;
    this.toggleBlocks = toggleBlocks ;
    this.toggleStyle = toggleStyle ;
    this.toggleStyleOnOff = toggleStyleOnOff ;
    this.cookieView = cookieView ;
    function newCategory (text) {
        panelJS.appendChild(document.createElement("br"));
        panelJS.appendChild(document.createElement("strong").appendChild(document.createTextNode(text)))
    }
    function newBookmarklet(text,func) {
        var a = document.createElement("a");
        a.appendChild(document.createTextNode("["+text+"] "));
        evtAdd(a,"click",func);
        panelJS.appendChild(a);
    }
    function toggleStyle(link) {
        print ("checking for link: "+link);
        /* check if already includeed */
        var head = document.getElementsByTagName("head")[0] ;
        var styles = head.getElementsByTagName("link");
        for (var i = 0; i < styles.length ;i++) {
            if (styles.item(i).rel == "stylesheet" && styles.item(i).href.match(link)) {
                debug("removed: "+styles.item(i).href);
                if(styles.item(i).disabled) {
                    debug("added: "+styles.item(i).href);   
                    styles.item(i).disabled = false;
                } else {
                    debug("removed: "+styles.item(i).href);
                    styles.item(i).disabled = true ;
                }
                //head.removeChild(styles.item(i));
                return ;
            }
        }
        var newSS=document.createElement("link"); 
        newSS.rel="stylesheet"; newSS.type="text/css"; 
        newSS.href = link; 
        document.getElementsByTagName("head")[0].appendChild(newSS); 
        debug("added: "+link);
    }
    function toggleStyleOnOff (e) {
        var i,x;
        for(i=0;x=document.styleSheets[i];++i) {
            if(x.disabled) {
                x.disabled = false;
            } else {
                x.disabled = true ;
            }
        }
    }
    function cookieView(e) {
        var c = ""+document.cookie;
        var cookies = c.split(";") ;
        debug("Cookies: "+cookies.length);
        for (var i = 0 ; i < cookies.length;i++) {
            debug(""+cookies[i])
        }
        debug("==================================");
        debug("Cookies stored by this host or domain:") ;
    }
    function toggleBlocks (e) {
        toggleStyle("jsc/extra/jsDebugger-blocks.css");
    }
    function listClasses (e) {
        var j = 0 ;
        var els = document.getElementsByTagName("*") ;
        var l = els.length ;
        for(i=0;i < l;i++) {
            if (els.item(i).className && !els.item(i).className.match(/Logger/)) {
                j++ ;
                print("#"+j+" Tag:"+els.item(i).tagName+" Class: "+els.item(i).className);
            }
        }
    }
    newCategory("Styles: ");
    newBookmarklet("List Classes",this.listClasses);
    newBookmarklet("Toggle Blocks",this.toggleBlocks);
    newBookmarklet("Toggle Styles",this.toggleStyleOnOff);
    newCategory("Cookies: ");
    newBookmarklet("View",this.cookieView);
    
}
/*
  var testLoop = function () {
var divs = document.getElementsByTagName("div");
for (var i = 0 ; i < divs.length ; i++) { x = 1+1; }
}
var testLoop2 = function () {
var divs = document.getElementsByTagName("div");
var l = divs.length ;
for (var i = 0 ; i < l ; i++) { x = 1+1; }
}
bench(10000,"testLoop",testLoop);
*/
