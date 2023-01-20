module.exports = {
    env: {
        browser: true,
        es2021:  true,
    },
    extends: [
        'airbnb',
    ],
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@assets', './src/assets'],
                    ['@components', './src/components'],
                    ['@contexts', './src/contexts'],
                    ['@hooks', './src/hooks'],
                    ['@styles', './src/styles'],
                    ['@utils', './src/utils'],
                ],
            },
        },
    },
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType:  'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        indent:                              ['warn', 4, { SwitchCase: 1 }],
        'import/no-unresolved':              'off',
        'max-len':                           'off',
        'key-spacing':                       [2, { align: 'value' }],
        'react/react-in-jsx-scope':          'off',
        'react/jsx-indent':                  ['warn', 4],
        'react/jsx-indent-props':            ['warn', 4],
        'react/button-has-type':             'off',
        'react/jsx-props-no-spreading':      'off',
        'react/forbid-prop-types':           'off',
        'react/require-default-props':       'off',
        'react/no-unescaped-entities':       'off',
        'import/no-extraneous-dependencies': 'off',
        'no-console':                        'off',
        'no-restricted-syntax':              'off',
        'no-nested-ternary':                 'off',
        'no-use-before-define':              'off',
        'brace-style':                       'off',
        'import/no-named-as-default':        'off',
        'func-names':                        'off',
        'no-param-reassign':                 'off',
        'import/prefer-default-export':      'off',
        'no-unused-vars':                    'off',
        'no-continue':                       'off',
        'no-underscore-dangle':              'off',
        'no-mixed-operators':                'off',
        'react/destructuring-assignment':    'off',
    },
};