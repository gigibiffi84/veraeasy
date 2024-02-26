# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


### Parallax effect
https://daily-dev-tips.com/posts/tailwind-css-parallax-effect/

### Scroll into view with ref list
https://blog.saeloun.com/2023/06/08/scrolling-to-the-element-with-fixed-header-using-scrollIntoView/

### Reminder on useCallback and useRefs 
Use callback is used to cache function definition during the curren re-render, if no new render is needed bind to thos deps no new function si redefined
so it is useful to recreate function definition when one of the parameters function values changes
it's a best practice to bind the usecallback deps with instance compoennt parameters to be sure that 
function input is bound to component data.

https://react.dev/reference/react/useCallback

Use ref is used when you want to update date and do NOT want to trigger re-render.
https://react.dev/reference/react/useRef