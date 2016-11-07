# YCM-React
YCM-React is an effort to develop a new frontend for [YouComedy.me](http://youcomedy.me) using the latest frontend stack like ES6/ES7, React/Preact, Webpack, Babel, etc. The architecture of YCM-React is partly described in [this document](https://github.com/slmgc/preact-baobab-template/blob/master/README.md).

## How to build
This instruction covers only macOS. Windows/Linux systems could require system-specific steps, but it should be quite easy to setup the project for these systems as well.

```bash
# install brew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# install node
brew install node

# install yarn
npm i -g yarn

# install dependencies
yarn install

# run development server
yarn start
```

## License
[MIT](https://github.com/YouComedy/ycm-react/blob/master/LICENSE)