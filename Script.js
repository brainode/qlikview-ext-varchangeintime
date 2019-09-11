var BasicValues = [1,2];
const qvDoc = Qv.GetCurrentDocument();

//Standart session time is ~30m
const sessionTime = 1000*60*25;//TODO.Set this variable in extension parameter.
const keepSessionVar = btoa(Date.now().toString()+"session");
const nowTimestamp = btoa(Date.now().toString());

var interval = setInterval(function() { 
   qvDoc.SetVariable(varName,varValues[curIndex]);
   if(curIndex<varValues.length-1){
      curIndex++;
   } else{
      curIndex=0;
   }
   thisObj.VarChanger.curIndex=curIndex;
}, intervalTime);


function init(){  
   Qv.AddExtension("VarChangerInTimesOfDay",
    function(){
        root = this;
        var varName = this.Layout.Text0.text;
        var varValues = this.Layout.Text1.text.split(',');
        var varTimeEdges = this.Layout.Text2.text.split(',');
        if(!root[keepSessionVar]){
            root[keepSessionVar]= setInterval(function() { 
               qvDoc.SetVariable("sessionHandleVar",1);
            }, sessionTime);
        }
        if(!root[nowTimestamp]){
         var timeEdges = "10:00,18:00";
         var times = timeEdges.split(',');
         var nowDate = new Date();
         var closestEdge = 0;
         var firstReloadDate = new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate(),times[0].split(':')[0],times[0].split(':')[1]);
         var secondReloadDate = new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate(),times[1].split(':')[0],times[1].split(':')[1]);
         var firstSubstr = firstReloadDate - nowDate;
         var secondSubstr = secondReloadDate - nowDate;
         if(firstSubstr>0){
            closestEdge=1;
         }else{
            
         }
         root[keepSessionVar] = {varname:varName,values:varValues,timeEdges:varTimeEdges,timer:null};
            root[keepSessionVar]= setInterval(function() { 
               qvDoc.SetVariable("sessionHandleVar",1);
            }, sessionTime);
        }
         
   });
}

init();
