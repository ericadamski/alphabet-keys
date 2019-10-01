import { css } from "styled-components";

export const media = (query) => {
  return css`
		@media screen and (max-width: 800px) {
			${query};
		}
  `;
}
