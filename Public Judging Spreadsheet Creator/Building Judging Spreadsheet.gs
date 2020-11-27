function updateJudgeSpread() {
 var formResponses = SpreadsheetApp.openById('1t-0RAclie4O-9J9aEy1OxodA63ZO8vjPX8I0fR1D1_0');
 
 //update sheet name
 var range = formResponses.getSheetByName("Sheet1").getDataRange();
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
 
 var judgingSpread = SpreadsheetApp.openById('16Ibffg5qYQiMBya6X34xggPl4QdJtZCZP_9gBML9L1A');
 
 //update sheet name
 var range2 = judgingSpread.getRange("Sheet1!A1:D13"); 
 
 for (var i = 2; i<10; i++){
   var cell = range2.getCell(i, column+1);
   if(cell.isBlank()){
     cell.setValue(name);
     break;
   }
 }
}
