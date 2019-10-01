import React from 'react';

import { Letters, Emoji } from '../styles';

export class Alphabet extends React.PureComponent {
	render() {
		if (!this.props.emoji || !this.props.character) {
			return (<Letters>Press a key!</Letters>);
		}
	
		return (
			<>
				<Emoji role="img" aria-label="emoji">{this.props.emoji}</Emoji>
				<Letters>{this.props.character}</Letters>
			</>
		)
	}
};