import React from 'react';

import { Letters, Emoji } from '../styles';
import { EmojiContainer } from './styles';

export class Counting extends React.PureComponent {
	render() {
		if (!this.props.emoji || !this.props.character) {
			return (<Letters>Press a number!</Letters>);
		}

		return (
			<>
				<EmojiContainer>
					{
						Array(parseInt(this.props.character)).fill(0).map((_, index) => (
							<Emoji key={index} role="img" aria-label="emoji">{this.props.emoji}</Emoji>
						))
					}
				</EmojiContainer>
				<Letters>{this.props.character}</Letters>
			</>
		)
	}
};