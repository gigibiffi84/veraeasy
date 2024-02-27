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

- [ ] create an homepage layout responsive with skeleton and tailwindcss
- [ ] create a searchbar component that emits event when user finish write
- [ ] i/o pipes and search results: create state manager for searchbar that bind the state of the search bar with a pipe
  to query the server
- [ ] create a detail card component that take in input the id and take care to download it's detail info
- [ ] incrementally fetch details in parallel ....
- [ ] to avoid pagination show all results in one page (count and limit by 10)
- [ ] when user click on detail card navigate to detail route

### Second iteration

- [ ] create a ContactVerificationDetail page to show details about workflow
- [ ] create a AddNewContactVerification page to show a form to submit new contact verification
- [ ] add a command to start a new verification from the detail page.

### Third iteration

- [ ] seeds email verification list given business_id, and person_id
- [ ] create an AddEmailVerificationPage to enable user to add an email to a contact
- [ ] create a component to lookup email list and its status
- [ ] create a command to add a new email verification entry 