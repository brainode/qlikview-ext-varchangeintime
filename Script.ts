declare var Qv: any;
var qvDoc = Qv.GetCurrentDocument();

var sessionTime : number = 1000*60*25;

class timerObj {
    private timer:any;
    constructor(public varname : string,public values : string[],public timeEdges : string[]){}
    isEq(timer){
       return this.varname == timer.varname && this.values == timer.values && this.timeEdges == timer.timeEdges;
    };
    setTimer(){
       let valAfterTime : [number,string] = this.getTimeVal();
       this.timer = setTimeout(()=>{
            this.clearTimer();
            qvDoc.SetVariable(this.varname,valAfterTime[1]);
            this.setTimer();
       },valAfterTime[0]);
    };
    clearTimer(){
        clearTimeout(this.timer);
    }
    private getTimeVal(): [number,string] {
        let nowDate:Date = new Date();
        let val:string;
        var division = 0;
        let firstReloadDate: Date = new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate(),+this.timeEdges[0].split(':')[0],+this.timeEdges[0].split(':')[1]);
        let secondReloadDate: Date = new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate(),+this.timeEdges[1].split(':')[0],+this.timeEdges[1].split(':')[1]);
        let firstSubstr:number = firstReloadDate.getTime() - nowDate.getTime();
        let secondSubstr:number = secondReloadDate.getTime() - nowDate.getTime();
        var substrSignSum = Math.sign(firstSubstr)+Math.sign(secondSubstr);
        switch (substrSignSum) {
           case 2:
              division = firstSubstr;
              val = this.values[0];
              break;
           case 0:
              division = secondSubstr;
              val = this.values[1];
              break;
           case -2:
              division = firstReloadDate.setDate(firstReloadDate.getDate() + 1) - nowDate.getTime();
              val = this.values[1];
              break;
           default:
              break;
         }
         return [division,val];
     }
};

function init(){
   Qv.AddExtension("qlikview-ext-varchangeintime",
   function(){
      let root = this;
      let varchangeintime: timerObj = new timerObj(this.Layout.Text0.text,this.Layout.Text1.text.split(','),this.Layout.Text2.text.split(','));
      if(!root.varchangeintimeSessionHandle){
            root.varchangeintimeSessionHandle= setInterval(function() { 
               qvDoc.SetVariable("sessionHandleVar",1);
            }, sessionTime);
      }
      if(!root.varchangeintime){
         root.varchangeintime = varchangeintime;
         root.varchangeintime.setTimer();
      }else{
         if(!root.varchangeintime.isEq(varchangeintime)){
            root.varchangeintime.clearTimer();
            root.varchangeintime = varchangeintime;
            root.varchangeintime.setTimer();
         }
      }
   });
}
init();