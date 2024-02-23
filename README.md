# README #

This README would normally document whatever steps are necessary to get your application up and running.

### Mvp Requirements
first iteration for the mvp project focus on real and urgent needs:
    - a way to verify email address trough otp
        * create an EmailVerificationModule that expose an api to
            - start an email verification
            - update an email verification
    - a way to verify phone numbers trough a verified email and sms otp.
    - contact verification must be related to a business id.
    - contact verification must be related to an ownerid. The relationship between
    a contact verification and an owner is 1-to-1. contact verification must be filtered by default by owner.
    - notify the contact verification entry to the owner about the contacts verifcation steps.
    - send the contact verification entry package signed with all evidences and a privacy document.
    - text email and text sms are fixed and not profiled.
    - user can login with prefixed users without registration process.
    - owner can't revoke the contact verification
    - a created contact verification can be started only if mail and number are valids.

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

## Backend

### Migrations
dotnet tool install dotnet-ef
after created entities ==> dotnet ef migrations add Init
Migration Log:
 - Seed
 - AddBusinessId
 - AddOwner

To add migrations when using more than one dbcontext use

dotnet ef migrations add EmailVerification -c EmailVerificationDbContext

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

{
  "email": "bifulcoluigi@gmail.com",
  "createdAt": "2024-02-20 00:00:00"
}

### Transactions
Despite contactverification module is a simple module that commit oneshot transaction
Could be useful to read this doc when we need to implement transactions in more complex scenarios:
https://learn.microsoft.com/it-it/ef/ef6/saving/transactions?redirectedfrom=MSDN

Observable models and entity: https://learn.microsoft.com/it-it/ef/core/change-tracking/change-detection

### Email verification steps
The Email verification module is responsible to receive ContactVerificationCreated integration events
his endpoint is a startEmailVerification.
When an email verification is started then:
 - Generate an OTP: Use a library or custom code to generate a random OTP and associate it with the user's email address in your application's database.
 - Send OTP: Send the OTP to the user's email address using an email service provider or an SMTP server. Include clear instructions on how to proceed with the verification process.
- Validate OTP: FINALLY When the user enters the received OTP, compare it with the stored OTP in the database. If they match, mark the email address as verified and allow the user to proceed.

#### Securitu considerations
 - Secure Storage: Store OTPs securely in your application's database, utilizing encryption and hashing techniques to protect sensitive information.
 - Expiration Time: Set an expiration time for OTPs to ensure that they are valid for a limited duration. This helps prevent misuse of expired OTPs.
 - Rate Limiting: Implement rate limiting mechanisms to prevent brute-force attacks or automated attempts to verify OTPs.
 - Error Handling: Implement proper error handling to handle exceptions during the email verification process, providing meaningful error messages to users.

### Troubleshooting

MediaTr issue when receiving duplicate event in notification handler.
https://github.com/jbogard/MediatR/issues/718
https://github.com/CodeMazeBlog/cqrs-mediatr-aspnet-core/blob/master/CqrsMediatrExample/CqrsMediatrExample/Handlers/EmailHandler.cs

## Frontend
For frontend we are going to use React 18
to seewhat react transpile for us using babel go to babeljs.io/repl
For css we are temporaraly using Bulma components

https://bulma.io/documentation/components/
https://unsplash.com/documentation/user-authentication-workflow