import styled from "styled-components";
import { media } from "../utils/styles";

export const Emoji = styled.span`
	font-size: 10rem;
	margin: 2rem;

	${media(`
		font-size: 3rem;
		line-height: 2rem;
		margin: 0;
	`)};
`;

export const Letters = styled.span`
	font-size: 10rem;
`;
