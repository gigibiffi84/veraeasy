## How to this project

prject was created using this guide https://ui.shadcn.com/docs/installation/vite

npm create vite@latest
npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p

### Design system

https://www.figma.com/community/file/1203061493325953101/shadcn-ui-design-system

### React router

using react router dom for the moment
next it will be nice to use this https://tanstack.com/query/latest/docs/framework/react/examples/react-router
the example showed in the tanstack query react router is very meaningful for our needs

### First iteration wave 0

- Create project strucutre
- Create ui layout
- Create page layout
- Create component layout (maybe with shimmers?)
- Compose all with react router and loaders (shimmers)
- Create seed api for data
- Interpolate shimmers with seed data

### First iteration wave 1

- [x] create a login ui page (async thunk)
- [x] seed login page
- [x] create a signup page ()
- [x] seeding contact verifications with this metadata, business_id, person_id, email, mobileNumber
- [x] seeding the status List for workflow verification => statusName, action(next or null), expectedNextStatusList (can
  be
  empty)
- [x] seeding contact verification status with business_id, person_id, currentStatus

### First iteration wave 2

- [x] create an homepage layout responsive with skeleton and tailwindcss
- [x] create a searchbar component that emits event when user finish write
- [x] i/o pipes and search results: create state manager for searchbar that bind the state of the search bar with a pipe
  to query the server
- [x] create a AddNewContactVerification page to show a form to submit new contact verification
    - create relative business logic to save a contact

### Second iteration (VERIFY EMAIL)

- [x] create a command to add a new email verification entry
- [x] prepare email verification slot with owner
- [x] prepare email verification slot with contactId
- [x] send contactId from frontend
- [x] extends link used by send email to put authtoken in query string
- [x] extends otp matcher to get by uuid with token in query string
- [x] extends otp matcher to insert in db (uuid, address, owner, contact_id) verifier_email when verify is ok
- [x] extends otp matcher page to check valid otp and update page status
- [ ] minify and obfuscate link send in email
- [ ] provide an owner configuration table with
    - operator_key as user that login to the system
    - issuer: the email seen by end user when receives otp
    - otp_matcher_url: the url used in the email to link the otp insert page
    - email_template: the template body of the email to send as html
    - email_subject:
    - sms_template: the template bod of sms to send

### Contact Verification CRUD ß

- [x] create a query to search in or by omnibox
- [x] add update contact verification api
- [ ] add delete contact verification api (low)
- [ ] add a delete icon and provide delete capability of a contact (low)

### ContactVerification status management

- [ ] extends prepare email verification with EMAIL_SENT status
- [ ] add a modify icon when click load current contact and show in form
- [ ] when load check email popup call checkJustVerified API
- [ ] provide getEmailVerificationStatus (verified field) API : see verified status on EmailVerification
- [ ] create materialized view in EmailVerification that reads from public.email_verified_event
- [ ] provide checkEmailVerified API : get by emailverificationUUID count >=1
- [ ] WHEN JUSTVERIFIED, SHOW STATUS
  the previous check MUST start when user try to verify email
- [ ] when status is EMAIL_VERIFIED operator can still send a new verification

### History

- [ ] provide the history of all email sent for a contact.
- [ ] for each email in the history show if is verified

### Email verification transfer (not useful if user press check)

- [ ] extends otp matcher to send a message trough rabbit mq to the email verifier
- [ ] extends otp matcher with GET API to get verified status: check if row is in view too (auth from email
  verification)
- [ ] extends email verifier to use the GET API and pull the status
- [ ] extends email verifier to update the verified flag when the pull is OK.

### Third iteration (COMPLETE DOSSIER)

- [ ] send notification to owner with a link to (verify/:owner/:type/:uuid) where type can be email or sms
- [ ] when user access the link show a component that enable user to complete the task of type email verification
- [ ] create a component to lookup email list and its status

### 5TH iteration (mobile number contact flow)

- create a MobileNumberVerification module that send otp trough sms
- and send a notification to the owner when user match the mobile number and the otp
- use Verifier to push verified rows even for mobile number

### 6th iteration (COMPLETE DOSSIER)

- [ ] avoid add email verification if exists email in the view
- [ ] avoid add email verification if exists email in the view with a temporal window of last 5 minutes
- [x] create an AddEmailVerificationPage to enable user to add an email to a contact
- [x] seeds email verification list given business_id, and person_id
- [x] to avoid pagination show all results in one page (count and limit by 10)
- [x] create otp confirm page

### 7TH iteration (detail page and workflow of all email and mobile number)

- [ ] create a ContactVerificationDetail page to show details about workflow
- [ ] add a command to start a new verification from the detail page.
- [ ] when user click on detail card navigate to detail route
- [ ] create a detail card component that take in input the id and take care to download it's detail info

### 4th iteration (extends base contacts data)

- [ ] in order to provide a customer point of view user experience spike the available options
  to build dinamically the forms required by veraeasy when user need to extends data to a contact.
  - [ ]document all in tech documents and forms paragrafh

todo build for production
https://github.com/Eptagone/Vite.AspNetCore/blob/main/examples/basic/frameworks/ViteNET.React/vite.config.ts