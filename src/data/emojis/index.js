import en_CA from './en-CA';
import es_ES from './es-ES';
import fr_CA from './fr-CA';
import fr_FR from './fr-FR';
import de from './de';
import sv from './sv';
import pt_BR from './pt-BR';
import no_NB from './no-NB';
import hi from './in-hi';

const allLangs = [
  en_CA,
  es_ES,
  fr_CA,
  fr_FR,
  de,
  sv,
  pt_BR,
  no_NB,
  hi
];

export const SUPPORTED_LANGS = allLangs.map(
  langData => ({
    label: langData.meta.label,
    key: Object.keys(langData.data)[0]
  })
);

export default {
  // english
  ...en_CA.data,
  // spanish
  ...es_ES.data,
  // french
  ...fr_CA.data,
  ...fr_FR.data,
  // german
  ...de.data,
  // swedish
  ...sv.data,
  // portuguese (Brazil)
  ...pt_BR.data,
  // norwegian
  ...no_NB.data,
  // Indian hindi
  ...hi.data
};
