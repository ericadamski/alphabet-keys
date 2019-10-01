import { injectGlobal } from "styled-components";

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