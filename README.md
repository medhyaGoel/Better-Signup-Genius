# Better Signup Genius
 
A better alternative to SignUpGenius (blegh). This is a Google App Scripts Application that will 
1. take responses from a google form that you create
2. Create a nicely formatted "Public Judging Spreadsheet" that displays the name of each slot along with the names of the people who have signed up for that slot and displays        the quota for volunteers required for the slot.
3. Create a private "Judging Registration Forms Spreadsheet" that displays private information for each volunteer (think emails and contact information that you don't want to        display to everyone).  
4. Adjust possible question choices (specifically what slots you can sign up for) on the Google Form to prevent the exceeding of quotas.
    
This project is currently a very loose framework that is meant to be adapted for your needs and purposes. 
As is, you can use this project to create a Public Judging Spreadsheet like this one (https://docs.google.com/spreadsheets/d/16Ibffg5qYQiMBya6X34xggPl4QdJtZCZP_9gBML9L1A/edit?usp=sharing) with 3 slots that an adjustable number of volunteers can sign up for.

In order to use this project with the minimum number of additional effort on your part, you will need to 
    1. create a Google Form with the same number and type of questions as are on this form (https://docs.google.com/forms/d/e/1FAIpQLSfNy9VrA1_lGsb-RfpRSrkvMCFJsaPt86oHPHmNmlPCcwUpBQ/viewform)
    2. Copy the attached Reg Form code into a Google App Script tied to the form. This is the form whose id you will need to update across the project code.
    3. Link the Reg Form to a spreadsheet of your choice and update the id accordingly across the project.
    4. Create a Spreadsheet that will be made public and update the id accordingly across the project.
    5. Save the "Backdoor Quota App" Code as a Google App Scripts project and deploy as a web app. Use this url to update quotas easily. (You can change the quotas in the middle          of registration if you so desire!) 
    
And that's it! Thanks for reading, and I hope that this makes your life easier! Down with signUpGenius.
