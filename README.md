# Shopify Summer 2021 Internship Challenge
[![Netlify Status](https://api.netlify.com/api/v1/badges/f5c0408c-13de-4b4a-a477-47ecff6755a1/deploy-status)](https://app.netlify.com/sites/shopify2021/deploys)

Try it [here](https://shopify2021.netlify.app/)

This document contains lists and recordings of all features implented in the project.

## Table of Contents
- [TL;DR](https://github.com/madebyjustinzhang/shopify-2021#tldr)
- [Tools](https://github.com/madebyjustinzhang/shopify-2021#tools)
- [Specified Features](https://github.com/madebyjustinzhang/shopify-2021#specified-features)
- [Extra Features](https://github.com/madebyjustinzhang/shopify-2021#extra-features)

## TL;DR
My application adds new features such as additional movie details, mobile friendly view, interaction animations, and more! My goal with this project was to create a simple to use platform that also felt fluid to use.

#### List of Extra Features
- Additional movie details modal
- Animations, loading states, and empty states
- Load more function
- Nomination list collapses behind modal on mobile view
- Nominations persisting on reload
- Landing and summary pages

## Tools

- React
- Netlify, for hosting
- Cloudfront + S3, for CDN & Asset Store
- Figma, for mockups and planning - [See Mockup](https://www.figma.com/file/GFMA2IxSD5m1jh783NQMlv/Shopify-Front-End-Developer-Intern-2021-Challenge?node-id=0%3A1)
- Shopify Polaris, for components & layout
- Framer Motion API, for animations
- React Icons, for icons
- React Router, for navigation
- Axios, for API requests

## Specified Features

### Search and Nomination

![gif of person using the application](https://github.com/madebyjustinzhang/shopify-2021/blob/master/read%20me%20images/main-features-1-animated.gif)

### Notification For 5 Nominations

![gif showing the banner pop-up for 5 notifications](https://github.com/madebyjustinzhang/shopify-2021/blob/master/read%20me%20images/main-features-2-animated.gif)

## Extra Features

### Movie Details Page
This shows information such as actors, directors, a plot summary, and even movie posters

![image movie details page](https://github.com/madebyjustinzhang/shopify-2021/blob/master/read%20me%20images/movie-details-regular.png)

### Animations, Loading States, and Empty States 
General interaction animations and design considerations for the application

![gif of main screen](https://github.com/madebyjustinzhang/shopify-2021/blob/master/read%20me%20images/movie-details-animated.gif)
![gif of movie details loading in](https://github.com/madebyjustinzhang/shopify-2021/blob/master/read%20me%20images/search-page-animated.gif)

### Load More Function
Allows the user to load more movie results once they scroll to the bottom of the page

![gif of user loading more results](https://github.com/madebyjustinzhang/shopify-2021/blob/master/read%20me%20images/load-more-animated.gif)

### Mobile Friendly View
Collapses the nomination list for mobile screens

![gif of collapsed nomination list](https://github.com/madebyjustinzhang/shopify-2021/blob/master/read%20me%20images/mobile-nominationlist-animated.gif)

### Error Handling
Built a flexible erorr handling system using react hooks

![gif of a search error](https://github.com/madebyjustinzhang/shopify-2021/blob/master/read%20me%20images/error-message-animated.gif)

### Persistent Nomination List & Notification System
Saves the nomination list in `localStorage` to allow the user to reload the page. Also takes advantage of the notification system to tell the user that there was saved data.
- I stored the data in plain text as this was simple data, however if it was sensitive data, I would've used `JWT`

![gif of user reloading the page](https://github.com/madebyjustinzhang/shopify-2021/blob/master/read%20me%20images/persistent-memory-animated.gif)

### Summary Page
Presents the user's nominations with their posters

![gif of the summary page](https://github.com/madebyjustinzhang/shopify-2021/blob/master/read%20me%20images/summary-page-animated.gif)

## Reflections
If I had more time, I would like to try creating a system to store nominations. By creating a database and saving everyone's nominations, I could then create the aggregation service to pull insights and tally up the results. I would also want to look into combining API calls or creating some sort of cache as there is a daily limit. 
