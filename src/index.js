import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import styled, { injectGlobal } from 'styled-components';
import * as serviceWorker from './serviceWorker';

const synth = window.speechSynthesis;

const EMOJIS = {
  de: {
    65: [['🍎', 'Äpfel'], '👽', '⚓️', '👁️', '🦅', ['📫', 'Breifkasten']],
    66: ['🍌', '👶', '🐝', '🍐'],
    67: [],
    68: [],
    69: ['🥚', '🦎', '🦄'],
    70: ['🐸', '🍟', '👣'],
    71: ['👻', '🦍', '🎻'],
    72: [['🥅', 'Hockey-Netz'], ['🏒', 'Hockeyschläger'], '🐹', '🌺', '🐇'],
    73: ['🐙'],
    74: [['🤹🏼‍♀️', 'Jongleur'], '👖', ['🕹️', 'joystick']],
    75: [],
    76: ['🦁', '🐆'],
    77: [['🌝', 'Mond'], '🍈', '👄', ['🎶', 'Musiknoten']],
    78: ['👃'],
    79: ['🐙', '👌'],
    80: ['🥞'],
    81: ['🇶🇦'],
    82: ['🤖', '♻️', '☂️'],
    83: ['🐍', '🤳', '🥗', ['⭐️', 'Stern']],
    84: ['🦃', '🐯', '🌮', '🐅'],
    85: [],
    86: ['🏐', ['🌋', 'Vulkan']],
    87: ['🌊', '🍉', ['🚶', 'Gehen']],
    88: [],
    89: [['💴', 'yen'], '☯️'],
    90: [['⚡️', 'zappen']]
  },
  'en-CA': {
    65: [['🍎', 'Apple'], '👽', '⚓️'],
    66: ['🍌', '👶', '🦇', '🐝'],
    67: ['🐄', '🐱', '🐈', ['🤠', 'cowboy'], '🛶'],
    68: ['🐶', ['💃', 'dancing'], '🦌'],
    69: ['🥚', '👁️', '🦅'],
    70: ['🐸', '🍟', '👣'],
    71: ['🍇', '👻', '🦍'],
    72: [['🥅', 'hockey net'], ['🏒', 'hockey stick'], '🐹', '🌺'],
    73: [['🍦', 'ice cream']],
    74: [['🤹🏼‍♀️', 'juggler'], '👖', ['🕹️', 'joystick']],
    75: [['🔪', 'knife'], '🔑'],
    76: ['🦁', '🦎', '🐆'],
    77: [['🌝', 'moon'], ['📫', 'mailbox'], '🍈', '👄'],
    78: ['👃', ['🎶', 'notes']],
    79: ['🐙', '👌'],
    80: ['🥞', '🍐', ['🥘', 'pot']],
    81: [['👸🏻', 'queen'], '🇶🇦', ['❓', 'question mark']],
    82: ['🐇', '🤖', '♻️'],
    83: ['🐍', '🤳', '🥗', ['⭐️', 'star']],
    84: ['🦃', '🐯', '🌮', '🐅'],
    85: ['☂️', '🆙', '🦄'],
    86: ['🎻', '🏐', ['🌋', 'volcano']],
    87: ['🌊', '🍉', ['🚶', 'walking']],
    88: [],
    89: [['💴', 'yen'], '☯️'],
    90: [['⚡️', 'zap']]
  },
  'fr-CA': {
    65: ['⚓️', '🦅'],
    66: ['🍌', '👶', '🐝', '👄', ['📫', 'boites aux lettres']],
    67: [
      '🐶',
      '🐱',
      '🐈',
      '🦇',
      '🛶',
      ['🤠', 'cow-boy'],
      '🦌',
      ['🏒', 'bâton de hockey'],
      ['🍦', 'crème glacée'],
      ['🔪', 'couteau'],
      '🔑',
      '🥞'
    ],
    68: [['💃', 'dansant'], '🦃'],
    69: ['👣'],
    70: [['🥅', 'filet de hockey'], '🍟', '👻'],
    71: ['🦍'],
    72: ['🐹', '🌺'],
    73: [],
    74: [['🤹🏼‍♀️', 'Jongleur'], '👖'],
    75: [],
    76: ['🦁', '🦎', '🐆', '🐇', '🦄'],
    77: ['🍈', ['🚶', 'marche']],
    78: ['👃', ['🎶', 'note de musique']],
    79: ['🐙', '👌'],
    80: ['🥞', '🍐', ['🥘', 'pot'], '☂️'],
    81: ['🇶🇦'],
    82: ['🤖', '♻️'],
    83: ['🐍', '🤳', '🥗', '🆙'],
    84: ['🐯', '🌮', '🐅'],
    85: [],
    86: ['🎻', '🏐', ['🌋', 'volcan'], '🌊'],
    87: ['🍉'],
    88: [],
    89: [['💴', 'yen'], '☯️'],
    90: [['⚡️', 'zap']]
  },
  'fr-FR': {
    65: ['⚓️', '🦅'],
    66: ['🍌', '👶', '🐝', '👄', ['📫', 'boites aux lettres']],
    67: [
      '🐶',
      '🐱',
      '🐈',
      '🦇',
      '🛶',
      ['🤠', 'cow-boy'],
      '🦌',
      ['🏒', 'bâton de hockey'],
      ['🍦', 'crème glacée'],
      ['🔪', 'couteau'],
      '🔑',
      '🥐'
    ],
    68: [['💃', 'dansant'], '🇹🇷'],
    69: ['👣'],
    70: ['🇫🇷', '🍟', '👻'],
    71: ['🦍'],
    72: ['🐹', '🌺'],
    73: [],
    74: [['🤹🏼‍♀️', 'Jongleur'], '👖'],
    75: [],
    76: ['🦁', '🦎', '🐆', '🐇', '🦄'],
    77: ['🍈', ['🚶', 'marche']],
    78: ['👃', ['🎶', 'note de musique']],
    79: [['👌', 'ok']],
    80: [['🥞', 'pancake'], '🍐', ['🥘', 'pot'], '☂️', ['🐙', 'poulpe'], ['🍉', 'pastèque']],
    81: ['🇶🇦'],
    82: ['🤖', '♻️'],
    83: ['🐍', '🤳', '🥗', '🍣'],
    84: ['🐯', '🌮', '🐅', ['🌪', 'tornade']],
    85: [],
    86: ['🎻', '🏐', ['🌋', 'volcan'], '🌊'],
    87: [],
    88: [''],
    89: [['💴', 'yen'], '☯️'],
    90: [['⚡️', 'zap']]
  }
};

const keys = {
  48: { letter: '0' },
  49: { letter: '1' },
  50: { letter: '2' },
  51: { letter: '3' },
  52: { letter: '4' },
  53: { letter: '5' },
  54: { letter: '6' },
  55: { letter: '7' },
  56: { letter: '8' },
  57: { letter: '9' },
  65: { letter: 'a' },
  66: { letter: 'b' },
  67: { letter: 'c' },
  68: { letter: 'd' },
  69: { letter: 'e' },
  70: { letter: 'f' },
  71: { letter: 'g' },
  72: { letter: 'h' },
  73: { letter: 'i' },
  74: { letter: 'j' },
  75: { letter: 'k' },
  76: { letter: 'l' },
  77: { letter: 'm' },
  78: { letter: 'n' },
  79: { letter: 'o' },
  80: { letter: 'p' },
  81: { letter: 'q' },
  82: { letter: 'r' },
  83: { letter: 's' },
  84: { letter: 't' },
  85: { letter: 'u' },
  86: { letter: 'v' },
  87: { letter: 'w' },
  88: { letter: 'x' },
  89: { letter: 'y' },
  90: { letter: 'z' }
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

// Languages
// fr-CA
// en-CA
// de

const Language = styled.h3`
  text-align: left;
  width: 100%;
  font-size: 3rem;
  color: ${props => (props.selected ? '#2d2d34' : 'rgba(0,0,0,0.2)')};

  &:hover {
    color: #7c7c8e;
    cursor: pointer;
  }
`;

const Languages = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;

  &:hover {
    ${Language} {
      opacity: 1;
    }
  }

  ${Language} {
    opacity: 0.75;
  }
`;

class App extends Component {
  state = { emoji: '', letters: '', lang: 'fr-CA' };

  componentDidMount() {
    this.key = fromEvent(document, 'keydown')
      .pipe(filter(({ keyCode }) => keyCode in keys && !synth.speaking))
      .subscribe(({ keyCode }) => {
        const { letter } = keys[keyCode];
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

  changeLangTo = lang => () => this.setState({ lang });

  componentWillUnmount() {
    this.key && this.key.unsubscribe();
  }

  render() {
    return (
      <Container>
        {this.state.emoji === '' &&
          this.state.letters === '' && <Emoji>Press a key!</Emoji>}
        <Emoji role="img" aria-label="emoji">
          {this.state.emoji}
        </Emoji>
        <Letters>{this.state.letters}</Letters>
        <Languages>
          {[
            { label: 'English', key: 'en-CA' },
            { label: 'Français', key: 'fr-CA' },
            { label: 'Deutsch', key: 'de' }
          ].map(({ label, key }) => (
            <Language
              key={key}
              selected={key === this.state.lang}
              onClick={this.changeLangTo(key)}
            >
              {label}
            </Language>
          ))}
        </Languages>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
