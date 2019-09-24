<p align="center">
  <a href="https://www.foursevens.be">
    <img alt="Foursevens" src="./src/images/logo.png" width="200" height="49" />
  </a>
</p>

# Develop

The project is made with [Gatsby](https://www.gatsbyjs.org/).

You can start developing by starting the development server.

```sh
yarn start
```

## Tooling

Make sure your IDE has plugins to repspect the [ESLint](<[ESLint](https://eslint.org/)>) and [stylelint](https://stylelint.io/) config.

## Caching Wordpress

Because each time we start the local development server we need to download all data from Wordpress, it is recommended to cache the HTTP calls with [memento](https://www.npmjs.com/package/@antoinechalifour/memento).

You'll need to run these two commands in a separate terminal.

```sh
yarn memento
```

```sh
yarn start:memento
```

To further decrease startup times you can also choose to only download the Dutch Wordpress resources instead of all languages.

```sh
# Without memento
yarn start:nl
# With memento
yarn start:memento:nl
```

## Deploy

`// TODO`
