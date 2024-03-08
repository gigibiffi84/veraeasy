### Veraeasy.Verifier

The veraeasy verifier is the module that provides tha otp matcher operations.
You can obtain a token from the verifier.
The token usually must be attached to a One Time Password.
Then an uuid that maps the tuple (token,otp) is created.

Scenario:
When a link with a uiid is sent to the user trough email
The user can access to the otp verifier page.
When the page is accessed the user can check the otp and a verify otp endpoint is invoked.

a Get by uuid must be provided

- /match/uuid

200 ok with email verification data

- auth token
- email address

Because the match otp is idempotent the PUT METHOD must be used:

- 204 no content if the match is ok and row exists
- 201 Created if the match is ok and the row is inserted
- 404 if uuid is not found
- 409 Conflict if otp does not match
- 401 if the match otp is without bearer auth
- 403 forbidden if an invalid token is used

Put method must be authenticated with the token obtained with get operation
The method should create a resource as object or entity or row or document or in memory tuple to
"signal" that an email is successfull verified

insert UUID, emailAddress
