var BasicValues = [1,2];
const qvDoc = Qv.GetCurrentDocument();

//Standart session time is ~30m
const sessionTime = 1000*60*25;//TODO.Set this variable in extension parameter.
const keepSessionVar = btoa(Date.now().toString()+"session");
const nowTimestamp = btoa(Date.now().toString());

function setInt(){
   return setInterval(function() { 
      qvDoc.SetVariable(varName,varValues[curIndex]);
      if(curIndex<varValues.length-1){
         curIndex++;
      } else{
         curIndex=0;
      }
      thisObj.VarChanger.curIndex=curIndex;
   }, intervalTime);
}

function 

var timerObj = {
   varname : null,
   values : null,
   timeEdges : null,
   timer : null,
   isEq(timer){
      return this.varname == timer.varname && this.values == timer.values && this.timeEdges == timer.timeEdges;
   },
   timerObj(varname,values,timeEdges){
      this.varname = varname;
      this.values = values;
      this.timeEdges = timeEdges;
   },
   setTimer(timer){
      this.timer = timer;
   }
};

var timeValObj = {
   time:null,
   value:null
};

function getTimeVal(){
   var nowDate = new Date();
   var val = 0;
   var division = 0;
   var firstReloadDate = new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate(),varTimeEdges[0].split(':')[0],varTimeEdges[0].split(':')[1]);
   var secondReloadDate = new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate(),varTimeEdges[1].split(':')[0],varTimeEdges[1].split(':')[1]);
   var firstSubstr = firstReloadDate - nowDate;
   var secondSubstr = secondReloadDate - nowDate;
   var substrSignSum = Math.sign(firstSubstr)+Math.sign(secondSubstr);
   switch (substrSignSum) {
      case 2:
         division = firstSubstr;
         //val = 
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
}

function init(){  
   Qv.AddExtension("VarChangerInTimesOfDay",
   function(){
        root = this;
        var varchangeintime = new timerObj(this.Layout.Text0.text,this.Layout.Text1.text.split(','),this.Layout.Text2.text.split(','));
      if(!root.varchangeintimeSessionHandle){
            root.varchangeintimeSessionHandle= setInterval(function() { 
               qvDoc.SetVariable("sessionHandleVar",1);
            }, sessionTime);
      }
      if(!root.varchangeintime){
         root.varchangeintime = varchangeintime;
         var timer = setInterval(function() { 
            qvDoc.SetVariable(varName,1);
         }, division);
      }else{
         if(!root.varchangeintime.isEq(varchangeintime)){
            clearInterval(root.varchangeintime.timer);
            root.varchangeintime = varchangeintime;
         }
      }
   });
}

init();
