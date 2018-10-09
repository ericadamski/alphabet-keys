import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import styled, { injectGlobal } from 'styled-components';
import * as serviceWorker from './serviceWorker';

const synth = window.speechSynthesis;

const keys = {
  48: ['0', '𝟬', '0️⃣'],
  49: ['1', '𝟏', '1️⃣'],
  50: ['2', '𝟐', '2️⃣'],
  51: ['3', '𝟑', '3️⃣'],
  52: ['4', '𝟒', '4️⃣'],
  53: ['5', '𝟓', '5️⃣'],
  54: ['6', '𝟔', '6️⃣'],
  55: ['7', '𝟕', '7️⃣'],
  56: ['8', '𝟖', '8️⃣'],
  57: ['9', '𝟗', '9️⃣'],
  65: ['a', '🍎', '👽', '⚓️'],
  66: ['b', '🍌', '👶', '🦇'],
  67: ['c', '🐄', '🐱', '🤠'],
  68: ['d', '🐶', '💃', '🦌'],
  69: ['e', '🥚', '👁️', '🦅'],
  70: ['f', '🐸', '🍟', '🐾'],
  71: ['g', '🍇', '👻', '🦍'],
  72: ['h', '🥅', '🐹', '🌺'],
  73: ['i', '🦎', '👿', '🍦'],
  74: ['j', '🤹🏼‍♀️', '👖', '🕹️'],
  75: ['k', '🔪', '🛶', '🔑'],
  76: ['l', '🛋', '👄', '🐆'],
  77: ['m', '🌝', '📫', '🍈'],
  78: ['n', '👃', '🎶', '🤓'],
  79: ['o', '🐙', '👌', '🌊'],
  80: ['p', '🥞', '🍐', '🥘'],
  81: ['q', '👸🏻', '🇶🇦', '❓'],
  82: ['r', '🐇', '🤖', '♻️'],
  83: ['s', '🐍', '🤳', '🥗'],
  84: ['t', '🦃', '🐯', '🌮'],
  85: ['u', '☂️', '🆙', '🦄'],
  86: ['v', '🎻', '🏐', '🌋'],
  87: ['w', '🌊', '🍉', '🚶'],
  88: ['x', '🐂', '🇽🇰', '❌'],
  89: ['y', '🧘‍♀️', '💴', '☯️'],
  90: ['z', '🦓', '💤', '⚡️']
};

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
`;

const Letters = styled.span`
  font-size: 10rem;
`;

class App extends Component {
  state = { emoji: '', letters: '' };

  componentDidMount() {
    this.key = fromEvent(document, 'keydown')
      .pipe(filter(({ keyCode }) => keyCode in keys && !synth.speaking))
      .subscribe(({ keyCode }) => {
        const [letter, emoji] = keys[keyCode];

        this.setState(
          {
            emoji,
            letters: isNaN(+letter) ? `${letter.toUpperCase()} ${letter}` : ''
          },
          () => synth.speak(new SpeechSynthesisUtterance(letter)),
          synth.speak(new SpeechSynthesisUtterance(emoji))
        );
      });
  }

  componentWillUnmount() {
    this.key && this.key.unsubscribe();
  }

  render() {
    return (
      <Container>
        {!this.state.emoji && <Emoji>Press a key!</Emoji>}
        <Emoji role="img" aria-label="emoji">
          {this.state.emoji}
        </Emoji>
        <Letters>{this.state.letters}</Letters>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
