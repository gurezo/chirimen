import { GPIOAccess } from './GPIOAccess';
import { GPIOPort } from './GPIOPort';
import { I2CAccess } from './I2CAccess';
import { I2CPort } from './I2CPort';

(() => {
    const _GPIOAccess = new GPIOAccess(); 
    const _GPIOPort = new GPIOPort(); 
    const _I2CAccess = new I2CAccess(); 
    const _I2CPort = new I2CPort(); 

})();
