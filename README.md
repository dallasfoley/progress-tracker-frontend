# Progress Tracker Frontend

### The frontend for a Reading Progress Tracker application

Backend: https://github.com/dallasfoley/progress-tracker-backend

## The overall structure of the entire application

![image](https://github.com/user-attachments/assets/817a383e-9cec-4365-bd33-16106fcadedf)


We have a Next.js application deployed through Vercel, which runs in the client's browser runtime environment as well as on a Node.js runtime environment through serverless functions. Our Next.js backend is connected to our Java/Javalin RESTful API deployed on an AWS EC2 instance through a Docker container, with an NGINX reverse proxy between the frontend and container running the backend, which is connected to our MySQL database managed by AWS RDS.

Javalin is our backend framework of choice for exposing API routes to our frontend. Given how small of an API this is (4 controllers, 4 DAOs, 3 tables in our SQL schema), it didn't seem necessary to include a service layer between our DAOs and controllers. Our main class creates our DAOs and controllers, configures our CORS, access headers, cookie headers and other headers while the EnvironmentConfig and ConnectionManager load up statically.

We utilize Next.js as a proxy layer between the client and the Javalin server, which allows us to keep all of the calls to the Javalin server on the server side which enhances security by hiding sensitive data from the client, validates and sanitizes all user inputs, etc. It also greatly enhances performance by allowing us to cache our statically rendered routes (technically caching their RSC Payload, we also cache the static components of our dynamically rendered routes through Next.js's experimental Partial Prerendering), caching our requests to the Javalin server with its Data Cache along with a few other caching layers detailed in the frontend README.md.

## Technologies Used

### Next.js

Before I start on why Next.js, it helps to give some background on the history of rendering webpages.

#### Traditional Multi-Page Application (MPA)

This is how websites were traditionally rendered (back in the dark ages of PHP/WordPress), where each page is a separate HTML document. When a user navigates between pages, the browser makes a request to the server, which returns a newly rendered, complete HTML page. This causes a full page reload, which is not great for performance.

#### Single-Page Applications (SPA)

SPAs made with purely client-side frameworks/libraries such as React and Angular attempt to solve the performance issues of MPAs by downloading all the HTML, CSS and JavaScript when the user initially navigates to the site. Then subsequent navigations don't require full-page reloads: rather than requesting a new document for each route, client-side JavaScript manipulates the current page’s DOM and fetches data as needed. This results in instant page navigations for routes that don't require fetching on load. However, frontloading the entire bundle starts to be a large problem as your app scales. Modern client-side solutions require complex patterns to manage lazy-loading routes (deferring loading of the route) and prefetching when a user is likely to navigate to them.

#### Next

The Next.js team attempts to bridge this gap by offering a variety of rendering strategies, allowing you to pick the best method in each case and trying their best to optimize each. You can choose static rendering, where you don't need request-time data to render your pages and build time and cache them for instant page navigations, or dynamic rendering, when you need request-time data and generate the HTML on the server and stream HTML as it becomes rendered. You can choose server-side rendering for components that don't need any client-side functionality (things like event-handlers such as onSubmit, onChange, or React hooks or browser-only APIs) to render them and only opt-in to client-components when we need to. This allows us to keep the JS bundle we send to the client small and allows for quicker navigations for routes that require fetching on render. When mixed with Next.js's prefetching, we can achieve the same instant page navigations through Next.js's client-side transition. More on this below. Given how small of an application we have, React with Tanstack Query and Tanstack Router would also suffice, but Next can give us even better performance when properly optimized.

### TypeScript

Allows type checking for our JavaScript code. Invaluable for any JS app requiring data fetching or even form submissions.

### Tailwind

Allows us to write CSS in the same file as our JS using utility classes, allows global CSS variables and comes with utility functions which greatly enhances the speed of writing CSS.

### Shadcn UI

A TypeScript and Tailwind compatible component UI library for a variety of JS frameworks. Typically, when building a frontend, you'd have to choose between building all the CSS and JS functionality of your UI components yourself or choose a component library where much of that work was done for you, but you couldn't easily customize these components with styling or functionality changes. Shadcn solves this by loading the Tailwind-styled components that we need right into our local code base in .tsx files, giving us a completely customizable component library.

```sh

pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add input button form label select ...

or

npx shadcn@latest init
npx shadcn@latest add input button form label select ...

```

### Zod

Zod is basically another type wrapper over our TypeScript that allows us to create much more complex type schemas than with TypeScript that can be used to validate and parse data. It also integrates extremely well with React-Hook-Form and Shadcn UI Form components (Shadcn UI forms are meant to be built with Zod and React-Hook-Form).

```javascript
export const BookSchema = z.object({
  id: z.number().int().min(1),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  coverUrl: z.string().url(),
  description: z.string(),
  rating: z.number().int().min(0).max(5),
  yearPublished: z.number().int(),
  genre: z.string(),
  pageCount: z.number().int().min(1, "Page count must be at least 1"),
});

export type Book = z.infer<typeof BookSchema>;
```

### React-Hook-Form

A simple solution for form validation that integrates effortlessly with our complex Zod schemas and Shadcn UI Forms (see /src/components/forms).

## Authentication and Authorization

### Authentication

We utilize JWTs stored in cookies passed back and forth from client to server. When the user logs in or signs up through a form, the request is sent through a Next.js server action to the Javalin server, which makes a call to the database through our connection manager with HikariCP (to pool connections) to verify the given credentials. If successful, the Java backend will send back a successful response to the browser containing the user info, a secure, httpOnly cookie containing the encrypted access token and a secure, httpOnly cookie containing the encrypted refresh token. This is stored in the browser and attached to API calls to the Java backend in the Next.js proxy layer.

### Authorization

When a user makes a request to an API route on our Java backend that requires authentication, the Java Middleware class is run before the request and checks if the user has a valid access token in the Authorization header. If so, we allow the request to be sent to the endpoint. If not, we return a 401 status code. When the Next.js proxy layer receives a 401 status code, it will attempt to call the /api/auth/refresh endpoint to get a new access token with the refresh token. If successful, the Next.js proxy layer will retry the request with the new access token, otherwise it will display an error message to the user and redirect them to the home page.

#### The following is my attempt of concisely explain the options Next.js gives you to optimize performance, and how we choose to optimize the performance of this application:

## Rendering and Caching

These two concepts are extremely intertwined and central in Next.js

### Rendering

Rendering is essentially the process of Next running your code and producing HTML hydrated with JS (and loading CSS and other assets in your bundle). You typically have pages that are made up of server and client components where server components that don't rely on client-side functionality are rendered on the server and client components are rendered on the client.

On the server, Next.js uses React's APIs to orchestrate rendering. The rendering work is split into chunks: by individual routes segments and Suspense boundaries.

Each chunk is rendered in two steps:

1. React renders Server Components into a special data format, optimized for streaming, called the React Server Component (RSC) Payload which contains the rendered result of Server Components, placeholders for where client components should be rendered and references to their JS files and any props passed from a server component to a client component.

2. Next.js uses the RSC Payload and client component JS instructions to render HTML on the server. This means we don't have to wait for everything to render before caching the work or sending a response. Instead, we can stream a response as work is completed. For statically rendered routes, the RSC Payload is cached server-side for near-instant renders.

Streaming (a very important rendering concept we employ often): Wrapping components that rely on data fetching in Suspense boundaries splits our route into chunks and progressively streams them to the client as they render. This allows the user to see parts of the page immediately (the pre-rendered layout and loading page), before the entire content has finished rendering. In Partial Prerendering, we can render the static shell immediately and the dynamic components wrapped in Suspense start streaming from the server in parallel.

At request time on the client:

1. the HTML is used to immediately show a fast non-interactive initial preview of the client and server components.

2. The RSC Payload is used to reconcile the client and rendered server component trees, and update the DOM.

3. The JavaScript instructions are used to hydrate client components and make the application interactive.

This encourages us to move as much rendering to the server side as we can to keep the JS bundle small and the time to download the JS and hydrate the page low.

### The many layers of caching

There exists so many layers of caching in React and Next.js alone (mostly backend caching but some frontend caching) that we don't need to reach for other third-party caching solutions such as Tanstack Query (formerly React Query), SWR, Redis/Upstash, etc. Understanding how they each work separately and together is crucial for building a functioning frontend in Next (particularly misusing 3-6 can break your application).

1. React Fetch Memoization (Server-Side)

   Across the span of a render, React overrides the fetch API to memoize fetch requests where React will check if that fetch call with the same url and options has already been made during that render and use the cached result instead if it exists. All fetch request memoizations are invalidated after the render completes. React does this automatically for us.

2. React cache function (Server-Side)

   Same sort of per-render memorization, but can wrap non-fetch functions. Not used here, but would've used if I was querying my database directly through Next.js instead of using Next.js as an API proxy for a separate backend.

3. Next.js Data Cache (Server-Side)

   Next.js then overrides the fetch function further to cache results persistently across renders, requests and even deployments, with different strategies for revalidation (time-based or tag-based revalidation). We use this to cache our more expensive fetch requests to our backend and revalidate through tabs when necessary.

4. Next.js Unstable Cache (Server-Side)

   Similar to the relationship between Request Memoization and the cache function. Next's unstable cache can wrap functions that don't rely on the fetch function and can cache their responses persistently in the Data Cache. Also was not utilized since we used Next as an API proxy instead of backend.

5. Next.js Full Route Cache (Server-Side)

   This is what allows for prerendering/static rendering. Next.js caches the RSC Payload of your static routes (each route separated into page, layout and loading files) and allows them to be served to the client instantly. Traditionally, with Next.js dynamic routes, we could statically prerender and cache their layouts and loading files, which we had to take time styling page and component skeletons and streaming in each component as it was ready in waterfall. With PPR, we can cache static components for dynamic pages and stream the dynamic components in parallel.

6. Next.js Router Cache (Client-Side).

   This is a client-side, in-memory store of the RSC payload of route segments, split by layouts, loading states, and pages. When a user navigates between routes, Next.js caches the visited route segments and prefetches the routes the user is likely to navigate to from the Full Route Cache. This results in instant back/forward navigation, no full-page reload between navigations, and preservation of browser state and React state in shared layouts. The Router Cache is what enables prefetching.

7. Next.js Experimental dynamicIO/useCache

   Next.js has a couple of experimental features that once stable should standardize the way we interact with caches 3-5, which could've improved performance, but I decided the existing methods we used were sufficient.

### Prefetching

When navigating between routes, the browser requests assets for the page like HTML, CSS and JavaScript files. Prefetching is the process of fetching these resources ahead of time, before you navigate to a new route.

Next.js automatically splits your application into smaller JavaScript chunks based on routes. Instead of loading all the code upfront like traditional SPAs, only the code needed for the current route is loaded. This reduces the initial load time while other parts of the app are loaded in the background. By the time you click the link, the resources for the new route have already been loaded into the browser cache.

Traditionally, navigation to a server-rendered page triggers a full page load. This clears state, resets scroll position, and blocks interactivity. Next.js avoids this with client-side transitions (or soft-navigations) using the `<Link>` component. Instead of reloading the page, it updates the content dynamically by:

1. Keeping any shared layouts and UI.
2. Replacing the current page with the prefetched loading state or a new page if available.

Client-side transitions are what makes a server-rendered apps feel like client-rendered apps. And when paired with prefetching and streaming, it enables fast transitions, even for dynamic routes.

Using PPR, we optimize this further by dividing a page into a static shell and a streamed dynamic section:

The shell, which can be prefetched, renders immediately
Dynamic data streams in parallel (using Promise.all) when ready
Data invalidations (revalidateTag, revalidatePath) silently refresh associated prefetches

### How it all comes together

Our static pages, layouts and loading files are rendered at build time and cached on Vercel's Edge Network (their optimization of a traditional CDN). Through PPR, our static components on our dynamic pages are also rendered and cached at build time.

When a user first accesses the static home page, the Edge serves the page nearly instantly. The `<Link>` components for the static auth routes enter the users' viewport and are prefetched from the Edge and and cached in-memory with the client-side Router Cache allowing for instant client-side transitions.

After authentication, the user is redirected to their dashboard page, which uses PPR to serve the static shell immediately from the Edge cache and stream the dynamic components in parallel as they become ready.

When the user navigates to a different page using the `<Link>` component, the static auth routes are prefetched from the Edge cache while the dynamic components are streamed in parallel.

Some routes only have 1 dynamic component that requires cookies to authorize the user on navigation which takes little time to execute and render.

Some routes have multiple dynamic components that require cookies and calls to the API/database. We utilize Next.js' Data Cache to cache the requests to the API and revalidate through tags when necessary while streaming the components in parallel as they become available, to optimize how these dynamic components are rendered as much as possible.
