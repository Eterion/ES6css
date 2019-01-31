import { readFile, writeFile } from 'fs';
import { join } from 'path';
import sassdoc from 'sassdoc';

const eol = '\n';
const hr = /\-{3}/;
const top = '[_Back to top_](#contents)';

/**
 * Returns markdown string for code block.
 * @param {string|string[]} data Code string.
 * @param {object} options Options.
 * @param {string} [options.lang='scss'] Code language.
 */

function code(data, { lang = 'scss' } = {}) {
  return [
    '```' + lang,
    ...(typeof data === 'string' ? [data] : data),
    '```',
  ].join(eol);
}

/**
 * Returns short function or mixin definition.
 * @param {string} name Definition name.
 * @param {array} parameter Array of parameters.
 */

function def(name, parameter) {
  return code(
    `${name}(${
      parameter
        ? parameter
            .map(
              param =>
                `$${param.name}${param.default ? ': ' + param.default : ''}`
            )
            .join(', ')
        : ''
    })`
  );
}

/**
 * Returns computed table string from available parameters.
 * @param {array} data Parameters.
 */

function params(data) {
  return [
    'Name|Type|Description|Default',
    '-|-|-|-',
    ...data.map(param =>
      [
        param.name,
        param.type
          .split('|')
          .map(text => `\`${text.trim()}\``)
          .join(' or '),
        param.description,
        param.default || '&ndash;',
      ].join('|')
    ),
  ].join(eol);
}

/**
 * Sort function for documentation items.
 * @param {object} a Current.
 * @param {object} b Next.
 */

function sort(a, b) {
  if (a.context.name < b.context.name) return -1;
  if (a.context.name > b.context.name) return 1;
  return 0;
}

// Read contents of README.md and extract only static text.
new Promise((resolve, reject) => {
  readFile(join(process.cwd(), 'README.md'), 'utf8', (err, data) => {
    if (err) reject(err);
    const index = data.search(hr);
    resolve(index !== -1 ? data.substring(0, index) : data);
  });
})

  // Parse sass documentation.
  .then(readme => {
    return new Promise((resolve, reject) => {
      sassdoc
        .parse(join(process.cwd(), 'dist'))
        .then(docs => {
          resolve({ readme, docs });
        })
        .catch(err => {
          reject(err);
        });
    });
  })

  // Resolve data for readme file.
  .then(({ readme, docs }) => {
    docs = docs.filter(({ access }) => access === 'public').sort(sort);
    const constants = docs.filter(({ context }) => context.type === 'variable');
    const functions = docs.filter(({ context }) => context.type === 'function');
    const mixins = docs.filter(({ context }) => context.type === 'mixin');
    return [
      readme,
      '---',
      '## Contents',
      [
        '- [Constants](#constants)',
        ...constants.map(
          ({ context }) => `  - [${context.name}](#${context.name})`
        ),
        '- [Functions](#functions)',
        ...functions.map(
          ({ context }) => `  - [${context.name}](#${context.name})`
        ),
        '- [Mixins](#mixins)',
        ...mixins.map(
          ({ context }) => `  - [${context.name}](#${context.name})`
        ),
      ].join(eol),
      '## Constants',
      ...constants.map(({ context, description, type }) =>
        [
          `### ${context.name}`,
          [
            `- Type: ${type
              .split('|')
              .map(text => `\`${text.trim()}\``)
              .join(' or ')}`,
          ]
            .filter(Boolean)
            .join(eol),
          code(
            `$${context.name}: ${context.value}${
              context.scope === 'default' ? ' !default' : ''
            };`
          ),
          description,
          top,
        ]
          .filter(Boolean)
          .map(text => text.trim())
          .join(eol.repeat(2))
      ),
      '## Functions',
      ...functions.map(({ context, description, parameter }) =>
        [
          `### ${context.name}`,
          ['- Type: `Function`'].filter(Boolean).join(eol),
          def(context.name, parameter),
          description,
          parameter ? params(parameter) : false,
          top,
        ]
          .filter(Boolean)
          .map(text => text.trim())
          .join(eol.repeat(2))
      ),
      '## Mixins',
      ...mixins.map(({ content, context, description, parameter }) =>
        [
          `### ${context.name}`,
          [
            '- Type: `Mixin`',
            typeof content !== 'undefined'
              ? '- Content: `true` (through `@content` directive)'
              : false,
          ]
            .filter(Boolean)
            .join(eol),
          def(context.name, parameter),
          description,
          parameter ? params(parameter) : false,
          top,
        ]
          .filter(Boolean)
          .map(text => text.trim())
          .join(eol.repeat(2))
      ),
      '---',
      `**Last Updated:** ${new Date()}`,
    ]
      .filter(Boolean)
      .map(text => text.trim())
      .join(eol.repeat(2));
  })

  // Write documentation.
  .then(data => {
    return new Promise((resolve, reject) => {
      writeFile(join(process.cwd(), 'README.md'), data, err => {
        if (err) reject(err);
        resolve();
      });
    });
  })

  // Error
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
