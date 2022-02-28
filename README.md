# Space Invaders Plugin

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Plugin

This produces a plugin for the [notebook-sdk](https://i2group.github.io/notebook-sdk/) - creating an "Arcade" plugin with a space invaders game.

### Dev proxy

Launch the proxy using

```
npx @i2analyze/notebook-sdk-plugin-proxy --config devproxy.json
```

and edit devproxy.json to point at your deployment.

## Outstanding issues

1. The game does not clean up after itself- so you need to select and removed the records after playing.
1. You need to keep focus on the toolview panel whilst playing or the keyboard actions won't be picked up
1. Scoring isn't tracked
1. Invaders don't fire missiles
1. Add bunkers for the laser to hide behind
1. Add the occasional flying saucer
