import crypto from 'crypto';
import validate from '../util/validate';


export default class ValidateSignature {
    constructor(appSecret) {
        validate.notNull(appSecret, 'app secret', 'ValidateSignature.constructor');
        this.appSecret = appSecret;
        return this;
    }

    validate(request, response, buffer) {
        const expected = request.get('X-Hub-Signature');
        const hmac = crypto.createHmac('sha1', this.appSecret);
        hmac.update(buffer, 'utf-8');

        const computed = `sha1=${hmac.digest('hex')}`;

        if (!expected || expected !== computed) {
            throw new Error('Invalid signature');
        }
        else {
            log.debug('Valid signature!');
        }
    }
}
