/* -*- javascript -*- 
     Copyright 2007 Universität Potsdam.
     All Rights Reserved
     System        : JSBARCHART_JS : 
     Object Name   : $RCS_FILE$
     Revision      : $REVISION$
     Date          : Thu Mar 8 13:44:11 2007
     Created By    : Dr. Detlef Groth, Universität Potsdam
     Created       : Thu Mar 8 13:44:11 2007

     Last Modified : <070308.1352>
     ID            : $Id$
     Source        : $Source$
     Description	
     Notes
*/
function JSBarChart(element) {
    var tbl = element.getElementsByTagName("TABLE").item(0) ;
  
    var tds = tbl.getElementsByTagName("TD") ;
    var max = 0 ;
    var color =       "#f33" ;
    for (var i = 0 ; i < tds.length -1 ; i = i +2 ) {
        var j = i + 1;
        var val = parseInt(tds.item(j).innerHTML) ;
        if (val > max) { max = val ; } 
       
    }
    var tds = tbl.getElementsByTagName("TD") ;
    
    for (var  i = 0 ; i < tds.length -1 ; i = i +2 ) {
        color =       "#f33" ;
        var j = i + 1;
        var div = document.createElement("DIV");
        div.innerHTML = tds.item(j).innerHTML ;
        var perc = parseInt(parseInt(tds.item(j).innerHTML) / max * 100) ;
      
        div.style.width = (perc*3) + "px";
        if (tds.item(j).parentNode.getAttribute("regionColor")) {
            color = tds.item(j).parentNode.getAttribute("regionColor") ;
        }
       
        div.style.backgroundColor = color;
        div.style.border = "1px solid #aaa" ;
        /*        div.style.padding = "0px" ;*/
        tds.item(j).appendChild(div);
        tds.item(j).removeChild(tds.item(j).firstChild);
    }
}
