## News feed App using newsapi.org

This is a Fullstack [Next.js](https://nextjs.org/) project for CondeNast

## Getting Started

Follow - run the development server:

- First need to insert the ```News_API_key```. Please run as below

```bash
npm run put-key -- "PUT_KEY_HERE" #(I have sent in mail)
```

example usage : `npm run put-key -- 84cf2433bbd546b51fb8`

** API_KEY is loaded from `.env.local` file. Above command creates it and dumps the key.

- Next step
```bash
npm i
npm run dev
```
-- OR -- 

- For production build

```bash
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/news](http://localhost:3000/api/news). This endpoint can be edited in `pages/api/news.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## About this project

Points to note

- Basic accessibility (A11Y) covered
- Mobile view compatible
- Initial SSR for SEO
- Isomorphic React components
- Load more - defer the loading.

## Project by
Niranjan Kumar
