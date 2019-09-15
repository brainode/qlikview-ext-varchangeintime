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
        if(!root.varchangeintimeSessionHandle){
            root.varchangeintimeSessionHandle= setInterval(function() { 
               qvDoc.SetVariable("sessionHandleVar",1);
            }, sessionTime);
        }
        if(!root.varchangeintime){
         var nowDate = new Date();
         var division = 0;
         var firstReloadDate = new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate(),varTimeEdges[0].split(':')[0],varTimeEdges[0].split(':')[1]);
         var secondReloadDate = new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate(),varTimeEdges[1].split(':')[0],varTimeEdges[1].split(':')[1]);
         var firstSubstr = firstReloadDate - nowDate;
         var secondSubstr = secondReloadDate - nowDate;
         var substrSignSum = Math.sign(firstSubstr)+Math.sign(secondSubstr);
         switch (substrSignSum) {
            case 2:
               division = firstSubstr;
               break;
            case 0:
               division = secondSubstr;
               break;
            case -2:
               division = firstReloadDate.setDate(firstReloadDate.getDate() + 1) - nowDate;
               break;
            default:
               break;
          }
         root.varchangeintime = {varname:varName,values:varValues,timeEdges:varTimeEdges,timer:null};
         root.varchangeintime = setInterval(function() { 
               qvDoc.SetVariable("sessionHandleVar",1);
         }, division);
        }
         
   });
}

init();
