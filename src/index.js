import React, { Component } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import styled, { css, injectGlobal } from 'styled-components';
import * as serviceWorker from './serviceWorker';

const synth = window.speechSynthesis;

const EMOJIS = {
  de: {
    97: [['🍎', 'Äpfel'], '👽', '⚓️', '👁️', '🦅', ['📫', 'Breifkasten']],
    98: ['🍌', '👶', '🐝', '🍐'],
    99: [],
    100: [],
    101: ['🥚', '🦎', '🦄'],
    102: ['🐸', '🍟', '👣'],
    103: ['👻', '🦍', '🎻'],
    104: [['🥅', 'Hockey-Netz'], ['🏒', 'Hockeyschläger'], '🐹', '🌺', '🐇'],
    105: ['🐙'],
    106: [['🤹🏼‍♀️', 'Jongleur'], '👖', ['🕹️', 'joystick']],
    107: [],
    108: ['🦁', '🐆'],
    109: [['🌝', 'Mond'], '🍈', '👄', ['🎶', 'Musiknoten']],
    110: ['👃'],
    111: ['🐙', '👌'],
    112: ['🥞'],
    113: ['🇶🇦'],
    114: ['🤖', '♻️', '☂️'],
    115: ['🐍', '🤳', '🥗', ['⭐️', 'Stern']],
    116: ['🦃', '🐯', '🌮', '🐅'],
    117: [],
    118: ['🏐', ['🌋', 'Vulkan']],
    119: ['🌊', '🍉', ['🚶', 'Gehen']],
    120: [],
    121: [['💴', 'yen'], '☯️'],
    122: [['⚡️', 'zappen']]
  },
  'en-CA': {
    97: [['🍎', 'Apple'], '👽', '⚓️'],
    98: ['🍌', '👶', '🦇', '🐝'],
    99: ['🐄', '🐱', '🐈', ['🤠', 'cowboy'], '🛶'],
    100: ['🐶', ['💃', 'dancing'], '🦌'],
    101: ['🥚', '👁️', '🦅'],
    102: ['🐸', '🍟', '👣'],
    103: ['🍇', '👻', '🦍'],
    104: [['🥅', 'hockey net'], ['🏒', 'hockey stick'], '🐹', '🌺'],
    105: [['🍦', 'ice cream']],
    106: [['🤹🏼‍♀️', 'juggler'], '👖', ['🕹️', 'joystick']],
    107: [['🔪', 'knife'], '🔑'],
    108: ['🦁', '🦎', '🐆'],
    109: [['🌝', 'moon'], ['📫', 'mailbox'], '🍈', '👄'],
    110: ['👃', ['🎶', 'notes']],
    111: ['🐙', '👌'],
    112: ['🥞', '🍐', ['🥘', 'pot']],
    113: [['👸🏻', 'queen'], '🇶🇦', ['❓', 'question mark']],
    114: ['🐇', '🤖', '♻️'],
    115: ['🐍', '🤳', '🥗', ['⭐️', 'star']],
    116: ['🦃', '🐯', '🌮', '🐅'],
    117: ['☂️', '🆙', '🦄'],
    118: ['🎻', '🏐', ['🌋', 'volcano']],
    119: ['🌊', '🍉', ['🚶', 'walking']],
    120: [],
    121: [['💴', 'yen'], '☯️'],
    122: [['⚡️', 'zap']]
  },
  'fr-CA': {
    97: ['⚓️', '🦅'],
    98: ['🍌', '👶', '🐝', '👄', ['📫', 'boites aux lettres']],
    99: [
      '🐶',
      '🐱',
      '🐈',
      '🦇',
      '🛶',
      ['🤠', 'cow-boy'],
      '🦌',
      ['🏒', 'bâton  hockey'],
      ['🍦', 'crème glacée'],
      ['🔪', 'couteau'],
      '🔑',
      '🥞'
    ],
    100: [['💃', 'dansant'], '🦃'],
    101: ['👣'],
    102: [['🥅', 'filet de hockey'], '🍟', '👻'],
    103: ['🦍'],
    104: ['🐹', '🌺'],
    105: [],
    106: [['🤹🏼‍♀️', 'Jongleur'], '👖'],
    107: [],
    108: ['🦁', '🦎', '🐆', '🐇', '🦄'],
    109: ['🍈', ['🚶', 'marche']],
    110: ['👃', ['🎶', 'note de musique']],
    111: ['🐙', '👌'],
    112: ['🥞', '🍐', ['🥘', 'pot'], '☂️'],
    113: ['🇶🇦'],
    114: ['🤖', '♻️'],
    115: ['🐍', '🤳', '🥗', '🆙'],
    116: ['🐯', '🌮', '🐅'],
    117: [],
    118: ['🎻', '🏐', ['🌋', 'volcan'], '🌊'],
    119: ['🍉'],
    120: [],
    121: [['💴', 'yen'], '☯️'],
    122: [['⚡️', 'zap']]
  },
  'fr-FR': {
    97: ['⚓️', '🦅', '🐝'],
    98: ['🍌', '👶', ['🎈', 'ballon'], '👄', ['📫', 'boites aux lettres']],
    99: [
      '🐶',
      '🐱',
      '🐈',
      '🦇',
      '🛶',
      ['🤠', 'cow-boy'],
      '🦌',
      ['🏒', 'crosse'],
      ['🍦', 'crème glacée'],
      ['🔪', 'couteau'],
      '🔑',
      '🥐'
    ],
    100: [['💃', 'dansant'], '🦃', '🐬'],
    101: ['👣'],
    102: ['🇫🇷', '🍟', '👻'],
    103: ['🦍', '🐸'],
    104: ['🐹', '🌺', '🚁'],
    105: [['🏝️', 'île']],
    106: [['🤹🏼‍♀️', 'Jongleur'], '👖'],
    107: [['🐨', 'koala']],
    108: [['🦁', 'lion'], '🦎', '🐆', '🐇', '🦄'],
    109: ['🍈', ['🚶', 'marche'], '⌚'],
    110: ['👃', ['🎶', 'note de musique']],
    111: [['👌', 'ok'], ['🖥️', 'ordinateur']],
    112: [
      ['🥞', 'pancake'],
      '🍐',
      ['🥘', 'pot'],
      '☂️',
      ['🐙', 'poulpe'],
      ['🍉', 'pastèque'],
      ['🐼', 'panda']
    ],
    113: ['🇶🇦'],
    114: [['🤖', 'robot'], '♻️'],
    115: ['🐍', '🤳', '🥗', '🍣', ['🌲', 'sapin']],
    116: ['🐯', '🌮', '🐅', ['🌪', 'tornade']],
    117: ['🏭'],
    118: ['🎻', '🏐', ['🌋', 'volcan'], '🌊'],
    119: [],
    120: [],
    121: [['💴', 'yen'], '☯️', '👀'],
    122: [['⚡️', 'zap'], ['🇿🇼', 'Zimbabwe']]
  },
  'sv': {
    97: [['⚓️', 'ankare']], 
    98: [['🍌', 'banan'], ['👶', 'bebis'], ['🐙', 'bläckfisk'], ['🐝', 'bi'], ['📫', 'brevlåda'], '⚡️'], 
    99: [], //C
    100: [['💃', 'dansa'], ['🍇', 'druvor'], ['👸🏻', 'drottning']],
    101: [['🦄', 'enhörning']], 
    102: [['👣', 'fötter'], ['🦇', 'fladdermus'], ['❓', 'frågetecken']], 
    103: [['🍦', 'glass'], ['🐸', 'groda'], ['🦍', 'gorilla'], ['🏐', 'garn'], '🥘'], 
    104: [['🐶', 'hund'], ['🥅', 'hockeymål'], ['🏒', 'hockeyklubba'], ['🐹', 'hamster']], 
    105: [], 
    106: [['🤹🏼‍♀️', 'jonglerare'], ['👖', 'jeans' ], ['🕹️', 'joystick']],
    107: [['🐈', 'katt'], ['🐄', 'ko'], ['🔪', 'kniv'], ['🐇', 'kanin'], ['🦃', 'kalkon']],
    108: [],
    109: [['🌝', 'moon'], , ['👄', 'mun']],
    110: [['👃', 'näsa'], ['🎶', 'noter'], ['🔑', 'nyckel']],
    111: [ ['👌', 'okej'], ['🐍', 'orm']],
    112: [['🥞', 'pannkakor'], ['🍐', 'päron'], ['☂️', 'paraply']],
    113: [],
    114: [],
    115: [['👻', 'spöke'], ['🥗', 'sallad'], ['⭐️', 'stjärna']],
    116: [['🐆', 'tiger']],
    117: [['👽', 'utomjording']],
    118: [['🍉', 'vattenmelon'], ['🌊', 'våg'], ['🌋', 'vulkan']],
    119: [],
    120: [],
    121: [],
    122: []
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
  97: { letter: 'a' },
  98: { letter: 'b' },
  99: { letter: 'c' },
  100: { letter: 'd' },
  101: { letter: 'e' },
  102: { letter: 'f' },
  103: { letter: 'g' },
  104: { letter: 'h' },
  105: { letter: 'i' },
  106: { letter: 'j' },
  107: { letter: 'k' },
  108: { letter: 'l' },
  109: { letter: 'm' },
  110: { letter: 'n' },
  111: { letter: 'o' },
  112: { letter: 'p' },
  113: { letter: 'q' },
  114: { letter: 'r' },
  115: { letter: 's' },
  116: { letter: 't' },
  117: { letter: 'u' },
  118: { letter: 'v' },
  119: { letter: 'w' },
  120: { letter: 'x' },
  121: { letter: 'y' },
  122: { letter: 'z' }
};

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

  ${media(`
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate-X(-50%);
    height: 15px;
    width: 300px;

    h3 {
      font-size: 1rem;
      text-align: center;
    }
  `)};

  &:hover {
    ${Language} {
      opacity: 1;
    }
  }

  ${Language} {
    opacity: 0.75;
  }
`;

const Reader = styled.textarea`
  position: absolute;
  top: -100vh;
`;

class App extends Component {
  state = { emoji: '', letters: '', lang: 'fr-CA' };
  read$ = new Subject();

  componentDidMount() {
    this.key = this.read$
      .pipe(filter(keyCode => keyCode in keys && !synth.speaking))
      .subscribe(keyCode => {
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
        <Languages>
          {[
            { label: 'English', key: 'en-CA' },
            { label: 'Français', key: 'fr-CA' },
            { label: 'Deutsch', key: 'de' }, 
            { label: 'Swedish', key: 'sv' }
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
