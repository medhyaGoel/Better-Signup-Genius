//update these
var form = FormApp.openById('12dDlayXNbX2a9TFuqe7ykScv-oqIGKxkjW5XADeYMTM'); 
var judgingSpread = SpreadsheetApp.openById('1wAdhEPbA7YijAwIJCpCvU0Gm5CiVo88W9O9dMbxkvYk');
var judgingSheetName = "Sheet1";
var formResponses = SpreadsheetApp.openById('17S99EGYEThbBQw9jnA3km-wL4OzNONV7K5Dg6jmfpHA');
var formResponseSheetName = "Sheet1";


 function updatingQuestions(){
 
  var allResponses = form.getResponses();
  var friTaken =0;
  var satATaken = 0;
  var satBTaken = 0;

  for (var response = 0; response<allResponses.length; response++){
    var responseAnswers = allResponses[response].getItemResponses();
    var q5Answer = responseAnswers[4].getResponse();
    
    if (q5Answer == "Friday") {
      friTaken++;
      }
    else if (q5Answer == "Saturday A"){
      satATaken++;
      }
    else if (q5Answer == "Saturday B"){
      satBTaken++;
      }
    else {
      Logger.log("sketchy");
      }
  }
 

 var range = judgingSpread.getSheetByName(judgingSheetName).getDataRange();
  
  var friQuota = range.getCell(range.getNumRows(), 2).getValue();
  var satAQuota = range.getCell(range.getNumRows(), 3).getValue();
  var satBQuota = range.getCell(range.getNumRows(), 4).getValue();

  
  var formItems = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
  
  if (friTaken >= friQuota && satATaken >= satAQuota && satBTaken >= satBQuota) {
      formItems[0].asMultipleChoiceItem().setChoiceValues([""]);
  } else if(friTaken >= friQuota && satATaken >= satAQuota){
      formItems[0].asMultipleChoiceItem().setChoiceValues(["Saturday B"]);
  } else if (friTaken >= friQuota && satBTaken >= satBQuota){
      formItems[0].asMultipleChoiceItem().setChoiceValues(["Saturday A"]);
  } else if (satATaken >= satAQuota && satBTaken >= satBQuota){
      formItems[0].asMultipleChoiceItem().setChoiceValues(["Friday"]);
  } else if (friTaken >= friQuota) {
    formItems[0].asMultipleChoiceItem().setChoiceValues(["Saturday A", "Saturday B"]);
  } else if (satATaken >= satAQuota) {
    formItems[0].asMultipleChoiceItem().setChoiceValues(["Friday", "Saturday B"]);
  } else if (satBTaken >= satBQuota) {
    formItems[0].asMultipleChoiceItem().setChoiceValues(["Friday", "Saturday A"]);
  } else {
   formItems[0].asMultipleChoiceItem().setChoiceValues(["Friday", "Saturday A", "Saturday B"]);
  } 
  
}

function updateJudgeSpread() {
 
 
 var range = formResponses.getSheetByName(formResponseSheetName).getDataRange();
 var newestEntry = range.getNumRows();
 var slot = range.getCell(newestEntry, 6).getValue();
 var name = range.getCell(newestEntry, 2).getValue(); 
 
 var column = 4;
 if(slot == "Friday"){
     column = 1;
 }else if(slot =="Saturday A"){
     column = 2;
 }else if(slot == "Saturday B"){
     column = 3;
 }
 
 
 var range2 = judgingSpread.getRange(judgingSheetName + "!A1:D13"); 
 
 for (var i = 2; i<10; i++){
   var cell = range2.getCell(i, column+1);
   if(cell.isBlank()){
     cell.setValue(name);
     break;
   }
 }
}
