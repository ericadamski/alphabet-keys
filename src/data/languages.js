import de from './emojis/de';
import nl from './emojis/nl';
import en_CA from './emojis/en-CA';
import es from './emojis/es';
import fr_CA from './emojis/fr-CA';
import fr_FR from './emojis/fr-FR';
import hi from './emojis/in-hi';
import nb_NO from './emojis/nb-NO';
import pl from './emojis/pl-PL';
import pt_BR from './emojis/pt-BR';
import zh from './emojis/zh';
import sv from './emojis/sv';
import it from './emojis/it';
import el_GR from './emojis/el-GR';
import tl from './emojis/tl';

const allLangs = [
  en_CA,
  es,
  fr_CA,
  fr_FR,
  de,
  nl,
  sv,
  pt_BR,
  zh,
  nb_NO,
  pl,
  hi,
  el_GR,
  it,
  tl
];

export const SUPPORTED_LANGS = allLangs.map(langData => ({
  label: langData.meta.label,
  key: Object.keys(langData.data)[0]
}));
