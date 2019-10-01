import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as serviceWorker from './serviceWorker';
import styled from 'styled-components';

import KEYS from './data/keys';
import EMOJIS from './data/emojis';
import { SUPPORTED_LANGS } from './data/languages';
import { Games } from './data/games';
import './styles';

import Selector from './selector';
import { Alphabet } from './games/Alphabet';
import { Counting } from './games/Counting';

const synth = window.speechSynthesis;

const Container = styled.section`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: #e3dcf7;
`;

const SelectorContainer = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Reader = styled.textarea`
  position: absolute;
  top: -100vh;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emoji: undefined,
      character: undefined,
      lang: SUPPORTED_LANGS[0].key,
      selectedGame: Games.List[0].key,
    };

    this.read$ = new Subject();
    this.reader = React.createRef();
  }
  
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
            character: isNaN(+letter)
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
  
  onGameSelect = game => {
    this.setState({
      selectedGame: game,
    })
  }
  
  focusReader = () => {
    if (this.reader.current) {
      this.reader.current.focus();
    }
  };
  
  componentWillUnmount() {
    this.key && this.key.unsubscribe();
  }
  
  render() {
    return (
      <Container onClick={this.focusReader}>
        <SelectorContainer>
          <Selector
            data={SUPPORTED_LANGS}
            selected={this.state.lang}
            onSelect={this.changeLangTo}
          />
          <Selector
            data={Games.List}
            selected={this.state.selectedGame}
            onSelect={this.onGameSelect}
          />
        </SelectorContainer>
        <Reader
          aria-label="A hidden input to allow use on mobile devices"
          innerRef={this.reader}
          onChange={({ target }) =>
            this.read$.next(target.value.toLowerCase().charCodeAt(target.value.length - 1)
          )}
        />
        {
          this.state.selectedGame === Games.Values.ALPHABET && (
            <Alphabet emoji={this.state.emoji} character={this.state.character} />
          )
        }
        {
          this.state.selectedGame === Games.Values.COUNTING && (
            <Counting emoji={this.state.emoji} character={this.state.character} />
          )
        }
      </Container>
    );
  }
}
          
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
