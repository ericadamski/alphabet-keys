# Alphabet-Keys

🍎- The letters and numbers so my son can have some fun typing on the computer!

![operation](https://user-images.githubusercontent.com/6516758/46668577-cf698000-cb9a-11e8-8d5d-e503b2a3fa04.gif)

# Develop

## Getting Started
```bash
git clone https://github.com/ericadamski/alphabet-keys.git && cd alphabet-keys
yarn install
yarn start
```

## Add a Language
1. Add a new locale file in [src/data/emojis/](https://github.com/ericadamski/alphabet-keys/tree/master/src/data/emojis)
2. Import the new locale file at the top of [src/data/emojis/index.js](https://github.com/ericadamski/alphabet-keys/tree/master/src/data/emojis/index.js)
    1. Add the new lang file to the `allLangs` array in [src/data/languages.js](https://github.com/ericadamski/alphabet-keys/tree/master/src/data/languages.js) to make it available in the language menu.
    2. Spread the new locale data in the default export at the bottom of [src/data/languages.js](https://github.com/ericadamski/alphabet-keys/tree/master/src/data/languages.js) to make it available in the exported `SUPPORTED_LANGS` object.
3. Done!
