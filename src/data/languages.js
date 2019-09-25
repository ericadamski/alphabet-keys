import de from './de';
import en_CA from './en-CA';
import es from './es';
import fr_CA from './fr-CA';
import fr_FR from './fr-FR';
import hi from './in-hi';
import nb_NO from './nb-NO';
import pl from './pl-PL';
import pt_BR from './pt-BR';
import sv from './sv';
import it from './it';
import el_GR from './el-GR';

const allLangs = [en_CA, es, fr_CA, fr_FR, de, sv, pt_BR, nb_NO, pl, hi, el_GR, it];

export const SUPPORTED_LANGS = allLangs.map(langData => ({
  label: langData.meta.label,
  key: Object.keys(langData.data)[0]
}));
