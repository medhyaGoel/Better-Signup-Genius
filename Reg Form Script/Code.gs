 function updatingQuestions(){
 
  //update form ID
  var form = FormApp.openById('16Po87AITQ6pXu443ntYFCAQIt86Ti7FYHi6rx4QjAMA');
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
  }
 
 var judgingSpread = SpreadsheetApp.openById('16Ibffg5qYQiMBya6X34xggPl4QdJtZCZP_9gBML9L1A');
 
 //update sheet name
 var range = judgingSpread.getSheetByName("Sheet1").getDataRange();
  
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
