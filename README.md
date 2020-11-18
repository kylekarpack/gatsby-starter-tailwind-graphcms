# Watershed Science & Engineering

[![Netlify Status](https://api.netlify.com/api/v1/badges/0f83a204-0489-4f67-ba53-69f58f10c966/deploy-status)](https://app.netlify.com/sites/silly-wiles-62dd0b/deploys)

Watershed Science & Engineering's new website

## Show me the CMS!

The CMS lives at [\_\_YOUR_SITE_NAME\_\_.netlify.com/admin](https://__YOUR_SITE_NAME__.netlify.com/admin).

## Developing

1.  Clone your repo to your local machine

1.  Install dependencies

`yarn` or `npm install`

1.  Run the development server

`yarn start` or `npm run start`

If you are adding or editing content locally in the CMS, a couple of things to note:

1.  Changes will be pushed to the remote repo.

1.  You will be prompted to enter your site's url, this is necessary for Netlify Identity to manage user login. This is stored in `localStorage`, so you might have to empty your browser cache if you are switching projects but remaining on `localhost:8000`.

## Editing CMS fields

The Netlify CMS configuration is located in `public/admin/config.yml`. This is where you will configure the pages, fields, posts and settings that are editable by the CMS.

Find out more in the [Netlify CMS Docs](https://www.netlifycms.org/docs/#configuration).

## Uploadcare setup

Uploadcare is our file upload system. It hosts the files for us and delivers them trough their CDN network.
Each site you'll create need its own Uploadcare API key's. See below how to set this up

1. Create new project in Uploadcare and save API keys in project

- Go to [Uploadcare.com](https://uploadcare.com/accounts/login/) and login
- Once on the dashboard create a new project
- Set the name and hit create
- In the left menu click in API Keys and copy the public key
- Now open your project and open the CMS congif.yml file
- find the `media_library` settings and paste in the public key after `publicKey:`
- Done!!

For more details see the [Netlify CMS Docs](https://www.netlifycms.org/docs/uploadcare/)