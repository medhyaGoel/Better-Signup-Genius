# Better Signup Genius
 
A better alternative to SignUpGenius (blegh). This is a Google App Scripts Application that will 
1. Create and record responses from a "Judging Registration" Google form. Responses stored in a private "Judging Registration Responses" spreadsheet that displays private information for each volunteer (i.e. contact information that you don't want everyone to see).  
2. Create a  "Public Judging Spreadsheet" that displays the name of each slot along with the names of the people who have signed up for that slot and displays the quota for volunteers required for the slot. (hiding private information)
3. Easily adjust the number of volunteers per slot and update the "Judging Registration Form" options accordingly.
    
This project is currently a very loose framework that is meant to be adapted for your needs and purposes. 
As is, you can use this project to create a Public Judging Spreadsheet like this one (https://docs.google.com/spreadsheets/d/16Ibffg5qYQiMBya6X34xggPl4QdJtZCZP_9gBML9L1A/edit?usp=sharing) with 3 slots that an adjustable number of volunteers can sign up for.

In order to operate this project with minimum additional effort on your part, you will need to 
1. create a "Judging Registration" Google Form with the same number and type of questions as are on this form (https://docs.google.com/forms/d/e/1FAIpQLSfNy9VrA1_lGsb-RfpRSrkvMCFJsaPt86oHPHmNmlPCcwUpBQ/viewform). Link this form to a "Judging Registration Responses" spreadsheet of your choice.
2. Link a google app script with the "Judging Registration" Google Form and copy in the "Reg Form" code. Create 2 on-form-submit triggers, 1 for updateJudgeSpread() and 1 for updatingQuestions().
3. Create a "Public Judging Spreadsheet." Title the first row as "volunteers", "slot 1", "slot 2", "slot 3", etc.
4. Update ids in the Code.gs files of "Background Quota App" and "Reg Form Script"
5. Create a google app script with all three of the "Backdoor Quota App files." Deploy as a web app and use to easily update judging quotas.
    
    
And that's it! Thanks for reading, and I hope that this makes your life easier! Down with signUpGenius.
