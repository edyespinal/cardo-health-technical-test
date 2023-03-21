# Cardo Health Technical Test

Hi, thanks for the fun coding challenge!

Let's just get some things out of the way first.

- Did it take me more time than I expected?
  **Yes**
  <br>
- Did I try to implement some things I haven't used before?
  **Yes**
  <br>
- Was it a good idea to implement things I'm not sure will work?
  **Probably not...**
  <br>
- Was it worth it?
  **Yes, and it was fun as well**
  <br>

## Before we start

I take coding challenges as opportunities to learn something new and to test technologies I haven't used before.
For this one I decided to try to implement [`tRPC`](https://trpc.io/) (which I haven't used extensively before) to get a solid, type-safe, scalable and stable API and data layer for the application[^1].
[^1]:_I have to say I'm quite impressed with tRPC_

Having said that, I ran into some problems with the deployment to AWS regarding my account. I temporarily deployed it in a different platform (Vercel, which doesn't support containers) but it currently has some configuration issues regarding `CORS` which is preventing the frontend to properly communicate with the backend.

If you which to test the application locally:
**Frontend**

- Create .env file with the following

```
VITE_API_URL="https://cardo-backedn.vercel.app/v1/api"
VITE_PLACEHOLDER_IMAGE="/static/img/placeholder-image.png"
```

- run `yarn dev` inside the frontend folder.

**Backend**

- Create .env file with the following:

```
PORT=3000
```

- Run `yarn dev` inside the backend folder.

## The Codebase

For the entire codebase we are using TypeScript and applying linting (**ESLint**) and formatting (**Prettier**) rules with a pre-commit hook using **husky** and **lint-staged**.

### Backend

For the backend I decided to go with NodeJS + Express. It is a simple server which, right now, is "wide open" with `CORS` allowing calls from anywhere without requiring some form of authorization.

You can find a deployed version of the backend here:
[CardoBooks Backend](https://cardo-backend.vercel.app/)

### Frontend

You can find a deployed version of the app here: [CardoBooks Frontend](https://cardo-frontend.vercel.app/)

### What would I improve if I had more time?

- Error handling. Right now, we ae only handling some errors.
- Correct deployment. There is some misconfiguration with `CORS`.
- Authentication and authorization on the backend.
- Testing and code coverage.

<div style="margin-top: 5rem">
Cheers 🍻

**Edy Espinal**

</div>
