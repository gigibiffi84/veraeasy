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

### First iteration wave 2
 - create prject structure
 - seeding contact verifications with this metadata, business_id, person_id, email, mobileNumber
 - seeding the status List for workflow verification => statusName, action(next or null), expectedNextStatusList (can be empty)
 - seeding contact verification status with business_id, person_id, currentStatus
 - create a login ui page
 - create a signup page

### First iteration wave 1
- create an homepage of type SearchContactVerificationPage with a item list of contact verification merged with current status
- create contact verification item component
- add search and delete beahviors

### Second iteration
 - create a ContactVerificationDetail page to show details about workflow
 - create a AddNewContactVerification page to show a form to submit new contact verification
 - add a command to start a new verification from the detail page.

### Third iteration
 - seeds email verification list given business_id, and person_id
 - create an AddEmailVerificationPage to enable user to add an email to a contact
 - create a component to lookup email list and its status
 - create a command to add a new email verification entry 