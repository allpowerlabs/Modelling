/* -*- javascript -*- 
     All Rights Reserved
     System        : JSHELLOWORLD_JS : 
     Object Name   : $RCS_FILE$
     Revision      : $REVISION$
     Date          : Wed Jul 2 11:50:37 2008
     Created By    : Dr. Detlef Groth
     Created       : Wed Jul 2 11:50:37 2008

     Last Modified : <080702.1212>
     ID            : $Id$
     Source        : $Source$
     Description	
     Notes
*/

function JSHelloWorld (element) {
    element.innerHTML = "Hello World!";
    this.changeColor=changeColor;
    evtAdd(element,"click",this.changeColor);
    var colors=new Array("red","blue");
    var x= 0;
    function changeColor (evt) {
        var el=evtGetTarget(evt);
        idx= x++ % 2;
        el.style.color=colors[idx];
    }
}
