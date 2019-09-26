import de from './emojis/de';
import en_CA from './emojis/en-CA';
import es from './emojis/es';
import fr_CA from './emojis/fr-CA';
import fr_FR from './emojis/fr-FR';
import hi from './emojis/in-hi';
import nb_NO from './emojis/nb-NO';
import pl from './emojis/pl-PL';
import pt_BR from './emojis/pt-BR';
import sv from './emojis/sv';
import it from './emojis/it';
import el_GR from './emojis/el-GR';

const allLangs = [en_CA, es, fr_CA, fr_FR, de, sv, pt_BR, nb_NO, pl, hi, el_GR, it];

export const SUPPORTED_LANGS = allLangs.map(langData => ({
  label: langData.meta.label,
  key: Object.keys(langData.data)[0]
}));
