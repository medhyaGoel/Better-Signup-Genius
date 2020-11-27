# Better Signup Genius
 
A better alternative to SignUpGenius (blegh). This is a Google App Scripts Application that will 
1. Record responses from a "Judging Registration" Google form that you create and store it in a private "Judging Registration Responses" spreadsheet that displays private information for each volunteer (i.e. contact information that you don't want everyone to see).  
2. Create a nicely formatted "Public Judging Spreadsheet" that displays the name of each slot along with the names of the people who have signed up for that slot and displays the quota for volunteers required for the slot.
3. Easily adjust the number of volunteers per slot and update the "Judging Registration Form" questions accordingly.
    
This project is currently a very loose framework that is meant to be adapted for your needs and purposes. 
As is, you can use this project to create a Public Judging Spreadsheet like this one (https://docs.google.com/spreadsheets/d/16Ibffg5qYQiMBya6X34xggPl4QdJtZCZP_9gBML9L1A/edit?usp=sharing) with 3 slots that an adjustable number of volunteers can sign up for.

In order to use this project with the minimum number of additional effort on your part, you will need to 
1. create a "Judging Registration" Google Form with the same number and type of questions as are on this form (https://docs.google.com/forms/d/e/1FAIpQLSfNy9VrA1_lGsb-RfpRSrkvMCFJsaPt86oHPHmNmlPCcwUpBQ/viewform). Link this form to a "Judging Registration Responses" spreadsheet of your choice and update the id of both the Google Form and Form responses across the project. 
2. Copy Reg Form Script code into a Google App Script tied to the "Judging Registration" Google form. Create an on-form-submit trigger to connect to the updateJudgeSpread() of the Public Judging Spreadsheet Creator App Script & the updatingQuestions() of the Reg Form Script.
3. Create a "Public Judging Spreadsheet" and title the first column "Volunteers" or whatever you want, and the rest of the columns with the name of the slot. Update code with spreadsheet id across project.
5. Save the "Backdoor Quota App" Code as a Google App Scripts project and deploy as a web app. Use this url to update quotas easily. (You can change the quotas in the middle of registration if you desire!) 
    
And that's it! Thanks for reading, and I hope that this makes your life easier! Down with signUpGenius.
