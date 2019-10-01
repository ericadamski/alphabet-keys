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

export default {
  // english
  ...en_CA.data,
  // spanish
  ...es.data,
  // french
  ...fr_CA.data,
  ...fr_FR.data,
  // german
  ...de.data,
  // italian
  ...it.data,
  // swedish
  ...sv.data,
  // portuguese (Brazil)
  ...pt_BR.data,
  // norwegian
  ...nb_NO.data,
  // Polish
  ...pl.data,
  // Indian hindi
  ...hi.data,
  // Greek
  ...el_GR.data
};
