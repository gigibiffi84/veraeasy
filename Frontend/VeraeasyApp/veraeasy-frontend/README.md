# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast
  Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked`
  or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and
  add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

### Parallax effect

https://daily-dev-tips.com/posts/tailwind-css-parallax-effect/

### Scroll into view with ref list

https://blog.saeloun.com/2023/06/08/scrolling-to-the-element-with-fixed-header-using-scrollIntoView/

### Reminder on useCallback and useRefs

Use callback is used to cache function definition during the curren re-render, if no new render is needed bind to thos
deps no new function si redefined
so it is useful to recreate function definition when one of the parameters function values changes
it's a best practice to bind the usecallback deps with instance compoennt parameters to be sure that
function input is bound to component data.

https://react.dev/reference/react/useCallback

Use ref is used when you want to update date and do NOT want to trigger re-render.
https://react.dev/reference/react/useRef

### Rooks (utilis hooks)

https://rooks.vercel.app/docs/useLocalstorageState
https://usehooks.com/uselocalstorage

### Icons and images

icons are from lucide icons
images are taken form https://lovepik.com/images/png-login.html

### React router

https://blog.logrocket.com/authentication-react-router-v6/

### React-rxjs for bind state to stream

https://react-rxjs.org/docs/getting-started WARNING DEPRECATED
WE CHOOSED TO USE OBSERVABLE HOOKS INSTEAD
https://observable-hooks.js.org/examples/#conditional-rendering-vanilla-javascript

https://www.npmjs.com/package/react-error-boundary
https://javascript.plainenglish.io/getting-best-of-rxjs-redux-react-f4c369ab181a

https://javascript.plainenglish.io/getting-best-of-rxjs-redux-react-f4c369ab181a

https://redux-observable.js.org/docs/basics/Epics.html

### Stateful search component

https://codesandbox.io/p/devbox/github/crimx/observable-hooks/tree/main/examples/typeahead?file=%2Fsrc%2Findex.tsx%3A18%2C29-18%2C33

### React redux store and performances notes about memoized component

https://react-redux.js.org/api/hooks#performance

As mentioned earlier, by default useSelector() will do a reference equality comparison of the selected value when
running the selector function after an action is dispatched, and will only cause the component to re-render if the
selected value changed. However, unlike connect(), useSelector() does not prevent the component from re-rendering due to
its parent re-rendering, even if the component's props did not change.

If further performance optimizations are necessary, you may consider wrapping your function component in React.memo():

```
const CounterComponent = ({ name }) => {
  const counter = useSelector((state) => state.counter)
  return (
    <div>
      {name}: {counter}
    </div>
  )
}

export const MemoizedCounterComponent = React.memo(CounterComponent)

```

### Autocomplete

https://www.armand-salle.fr/post/autocomplete-select-shadcn-ui

### Reactour

https://docs.react.tours/quickstart

### Logo generator

https://logomark.ai/

### Seed data

To seed data was introduced json-serverdb
To manage logged users https://www.npmjs.com/package/json-server-auth

Protected routes are:

    - /664/*	User must be logged to write the resource. Everyone can read the resource.
    - /660/*	User must be logged to write or read the resource.
    - /644/*	User must own the resource to write the resource. Everyone can read the resource.
    - /640/*	User must own the resource to write the resource. User must be logged to read the resource.
    - /600/*	User must own the resource to write or read the resource.
    - /444/*	No one can write the resource. Everyone can read the resource.
    - /440/*	No one can write the resource. User must be logged to read the resource.
    - /400/*	No one can write the resource. User must own the resource to read the resource.