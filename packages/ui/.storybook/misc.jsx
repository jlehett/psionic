import { Code as ReactCode, CodeBlock as ReactCodeBlock, monokaiSublime, github } from 'react-code-blocks';

export const Code = ({ children }) => {
    return (
        <code
            style={{
                lineHeight: 1,
                margin: '0 2px',
                padding: '3px 5px',
                whiteSpace: 'nowrap',
                borderRadius: '3px',
                border: '1px solid #eee',
                color: 'rgba(51, 51, 51, 0.9)',
                backgroundColor: '#f8f8f8',
                fontFamily: 'ui-monospace,Menlo,Monaco,"Roboto Mono","Oxygen Mono","Ubuntu Monospace","Source Code Pro","Droid Sans Mono","Courier New",monospace',
                fontWeight: 100,
            }}
        >
            {children}
        </code>
    );
};

export const CodeBlock = ({ children }) => {
    return (
        <ReactCodeBlock
            language="jsx"
            theme={monokaiSublime}
            text={children}
        />
    );
};

