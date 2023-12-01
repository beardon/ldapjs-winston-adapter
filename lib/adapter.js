const WINSTON_LOGGING_LEVELS = {
    ERROR: 'error', // 0
    WARNING: 'warn', // 1
    INFO: 'info', // 2
    HTTP: 'http', // 3
    VERBOSE: 'verbose', // 4
    DEBUG: 'debug', // 5
    SILLY: 'silly', // 6
};

class LdapjsToWinstonAdapter {
    #winston;

    constructor(winstonLogger, mapping = null, prefix = null) {
        this.#winston = winstonLogger;
        this.prefix = prefix;
        if (typeof mapping === 'object') {
            for (const key in mapping) {
                this[ key ] = this.#log(mapping[ key ]);
            }
        }
    }

    child() { return this; } // child at the moment does nothing, just return main adapter

    trace() { return this.#log(WINSTON_LOGGING_LEVELS.SILLY)(...arguments) };
    debug() { return this.#log(WINSTON_LOGGING_LEVELS.DEBUG)(...arguments) };
    info() { return this.#log(WINSTON_LOGGING_LEVELS.INFO)(...arguments) };
    warn() { return this.#log(WINSTON_LOGGING_LEVELS.WARNING)(...arguments) };
    error() { return this.#log(WINSTON_LOGGING_LEVELS.ERROR)(...arguments) };
    fatal() { return this.#log(WINSTON_LOGGING_LEVELS.ERROR)(...arguments) };

    #log(level) {
        function sprintf(format, value) {
            let formatted = format.replace('%s', value);
            formatted = formatted.replace('%d', value);
            formatted = formatted.replace('%j', JSON.stringify(value));
            return formatted;
        }
        const winston = this.#winston;
        const prefix = this.prefix;
        return function() {
            let a0 = arguments[ '0' ];
            let a1 = arguments[ '1' ];
            let args = [ ];
            if (typeof a0 === 'object') {
                const a0f = `${ a1 }: %j`;
                a1 = a0;
                a0 = a0f;
            }
            if (prefix) a0 = `[${ prefix }] ${ a0 }`;
            args.push(sprintf(a0, a1));
            args.unshift(level);
            winston.log.apply(winston, args);
        }
    }

}

module.exports = LdapjsToWinstonAdapter;
