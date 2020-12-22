//update these
var form = FormApp.openById('myId'); 
var judgingSpread = SpreadsheetApp.openById('myId');
var judgingSheetName = "sheetName";
var slotNames = ["slot1", "slot2", "slot3", "slot4"];
var quotas2 = [quota1, quota2, quota3, quota4];


/**
                        *** LIMIT OF 25 SLOTS********
                        DELETIONS: 
                              1. Manually delete entry from Google form, responses spreadsheet (optional), and Public spreadsheet
                              2. Run updateQuestions()
                        QUOTA CHANGES: 
                              1. Change values in quotas2
                              2. Run addQuotas()
                        EACH TOURNY:
                              1. DELETE all form responses
                              2. Update slotNames & quota2 
                              3. Add a new sheet to Public spreadsheet and update name in this file
                              4. Run resetOriginal() & addQuotas()
                              5. Re-Embed "public" sheet on website
                              6. OPTIONAL: link form to a new responses spreadsheet


**/


//----------------------------------------Everything below here is logic (don't need to touch) ------------------------------------------------------------------//

var taken = new Array(slotNames.length);

function resetOriginal(){
        var formItems = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
        formItems[0].asMultipleChoiceItem().setChoiceValues(slotNames);
    }



function reset(){
        var formItems = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
        formItems[0].asMultipleChoiceItem().setChoiceValues(["There are no more slots left."]);
    }


//updating answer choices
 function updatingQuestions(){
  
  var allResponses = form.getResponses();
  
  //filling taken array with taken
  taken.fill(0);
  var formItems = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
  for (var response = 0; response<allResponses.length; response++){
    var responseAnswers = allResponses[response].getItemResponses();
    if(slotNames.indexOf(responseAnswers[4].getResponse()) == -1 || slotNames.indexOf(responseAnswers[4].getResponse()) == "There are no more slots left." ){
          reset();
          return;
          }
    var slot = responseAnswers[4].getResponse();
    var placeholder;
    
    for(var i = 0; i<slotNames.length; i++){
        if (slot == slotNames[i]) {
            taken[i]++;
        }
     }
  }
  
  Logger.log("taken: " + taken);

  //updating multiple choice
  var choices = new Array();
  
  for(var i = 0; i <slotNames.length; i++){
      if(taken[i] < quotas2[i]){
          choices.push(slotNames[i]);
          }
  }
  
  Logger.log("choices: " + choices);
  
  if(choices.length < 1){ 
         Logger.log("yay");
         reset();
         return;
  } else{
      formItems[0].asMultipleChoiceItem().setChoiceValues(choices);  
  }  
}


//adding a name to the sheet
function updateJudgeSpread() {
 
  var allResponses = form.getResponses();
  var responseAnswers = allResponses[allResponses.length - 1].getItemResponses();
  var name = responseAnswers[0].getResponse();
  var slot = responseAnswers[4].getResponse();
 
 var maxQuota = Math.max(...quotas2);
 
var column = slotNames.length;
  for(var i = 0; i<slotNames.length; i++){
      if(slot == slotNames[i]){
          column = i;
      }
  }
 
 var range2 = judgingSpread.getRange(judgingSheetName + "!A1:Z"+ (maxQuota + 3)); 
 Logger.log("column = " + column);
 if (column == slotNames.length){
     return;
 }
 
 
 //come back and change 10 and ranges
 for (var i = 2; i<maxQuota+2; i++){
   
   var cell = range2.getCell(i, column + 2);
   if(cell.isBlank()){
     cell.setValue(name);
     Logger.log("here I am");
     break;
   }
 }
 
}


function addQuotas(){
 var maxQuota = Math.max(...quotas2);    
 var sheet = judgingSpread.getSheetByName(judgingSheetName);
 var range = judgingSpread.getRange(judgingSheetName + "!A1:Z" + (maxQuota + 3));


  sheet.getRange("A2:A"+sheet.getDataRange().getNumRows()).clear();
  sheet.getRange("A"+sheet.getDataRange().getNumRows() + ":Z" + sheet.getDataRange().getNumRows()).clear();

 
 //setting default titles of rows
 range.getCell(1, 1).setValue("Judges");
 for(var i = 2; i<=slotNames.length + 1; i++){
     range.getCell(1, i).setValue(slotNames[i-2]);
 }
  
 //numbering slots
 var rowNumber = 3 + maxQuota;
 for(var i = 1; i<=maxQuota; i++) {
   range.getCell(i+1, 1).setValue(i);
   }
 
 
 //adding quotas to last row
 range.getCell(rowNumber, 1).setValue("Quotas"); 
 
 var index = 0;
 for(var i = 2; i<=quotas2.length+1; i++){
     range.getCell(rowNumber, i).setValue(quotas2[index]);
     index++;
 }
 
 updatingQuestions();

}
