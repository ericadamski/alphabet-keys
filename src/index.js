import React, { Component } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import styled, { css, injectGlobal } from 'styled-components';
import KEYS from './data/keys';
import EMOJIS, { SUPPORTED_LANGS } from './data/emojis';
import * as serviceWorker from './serviceWorker';
import Selector from './selector';

const synth = window.speechSynthesis;

function media(query) {
  return css`
    @media screen and (max-width: 800px) {
      ${query};
    }
  `;
}

injectGlobal`
  /* latin */
  @font-face {
    font-family: 'ABeeZee';
    font-style: normal;
    font-weight: 400;
    src: local('ABeeZee Regular'), local('ABeeZee-Regular'), url(https://fonts.gstatic.com/s/abeezee/v11/esDR31xSG-6AGleN2tWkkJUEGpA.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  html, body {
    font-family: 'ABeeZee', sans-serif;
    padding: 0;
    margin: 0;
  }
`;

const Container = styled.section`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: #e3dcf7;
`;

const Emoji = styled.span`
  font-size: 10rem;
  line-height: 5rem;
  margin: 2rem;

  ${media(`
    font-size: 3rem;
    line-height: 2rem;
    margin: 0;
  `)};
`;

const Letters = styled.span`
  font-size: 10rem;
`;

const Reader = styled.textarea`
  position: absolute;
  top: -100vh;
`;

class App extends Component {
  state = { emoji: '', letters: '', lang: SUPPORTED_LANGS[0].key };
  read$ = new Subject();

  componentDidMount() {
    this.key = this.read$
      .pipe(filter(keyCode => keyCode in KEYS && !synth.speaking))
      .subscribe(keyCode => {
        const { letter } = KEYS[keyCode];
        const emojis = EMOJIS[this.state.lang][keyCode];
        let text;
        let emoji;

        if (emojis) {
          emoji = emojis[Math.floor(Math.random() * emojis.length)];

          if (Array.isArray(emoji)) {
            text = emoji[1];
            emoji = emoji[0];
          }
        }

        this.setState(
          {
            emoji,
            letters: isNaN(+letter)
              ? `${letter.toUpperCase()} ${letter}`
              : letter
          },
          () => {
            [
              new SpeechSynthesisUtterance(letter),
              emoji !== undefined && new SpeechSynthesisUtterance(text || emoji)
            ]
              .filter(Boolean)
              .forEach(utterance => {
                utterance.lang = this.state.lang;

                synth.speak(utterance);
              });
          }
        );
      });
  }

  changeLangTo = lang => {
    this.setState({ lang });
  }

  focusReader = () => {
    let node;

    this.reader && (node = findDOMNode(this.reader)) && node.focus();
  };

  componentWillUnmount() {
    this.key && this.key.unsubscribe();
  }

  render() {
    return (
      <Container onClick={this.focusReader}>
        <Reader
          aria-label="A hidden input to allow use on mobile devices"
          ref={n => (this.reader = n)}
          onChange={({ target }) =>
            this.read$.next(
              target.value.toLowerCase().charCodeAt(target.value.length - 1)
            )
          }
        />
        {this.state.emoji === '' &&
          this.state.letters === '' && <Emoji>Press a key!</Emoji>}
        <Emoji role="img" aria-label="emoji">
          {this.state.emoji}
        </Emoji>
        <Letters>{this.state.letters}</Letters>
        <Selector
          data={SUPPORTED_LANGS}
          selected={this.state.lang}
          onSelectLanguage={this.changeLangTo}
        />
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
