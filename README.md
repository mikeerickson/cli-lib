# CLI lab

## Description

CLILab is a base CLI helper, allowing you to create full featured CLI using simple, clear API

## Features

- Parses arguments
- Converts flags to [camelCase](https://github.com/sindresorhus/camelcase)
- Negates flags when using the `--no-` prefix
- Outputs version when `--version`
- Outputs description and supplied help text when `--help`
- Makes unhandled rejected promises [fail hard](https://github.com/sindresorhus/hard-rejection) instead of the default silent fail
- Sets the process title to the binary name defined in package.json

## Install

```
$ npm install -g cli-lab
```

## Usage

```
$ ./foo-app.js unicorns --rainbow
```

```js
#!/usr/bin/env node
"use strict";
const cliLab = require("cli-lab");
const foo = require(".");

const cli = meow(
	`
	Usage
	  $ foo <input>

	Options
	  --rainbow, -r  Include a rainbow

	Examples
	  $ foo unicorns --rainbow
	  🌈 unicorns 🌈
`,
	{
		flags: {
			rainbow: {
				type: "boolean",
				alias: "r"
			}
		}
	}
);
/*
{
	input: ['unicorns'],
	flags: {rainbow: true},
	...
}
*/

foo(cli.input[0], cli.flags);
```

## API

### cliLab(helpText, [options])

### cliLab(options)

Returns an `Object` with:

- `input` _(Array)_ - Non-flag arguments
- `flags` _(Object)_ - Flags converted to camelCase
- `pkg` _(Object)_ - The `package.json` object
- `help` _(string)_ - The help text used with `--help`
- `showHelp([code=2])` _(Function)_ - Show the help text and exit with `code`
- `showVersion()` _(Function)_ - Show the version text and exit

#### helpText

Type: `string`

Shortcut for the `help` option.

#### options

Type: `Object`

##### flags

Type: `Object`

Define argument flags.

The key is the flag name and the value is an object with any of:

- `type`: Type of value. (Possible values: `string` `boolean`)
- `alias`: Usually used to define a short flag alias.
- `default`: Default value when the flag is not specified.

Example:

```js
flags: {
	unicorn: {
		type: 'string',
		alias: 'u',
		default: 'rainbow'
	}
}
```

##### description

Type: `string` `boolean`<br>
Default: The package.json `"description"` property

Description to show above the help text.

Set it to `false` to disable it altogether.

##### help

Type: `string` `boolean`

The help text you want shown.

The input is reindented and starting/ending newlines are trimmed which means you can use a [template literal](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/template_strings) without having to care about using the correct amount of indent.

The description will be shown above your help text automatically.

##### version

Type: `string` `boolean`<br>
Default: The package.json `"version"` property

Set a custom version output.

##### autoHelp

Type: `boolean`<br>
Default: `true`

Automatically show the help text when the `--help` flag is present. Useful to set this value to `false` when a CLI manages child CLIs with their own help text.

##### autoVersion

Type: `boolean`<br>
Default: `true`

Automatically show the version text when the `--version` flag is present. Useful to set this value to `false` when a CLI manages child CLIs with their own version text.

##### pkg

Type: `Object`<br>
Default: Closest package.json upwards

package.json as an `Object`.

_You most likely don't need this option._

##### argv

Type: `Array`<br>
Default: `process.argv.slice(2)`

Custom arguments object.

##### inferType

Type: `boolean`<br>
Default: `false`

Infer the argument type.

By default, the argument `5` in `$ foo 5` becomes a string. Enabling this would infer it as a number.

##### booleanDefault

Type: `boolean` `null` `undefined`<br>
Default: `false`

Value of `boolean` flags not defined in `argv`.
If set to `undefined` the flags not defined in `argv` will be excluded from the result.
The `default` value set in `boolean` flags take precedence over `booleanDefault`.

Example:

```js
const cli = cliLab(
	`
	Usage
	  $ foo

	Options
	  --rainbow, -r  Include a rainbow
	  --unicorn, -u  Include a unicorn
	  --no-sparkles  Exclude sparkles

	Examples
	  $ foo
	  🌈 unicorns✨🌈
`,
	{
		booleanDefault: undefined,
		flags: {
			rainbow: {
				type: "boolean",
				default: true,
				alias: "r"
			},
			unicorn: {
				type: "boolean",
				default: false,
				alias: "u"
			},
			cake: {
				type: "boolean",
				alias: "c"
			},
			sparkles: {
				type: "boolean",
				default: true
			}
		}
	}
);
/*
{
	flags: {
		rainbow: true,
		r: true,
		unicorn: false,
		u: false,
		sparkles: true
	},
	…
}
*/
```

##### hardRejection

Type: `boolean`<br>
Default: `true`

Whether to use [`hard-rejection`](https://github.com/sindresorhus/hard-rejection) or not. Disabling this can be useful if you need to handle `process.on('unhandledRejection')` yourself.

## Promises

CLI Lab will make unhandled rejected promises [fail hard](https://github.com/sindresorhus/hard-rejection) instead of the default silent fail. Meaning you don't have to manually `.catch()` promises used in your CLI.

## Tips

See [`chalk`](https://github.com/chalk/chalk) if you want to colorize the terminal output.

See [`get-stdin`](https://github.com/sindresorhus/get-stdin) if you want to accept input from stdin.

See [`conf`](https://github.com/sindresorhus/conf) if you need to persist some data.

See [`update-notifier`](https://github.com/yeoman/update-notifier) if you want update notifications.

[More useful CLI utilities…](https://github.com/sindresorhus/awesome-nodejs#command-line-utilities)

## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
