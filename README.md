# Routing
    Reusable components are located at /components folder

    /pages/_app.js  <- layout wrapper and will be rendered at every page

[Source](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts)

## Front-end
    Everything inside of /pages folder will be rendered on the website 

    /pages/game.js  -> www.site.com/game
    /pages/about/me.js  -> www.site.com/about/me

## Back-end
    Everything inside of /pages/api folder will be run on the server 

    /pages/api/server.js  -> www.site.com/api/server


## Production

PM2 was used as Node.js process manager
(https://pm2.keymetrics.io/)

1) $ cd next-js 
2) $ sudo npm i
3) $ sudo npm run build
4) $ sudo pm2 start "sudo npm start" --name "NextApp"


## Getting Started Local

1) Install Node.js (https://nodejs.org/en)
2) $ cd next-js 
3) $ npm i
4) $ npm run dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
