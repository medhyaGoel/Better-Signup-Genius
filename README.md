# Better Signup Genius
 
An alternative to SignUpGenius. This Google App Scripts Application will 
1. Create and record responses from a "Volunteer Sign-up" Google form.  
2. Create a "Public Judging Spreadsheet" that displays volunteer quotas for each slot, the name of each slot, and the names of the people who have signed up for that slot (Only the form owner will see the rest of the information provided).
3. People can only sign up for slots if they are still available.
3. Easily adjust the number of volunteers per slot, slots and update options on the "Volunteer Sign-Up" form accordingly.
    
This program lets you create sign-ups with up to 25 slots and unlimited quotas. 
As is, this program creates a public judging Spreadsheet like this one (https://docs.google.com/spreadsheets/d/16Ibffg5qYQiMBya6X34xggPl4QdJtZCZP_9gBML9L1A/edit?usp=sharing).
Any Google Form with 5 questions, the 1st asking for a name and the last being the only multiple choice question and asking for preferred slot will work. This public spreadsheet was created using this form: https://docs.google.com/forms/d/e/1FAIpQLSfNy9VrA1_lGsb-RfpRSrkvMCFJsaPt86oHPHmNmlPCcwUpBQ/viewform

To operate this project:
1. Create your own "Volunteer Sign-ups" Google Form. It should have 5 questions, the 1st asking for the name that will be displayed to everyone, and the 5th being the only multiple choice question and asking for the slot. 
2. Create a google app script in the "Judging Registration" Google Form and copy in the "Reg Form" code. Create 2 on-form-submit triggers, 1 for updateJudgeSpread() and 1 for updatingQuestions().
3. Create a blank "Public Judging Sheet" in a spreadsheet of your choice.
4. Update values in the "Reg Form Google Script" as directed by the comments.

                        DELETIONS: 
                              1. Manually delete entry from Google form, responses spreadsheet (optional), and Public spreadsheet
                              2. Run updateQuestions()
                        QUOTA CHANGES: 
                              1. Change values in quotas2
                              2. Run addQuotas()
                        EACH NEW SIGN-UP:
                              1. Delete all form responses OR create a new form and update id in code accordingly 
                              2. Update slotNames & quota2 arrays in code
                              3. Update code with id/name of new "Public Judging" sheet (could be the same one as long as you erase all of the content on the sheet)
                              4. Run resetOriginal() & addQuotas()
                              5. Re-Embed "public" sheet on website
                              6. OPTIONAL: link form to a new responses spreadsheet
    
I hope that this makes your life a little bit easier!
