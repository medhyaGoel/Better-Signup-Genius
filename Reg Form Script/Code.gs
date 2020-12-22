//update these
var form = FormApp.openById('12dDlayXNbX2a9TFuqe7ykScv-oqIGKxkjW5XADeYMTM'); 
var judgingSpread = SpreadsheetApp.openById('1wAdhEPbA7YijAwIJCpCvU0Gm5CiVo88W9O9dMbxkvYk');
var judgingSheetName = "Final";
var slotNames = ["Friday", "Saturday A", "Saturday B", "Asynch"];
var quotas2 = [2, 1, 1, 1];

//which question's answer is displayed on the public spreadsheet? (Ex. if I'm displaying names and the first question asks for a name, var displayQ = 1).
var displayQ = 1; 

//which of the multiple choice questions asks for the slot? (If my first MCQ asks for the slot, var slotMCQ = 1. If my second MCQ asks for the slot, var slotMCQ = 2).
var slotMCQ = 2;

//which overall question asks for the slot? (If the fourth question in the form asks for the slot, var slotQ = 4. If my first MCQ but my 3rd overall questions asks for the slot, var slotQ = 3).
var slotQ = 6;

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

slotQ--;
slotMCQ--;
displayQ--;
var taken = new Array(slotNames.length);


function resetOriginal(){
        var formItems = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
        formItems[slotMCQ].asMultipleChoiceItem().setChoiceValues(slotNames);
    }


function reset(){
        var formItems = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
        formItems[slotMCQ].asMultipleChoiceItem().setChoiceValues(["There are no more slots left."]);
    }


//updating answer choices
 function updatingQuestions(){
  
  var allResponses = form.getResponses();
  
  //filling taken array with taken
  taken.fill(0);
  var formItems = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
  for (var response = 0; response<allResponses.length; response++){
    var responseAnswers = allResponses[response].getItemResponses();
       
    if(slotNames.indexOf(responseAnswers[slotQ].getResponse()) == -1 || responseAnswers[slotQ].getResponse() == "There are no more slots left." ){
          reset();
          return;
          }
    var slot = responseAnswers[slotQ].getResponse();
    
    for(var i = 0; i<slotNames.length; i++){
        if (slot == slotNames[i]) {
            taken[i]++;
        }
     }
  }
 
  //updating multiple choice
  var choices = new Array();
  
  for(var i = 0; i <slotNames.length; i++){
      if(taken[i] < quotas2[i]){
          choices.push(slotNames[i]);
          }
  }
    
  if(choices.length < 1){ 
         reset();
         return;
  } else{
      formItems[slotMCQ].asMultipleChoiceItem().setChoiceValues(choices);  
  }  
}


//adding a name to the sheet
function updateJudgeSpread() {
 
  var allResponses = form.getResponses();
  var responseAnswers = allResponses[allResponses.length - 1].getItemResponses();
  var name = responseAnswers[displayQ].getResponse();
  var slot = responseAnswers[slotQ].getResponse();
 
 var maxQuota = Math.max(...quotas2);
 
var column = slotNames.length;
  for(var i = 0; i<slotNames.length; i++){
      if(slot == slotNames[i]){
          column = i;
      }
  }
 
 var range2 = judgingSpread.getRange(judgingSheetName + "!A1:Z"+ (maxQuota + 3)); 
 if (column == slotNames.length){
     return;
 }
 
 
 //come back and change 10 and ranges
 for (var i = 2; i<maxQuota+2; i++){
   
   var cell = range2.getCell(i, column + 2);
   if(cell.isBlank()){
     cell.setValue(name);
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
