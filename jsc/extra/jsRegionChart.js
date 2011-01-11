/* -*- javascript -*- 
     Copyright 2007 MPIMG Berlin, Germany.
     All Rights Reserved
     System        : JSREGIONCHART_JS : 
     Object Name   : $RCS_FILE$
     Revision      : $REVISION$
     Date          : Fri Aug 3 08:25:30 2007
     Created By    : Dr. Detlef Groth, MPIMG Berlin, Germany
     Created       : Fri Aug 3 08:25:30 2007

     Last Modified : <070308.1437>
     ID            : $Id$
     Source        : $Source$
     Description	
     Notes
*/
function JSRegionChart (element) {
    var tbl = element.getElementsByTagName("TABLE").item(0) ; 
    var trs = tbl.getElementsByTagName("TR") ;
    var max = 0 ;
    for (var j = 0 ; j < trs.length ; j++) {
        var tds = trs.item(j).getElementsByTagName("TD") ;
        var ths = trs.item(j).getElementsByTagName("TH") ;
        if (tds.length > 2) {
            for (var i = 1 ; i < 3  ; i++ ) {
                var val = parseInt(tds.item(i).innerHTML) ;
                if (""+val != "NaN") {
                    if (val > max) { max = val ; } 
                }
            }
            var td = document.createElement("TD");
            trs.item(j).appendChild(td);
        } else if (ths.length > 2) {
            var th = document.createElement("TH");
            th.appendChild(document.createTextNode("Graph"));
            trs.item(j).appendChild(th);
        }
    }
    for (var j = 0 ; j < trs.length ; j++) {
        color = "#f33" ;
        if (trs.item(j).getAttribute("regionColor")) {
            color = trs.item(j).getAttribute("regionColor") ;
        }
        var tds = trs.item(j).getElementsByTagName("TD") ;
        if (tds.length > 2) {
            var start = parseInt(tds.item(1).innerHTML) ;
            var end = parseInt(tds.item(2).innerHTML) ;
            var perc = parseInt(start / max * 100) ;
            var div2 = document.createElement("DIV");
            var perc2 = parseInt((end-start) / max * 100) ;
            div2.style.width = (perc2*3) + "px";
            div2.style.height = "15px";
            div2.style.backgroundColor = color ;
            div2.style.border = "1px solid #aaa" ;
            div2.style.marginLeft= (perc*3)+20 + "px";
            tds.item(tds.length-1).appendChild(div2);
        }
    }
    
        
}

