## How to this project

prject was created using this guide https://ui.shadcn.com/docs/installation/vite

npm create vite@latest
npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
{
"compilerOptions": {
// ...
"baseUrl": ".",
"paths": {
"@/*": [
"./src/*"
]
}
// ...
}
}
