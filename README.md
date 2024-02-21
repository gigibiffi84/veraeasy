# README #

This README would normally document whatever steps are necessary to get your application up and running.

### Mvp Requirements
first iteration for the mvp project focus on real and urgent needs:
    - a way to verify email address trough otp - a way to verify phone numbers trough a verified email and sms otp.
    - contact verification must be related to a business id.
    - contact verification must be related to an ownerid. The relationship between
    a contact verification and an owner is 1-to-1. contact verification must be filtered by default by owner.
    - notify the contact verification entry to the owner about the contacts verifcation steps.
    - send the contact verification entry package signed with all evidences and a privacy document.
    - text email and text sms are fixed and not profiled.
    - user can login with prefixed users without registration process.

second iteration:
    - enable mx verification of email address
    - enable contact verification owner to upload verification evidences and privacy doc.
    - enable cv owners to update the cv status to verified.
    - enable cv owners to search on their contact verification entries by status and business id.
    - the owner id must be related to an identity and the identity may be reconciliated trough email, in this scenario user can register,

third iteration:
    - enable owners to design a email text template.
    - enable owners to design a sms text template.
    - enable users to extends a contact verification with e lead and a profile.
    - enable contact verificatin owner to attach a link or a copy about a privacy compliance document.

Below the link of the event stormin diagram: https://miro.com/app/board/uXjVNrD1N88=/

To design application architecture we need to use DI (dependency injection features) provided by .net8+ and documented at this link:
https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-8.0

### Aggregates and modules
By event storming we found the followinf modules each contains an aggregate:
     - ContactVerify: provides api to create a contact verification a contact verification entry is a pair email,phone number and must the creation must contains all validation rules of this entity. The aggregate root is the ContactVerification Entity and is composed by an email hash id, a mobile number hash id, a businessId and a list of tags separated by comma. CRUD REST aPI must be provided. Furthermore the contactverify module must provide api to update the status.
     The status is a FSM: IDLE,EXPIRED,VERIFIED.
     For well formed validation use FluentValidation or these regex https://www.coffeecup.com/help/articles/regular-expression-examples/#phonenumber-italy
     - EmailVerify
     - MobileNumberVerify
     - EmailAssertion
     - MobileNumberAssertion

### Migrations
dotnet tool install dotnet-ef
after created entities ==> dotnet ef migrations add Init
Migration Log:
 - Seed
 - AddBusinessId
 - AddOwner

### Run locally
From Src/Veraeasy folder run dotnet run then go to browser http://localhost:5166/swagger/index.html

### Naive test from swagger

#### Dev mode authentication
To authenticate using dev mode you can use the dotnet user-jwts create command to generate a token
that expires after 1 hour.
To generate specific role or claim based tokens use dotnet user-jwts create --scope "greetings_api" --role "admin".
For support use this link https://learn.microsoft.com/en-us/aspnet/core/security/authentication/jwt-authn?view=aspnetcore-8.0&tabs=windows

Then authenticate from swagger copy and paste the token.
To test from swagger use this example json
{
  "businessId": "test",
  "email": "bifulcoluigi@gmail.com",
  "mobileNumber": "+393405753976",
  "createdAt": "2024-02-20 00:00:00"
}

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact