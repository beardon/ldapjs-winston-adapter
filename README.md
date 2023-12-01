ldapjs-winston-adapter
======================

Allows to use Winston logger with [ldapjs](http://ldapjs.org/) without Bunyan. Must be used with already installed Winston.

This has been adapted from [@gluwer](https://github.com/gluwer)'s [bunyan-winston-adapter](https://github.com/gluwer/bunyan-winston-adapter)

At the moment it is very simple and its main purpose is to log some Winston internal logs (that expect Bunyan) using
the Winston logger. It only supports default Winston log levels derived from NPM.

Level `trace` is mapped to `debug` and level `fatal` is mapped to `error`.

## How to use with ldapjs

```
const LdapjsToWinstonAdapter = require('ldapjs-winston-adapter');

// pass to adapter a winston logger instance (may be whole module if default logger is used)
ldap.createClient({
  log: new LdapjsToWinstonAdapter(winston),
});
```

It is also possible to provide your own mapping from Bunyan to Winston. This will override default mapping. You can provide only the types you want to override:

```
const mapping = {
  trace: 'silly'
};

ldap.createClient({
  log: new LdapjsToWinstonAdapter(winston, mapping),
});
```

## License

MIT
