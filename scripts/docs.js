import { readFile, writeFile } from 'fs';
import { join } from 'path';
import sassdoc from 'sassdoc';

const eol = '\n';
const hr = /\-{3}/;

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
        `\`${param.type}\``,
        param.description,
        param.default || '&ndash;',
      ]
        .map(text => text.replace(/\s*\|\s*/, ' | '))
        .join('|')
    ),
  ].join(eol);
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
    // console.log(docs.filter(({ context }) => context.type === 'mixin'));
    return [
      readme,
      '---',
      '## Table of Contents',
      [
        '- [Variables](#variables)',
        ...docs
          .filter(({ context }) => context.type === 'variable')
          .map(({ context }) => `  - [${context.name}](#${context.name})`),
        '- [Functions](#functions)',
        ...docs
          .filter(({ context }) => context.type === 'function')
          .map(({ context }) => `  - [${context.name}](#${context.name})`),
        '- [Mixins](#mixins)',
        ...docs
          .filter(({ context }) => context.type === 'mixin')
          .map(({ context }) => `  - [${context.name}](#${context.name})`),
      ].join(eol),
      '## Variables',
      ...docs
        .filter(({ context }) => context.type === 'variable')
        .map(({ context, description, type }) =>
          [
            `### ${context.name}`,
            `Type: \`${type}\``,
            description,
            code(
              `$${context.name}: ${context.value}${
                context.scope === 'default' ? ' !default' : ''
              };`
            ),
            '[Back to top](#table-of-contents)',
          ]
            .filter(Boolean)
            .map(text => text.trim())
            .join(eol.repeat(2))
        ),
      '## Functions',
      ...docs
        .filter(({ context }) => context.type === 'function')
        .map(({ context, description, example, parameter }) =>
          [
            `### ${context.name}`,
            description,
            def(context.name, parameter),
            parameter ? params(parameter) : false,
            ...(example
              ? example.map(data => code(data.code, { lang: data.type }))
              : []),
            '[Back to top](#table-of-contents)',
          ]
            .filter(Boolean)
            .map(text => text.trim())
            .join(eol.repeat(2))
        ),
      '## Mixins',
      ...docs
        .filter(({ context }) => context.type === 'mixin')
        .map(({ context, description, example, parameter }) =>
          [
            `### ${context.name}`,
            description,
            def(context.name, parameter),
            parameter ? params(parameter) : false,
            ...(example
              ? example.map(data => code(data.code, { lang: data.type }))
              : []),
            '[Back to top](#table-of-contents)',
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
