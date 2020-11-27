function updateJudgeSpread() {
 //UPDATE WITH SPREADSHEET LINKED TO GOOGLE REGISTRATION FORM
 var formResponses = SpreadsheetApp.openById('MY_FORM_ID');
 
 //UPDATE WITH SHEET NAME
 var range = formResponses.getSheetByName("MY_SHEET").getDataRange();
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
 
 //UPDATE WITH SPREADSHEET THAT WILL BE PUBLIC
 var judgingSpread = SpreadsheetApp.openById('PUBLIC_JUDGING_SPREADSHEET_ID');
 
 //UPDATE WITH SHEET NAME/RANGE
 var range2 = judgingSpread.getRange("MY_PUBLIC_SHEET!A1:D13"); 
 
 for (var i = 2; i<10; i++){
   var cell = range2.getCell(i, column+1);
   if(cell.isBlank()){
     cell.setValue(name);
     break;
   }
 }
}
