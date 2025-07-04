# Progress Tracker Frontend

### The frontend for a Reading Progress Tracker application. 

Our frontend utilizes a Backend-For-Frontend architecture where as much of the rendering work is done on the server as possible. This allows us to optimize performance in a variety of methods and reduce the bundle size that needs to be sent to the client.

The overall structure of the entire application is as follows:

We have a Next.js application deployed through Vercel, which runs in the client's browser runtime environment as well as on a Node.js runtime environment through serverless functions (basically, AWS Lambda functions spin up managed EC2 instances where you don't need to interact manually with the server, Vercel adds a layer abstraction on top of this to spin up AWS Lambda Functions. Our Next.js backend is connected to our Javalin RESTful API deployed on an AWS EC2 instance through a Docker container, which is connected to our MySQL database managed by AWS RDS. We utilize JSON Web Tokens for auth.

## Technologies Used

### Next.js
Next.js is all about optimizing the performance of our React frontend, particularly optimizing how our pages are rendered, how we cache our pages/components/functions and SEO. Next.js proposes a model where as much of the frontend functionality as possible, usually rendering and data fetching/updating, is pushed to the backend. This can allow us to prerender our static pages (HTML that does not need to be generated at request time) and cache them in Vercel's Edge Network at build time so they can be rendered and hydrated instantly on the client. Dynamic pages, on the other hand, must be generated at request time. However, we can use Next to stream in components as their data is fetched. We also utilize Next.js's experimental Partial Prerendering (PPR) feature, which allows us to combine dynamic and static rendering to prerender and cache our static components while only dynamically rendering the components that need to be, on the same page. Much more on all of this below.

### TypeScript 
Allows type checking for our JavaScript code. Invaluable for any JS app requiring data fetching or even form submissions.

### Tailwind
Allows us to write CSS in the same file as our JS using utility classes, allows global CSS variables and comes with utility functions which greatly enhances the speed of writing CSS.

### Shadcn UI
A TypeScript and Tailwind compatible component UI library for a variety of JS frameworks. Typically, when building a frontend, you'd have to choose between building all the CSS and JS functionality of your UI components yourself or choose a component library where much of that work was done for you, but you couldn't easily customize these components with styling or functionality changes. Shadcn solves this by loading the Tailwind-styled components that we need right into our local code base in .tsx files, giving us a completely customizable component library.

### Zod 
Zod is basically another type wrapper over our TypeScript that allows us to create much more complex type schemas than with TypeScript that can be used to validate and parse data. It also integrates extremely well with React-Hook-Form and Shadcn UI Form components (Shadcn UI forms are meant to be built with Zod and React-Hook-Form).

## Rendering and Caching
These two concepts are extremely intertwined in Next.js. Rendering is essentially the process of Next running your code and producing HTML hydrated with JS and CSS. 
On the server, Next.js uses React's APIs to orchestrate rendering. The rendering work is split into chunks: by individual routes segments and Suspense boundaries. Each chunk is rendered in two steps:
React renders Server Components into a special data format, optimized for streaming, called the React Server Component (RSC) Payload which contains the rendered result of Server Components, placeholders for where client components should be rendered and references to their JS files and any props passed from a server component to a client component.
Next.js uses the RSC Payload and client component JS instructions to render HTML on the server. This means we don't have to wait for everything to render before caching the work or sending a response. Instead, we can stream a response as work is completed. For statically rendered routes, the RSC Payload is cached server-side for near-instant renders. 
At request time on the client, the HTML is used to immediately show a fast non-interactive initial preview of the client and server components.
The RSC Payload is used to reconcile the client and rendered server component trees, and update the DOM.
The JavaScript instructions are used to hydrate client components and make the application interactive.
This means we should move as much rendering to the server side as we can to keep the JS bundle small and the hydration time low. 

### The many layers of caching
There exists so many layers of caching in React and Next.js alone for both frontend and backend caching without even reaching for Tanstack Query (formerly React Query), SWR, browser caching headers, Redis/Upstash etc, so the built-in caching mechanisms are plenty useful.

#### Fetch Request Memoization and React cache
1. React Fetch Memoization (Server-Side). Across the span of a render, React overides the fetch API to memoize fetch requests where React will check if that fetch call with the same url and options has already been made during that render and use the cached result instead if it exists. All fetch request memoizations are invalidated after the render completes. React does this automatically for us.
   
2. React cache function (Server-Side). Same sort of per-render memorization, but can wrap non-fetch functions. Not used here but would've used if I was using my database directly through Next.js instead of using Next.js as an API proxy for a separate backend.

3. Next.js Data Cache (Server-Side). Next.js then overrides the fetch function further to cache results persistently across renders, requests and even deployments, with different strategies for revalidation (time-based or tag-based revalidation). We use this to cache our more expensive fetch requests to our backend and revalidate through tabs when necessary.

4. Next.js Unstable Cache (Server-Side). Similar to the relationship between Request Memoization and the cache function. Next's unstable cache can wrap functions that don't rely on the fetch function and can cache it in the Data Cache.

5. Next.js Full Route Cache (Server-Side). This is what allows for prerendering/static rendering/static site generation. Next.js caches the RSC Payload of your static routes and allows them to be served to the client instantly. With PPR, we can cache certain layouts and components for dynamic routes.

6. Next.js Router Cache (Client-Side).





## Auth

We utilize JWTs stored in cookies passed back and forth from client to server. When the user logs in or signs up through a form, the request is sent through a Next.js server action to the Java backend, which makes a call to the database through a database connection manager to verify the given credentials. If successful, the Java backend will send back a successful response to the browser containing the user info, a cookie containing the access token and a cookie containing a refresh token and its . 

Before I get any further, let me explain server actions and server functions which are critical in managing our cookies we store our users' data, access tokens and refresh tokens.
A Server Function is an asynchronous function that runs on the server. They can be called from client through a network request, which is why they must be asynchronous.

## Optimizations



















