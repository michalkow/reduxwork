import Reduxwork from '../source/index';
import schemas from './test-schemas';

const reduxwork = new Reduxwork({
  transport: 'socket',
  schemas,
  addKeyOnCreate: true
});

export default reduxwork;