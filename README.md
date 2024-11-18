# Uphold Assessement - Currency Converter

This challenge was developed using Vite + React + Tailwind + Playwright.

## Setup Project:

Create a .env based on the .env.example file.

You can use the same values of both keys.

```
VITE_UPHOLD_CLIENT_ID=foo
VITE_UPHOLD_CLIENT_SECRET=bar
```

## Run the project:

```
npm install
npm run dev
```

## Run the tests:

```
npm run tests
```

## Observations

- I decided to not create a React context as it would be an overkill for a project of this size.
- The design assets didn't specified distances nor fonts, but I tried to make it as much pixel perfect as I could.
- On tests, I had to mock up the SDK fetch, as I couldn't access the endpoint. It might be related to CORS. Playwright also disencourages [testing third-party dependencies](https://playwright.dev/docs/best-practices#avoid-testing-third-party-dependencies). Not knowing exactly what the server requires, I assumed mocking data would be the best way.
- I left some currencies that lead to errors when calling the api. INR, for example, is one of them. That way I could show/test the error messages when failing to fetch data.
- Both Header and Footer menus are dynamic and managed by a file.
- Node version used was **v22.5.1**.
