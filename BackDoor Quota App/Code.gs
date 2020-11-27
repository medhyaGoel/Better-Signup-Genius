function doGet() {
  var html = HtmlService.createTemplateFromFile('index').evaluate()
      .setTitle('Quota Web App')
      .setSandboxMode(HtmlService.SandboxMode.NATIVE);
  return html;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}


function processForm(formObject) {
   
 var judgingSpread = SpreadsheetApp.openById('16Ibffg5qYQiMBya6X34xggPl4QdJtZCZP_9gBML9L1A');
 //update sheet name
 var sheet = judgingSpread.getSheetByName("Sheet1");
 var range = judgingSpread.getRange("Sheet1!A1:D13");


  sheet.getRange("A2:A"+sheet.getDataRange().getNumRows()).clear();
  sheet.getRange("A"+sheet.getDataRange().getNumRows() + ":D" + sheet.getDataRange().getNumRows()).clear();

  
 var rowNumber = 3 + Math.max(Math.max(formObject.friday_quota, formObject.saturday_a_quota), formObject.saturday_b_quota); 
 Logger.log(rowNumber);
 
 for(var i = 1; i<=rowNumber - 3; i++) {
   range.getCell(i+1, 1).setValue(i);
   }
   
 range.getCell(rowNumber, 1).setValue("Quotas");
 range.getCell(rowNumber, 2).setValue(formObject.friday_quota);
 range.getCell(rowNumber, 3).setValue(formObject.saturday_a_quota);
 range.getCell(rowNumber, 4).setValue(formObject.saturday_b_quota);

}