# README #

This README would normally document whatever steps are necessary to get your application up and running.

### Mvp Requirements

Jira: https://veraeasy.atlassian.net/

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
- the owner id must be related to an identity and the identity may be reconciliated trough email, in this scenario user
  can register,

third iteration:

- enable owners to design a email text template.
- enable owners to design a sms text template.
- enable users to extends a contact verification with e lead and a profile.
- enable contact verificatin owner to attach a link or a copy about a privacy compliance document.

Below the link of the event storming diagram: https://miro.com/app/board/uXjVNrD1N88=/

To design application architecture we need to use DI (dependency injection features) provided by .net8+ and documented
at this link:
https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-8.0

### Aggregates and modules

By event storming we found the followinf modules each contains an aggregate:

- ContactVerify: provides api to create a contact verification a contact verification entry is a pair email,phone number
  and must the creation must contains all validation rules of this entity. The aggregate root is the ContactVerification
  Entity and is composed by an email hash id, a mobile number hash id, a businessId and a list of tags separated by
  comma.
  CRUD REST aPI must be provided. Furthermore the contactverify module must provide api to update the status.
  The status is a FSM: IDLE,EXPIRED,VERIFIED.
  For well formed validation use FluentValidation or these
  regex https://www.coffeecup.com/help/articles/regular-expression-examples/#phonenumber-italy
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

dotnet ef migrations add AddPersonId -c ContactVerificationDbContext

dotnet ef migrations add EmailVerification -c EmailVerificationDbContext

### Run locally

From Src/Veraeasy folder run dotnet run then go to browser http://localhost:5166/swagger/index.html

### Environemnts

to run with specific environment run with --environment  <env_name>
env name can be on of Development,Staging,Production
if no one is passed
with dot net run locally is set to Development when build is set to Production

### Naive test from swagger

#### Dev mode authentication

To authenticate using dev mode you can use the dotnet user-jwts create command to generate a token
that expires after 1 hour.
To generate specific role or claim based tokens use dotnet user-jwts create --scope "greetings_api" --role "admin".
For support use this
link https://learn.microsoft.com/en-us/aspnet/core/security/authentication/jwt-authn?view=aspnetcore-8.0&tabs=windows

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

### Keycloak

https://blog.devgenius.io/testing-the-keycloak-openid-connect-6de74a43693c
https://medium.com/@ahmed.gaduo_93938/how-to-implement-keycloak-authentication-in-a-net-core-application-ce8603698f24
https://nikiforovall.github.io/aspnetcore/dotnet/2022/08/24/dotnet-keycloak-auth.html#:~:text=Learn%20how%20to%20use%20Keycloak%20in%20ASP.NET%20Core,Keycloak%20-%20Open%20Source%20Identity%20and%20Access%20Management.
https://github.com/NikiforovAll/keycloak-authorization-services-dotnet/blob/main/samples/AuthGettingStarted/Program.cs

### Entity Relationships

https://learn.microsoft.com/en-us/ef/core/modeling/relationships

### Transactions

Despite contactverification module is a simple module that commit oneshot transaction
Could be useful to read this doc when we need to implement transactions in more complex scenarios:
https://learn.microsoft.com/it-it/ef/ef6/saving/transactions?redirectedfrom=MSDN

Observable models and entity: https://learn.microsoft.com/it-it/ef/core/change-tracking/change-detection

### Mapping of Objects (DTO, integration events...)

https://medium.com/@ramyelnaghy/choosing-the-right-net-core-object-mapper-a-comparative-guide-175ae215845b
we found that tinymapper is best

https://learn.microsoft.com/en-us/archive/msdn-magazine/2019/november/csharp-iterating-with-async-enumerables-in-csharp-8

https://github.com/TinyMapper/TinyMapper/wiki/Custom-mapping

### CRUD with ef core

https://learn.microsoft.com/en-us/ef/core/saving/related-data#adding-a-related-entity

### Multitenancy

Veraeasy can map multitenant in different ways:

- user can view contacts of more tenants and can manage more tenants and switch from tenant A to tenant B
- user is part of the tenant organization in this case to manage partitioned contacts another entity of Type
  ContactGroup nned to be managed
  ß
  https://learn.microsoft.com/it-it/ef/core/miscellaneous/multitenancy#conclusion

https://github.com/dotnet/EntityFramework.Docs/tree/main/samples/core/Miscellaneous/Multitenancy

### Email verification steps

The Email verification module is responsible to receive ContactVerificationCreated integration events
his endpoint is a startEmailVerification.
When an email verification is started then:

- Generate an OTP: Use a library or custom code to generate a random OTP and associate it with the user's email address
  in your application's database.
- Send OTP: Send the OTP to the user's email address using an email service provider or an SMTP server. Include clear
  instructions on how to proceed with the verification process.
- Validate OTP: FINALLY When the user enters the received OTP, compare it with the stored OTP in the database. If they
  match, mark the email address as verified and allow the user to proceed.

#### Email sender service

we found more strategies trough smtp releay trough http cloud service
https://jonathancrozier.com/blog/smtpclient-is-obsolete-the-new-way-to-send-emails-from-your-net-app
then we found
https://github.com/dotnet/platform-compat/blob/master/docs/DE0005.md
https://github.com/jstedfast/MailKit
https://medium.com/@abhinandkr56/how-to-send-emails-using-net-core-mailkit-and-googles-smtp-server-6521827c4198

#### Security considerations

- Secure Storage: Store OTPs securely in your application's database, utilizing encryption and hashing techniques to
  protect sensitive information.
- Expiration Time: Set an expiration time for OTPs to ensure that they are valid for a limited duration. This helps
  prevent misuse of expired OTPs.
- Rate Limiting: Implement rate limiting mechanisms to prevent brute-force attacks or automated attempts to verify OTPs.
- Error Handling: Implement proper error handling to handle exceptions during the email verification process, providing
  meaningful error messages to users.

## Package all with docker

https://devblogs.microsoft.com/ise/dotnet-multi-repo/
https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file
https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-8.0#evcp

### Backend

### Local docker build

dotnet publish -c Release
docker build -t veraeasy-image -f Dockerfile .
docker create --name veraeasy-app veraeasy-image
docker start veraeasy-app

### Dcoker build and deploy

docker build -t veraeasy.azurecr.io/veraeasy:latest -f Dockerfile .

docker run -it veraeasy.azurecr.io/veraeasy:latest

az login
az account set -s <subscription ID>
az config set defaults.acr=<your registry name>
az acr login

docker push veraeasy.azurecr.io/veraeasy:latest

https://learn.microsoft.com/en-us/dotnet/core/docker/build-container?tabs=linux&pivots=dotnet-8-0#publish-net-app

### Kubernetes on Azure (without or not VM or AKS)

https://bluexp.netapp.com/blog/azure-anf-blg-kubernetes-in-azure-architecture-and-service-options
https://bluexp.netapp.com/blog/azure-cvo-blg-azure-container-instances-vs-aks-how-to-choose#h_h2
https://kubernetes.io/docs/reference/access-authn-authz/rbac/

https://learn.microsoft.com/it-it/azure/aks/cluster-container-registry-integration?tabs=azure-cli
veraeasy-k8s-dns

https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-macos

az aks show --name VeraeasyK8sCluster --resource-group VeraeasyResourceGroup

az aks stop --name VeraeasyK8sCluster --resource-group VeraeasyResourceGroup

az aks start --name VeraeasyK8sCluster --resource-group VeraeasyResourceGroup

az aks update -n VeraeasyK8sCluster --resource-group VeraeasyResourceGroup --attach-acr veraeasy

https://www.geeksforgeeks.org/difference-between-kubernetes-ingress-and-loadbalancer/

## Expose health checks

https://blog.devart.com/how-to-implement-health-checks-in-asp-net-6.html

## Expose services

- to expose http services ingress
- to expose other tyopes of service NodePort
- to secure db and other ClusterIp

- kubectl -n lb-namespace port-forward service/postgresql-1683898476 55432:5432
-

https://github.com/acehko/kubernetes-examples/tree/main/postgres
https://github.com/dbeaver/cloudbeaver/wiki/Run-Docker-Container

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
https://state-updates.vercel.app/

https://react.dev/reference/react/Component#static-proptypes

### Tailwind CSS

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

https://www.npmjs.com/package/classnames

you will notice that text-white will override all other colors used in the buttons. A very quick and easy solution is to
use the tailwind-merge utility library as mentioned in the thread here.

npm install tailwind-merge
import { twMerge } from 'tailwind-merge';

```css

const classes = twMerge(
    className('px-3 py-1.5 border', {
    'border-blue-500 bg-blue-500 text-white': primary,
    'border-gray-900 bg-gray-900 text-white': secondary,
    'border-green-500 bg-green-500 text-white': success,
    'border-yellow-400 bg-yellow-400 text-white': warning,
    'border-red-500 bg-red-500 text-white': danger,
    'rounded-full': rounded,
    'bg-white': outline,
    'text-blue-500': outline && primary,
    'text-gray-900': outline && secondary,
    'text-green-500': outline && success,
    'text-yellow-400': outline && warning,
    'text-red-500': outline && danger
    })
);

```

https://www.udemy.com/course/react-redux/learn/lecture/34695062#questions/19109310

### Icons

https://react-icons.github.io/react-icons/

### Event handlers

use destructuring of all other props to pass trough all event handler for compoenents

### Redux and  ReduxToolkit

createSlice
useSelector
useDispatch
configureStore
createAsyncThunk (need extraReducers when creaitng slices for managing correctly async netowrk request response state)
such as

- pending
- fulfileld (succesS)
- rejected (error)

### Loading

use skeletong with a loading animation with shimeer and taliwind css

### Async thunk common behaviors refactoring

https://www.udemy.com/course/react-redux/learn/lecture/34697372#overview

``` javascript
    function useThunk(thunk) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    
    const runThunk = useCallback(() => {
        setIsLoading(true);
        dispatch(thunk());
        .unwrap()
        .catch((err) => setError(error))
        .finally(() => setIsLoading(false));
    }, [dispatch, thunk]);
    
    return [runThunk, isLoading, error];
    }
```

then to use common thunk behavior

```
    const [doRunThunk, isLoading, isError] = useThunk(myCustomAsyncThunk);
```

in this way we have wrapper our thunk to a loading logic
not the usecallback function to keep the same reference to dispatch and thunk

### Using typescript and vite with ui shadcn components

https://ui.shadcn.com/docs/installation/vite
schema validation https://zod.dev/?id=basic-usage
forms https://react-hook-form.com/get-started#TypeScript, https://www.udemy.com/course/react-redux/learn/lecture/42293622#overview
form event React.FormEvent<HtmlformEvent>

routing using react routers

using tanstack query instead of async thunks to benefits from cqrs
https://tanstack.com/query/latest/docs/framework/react/examples/optimistic-updates-ui