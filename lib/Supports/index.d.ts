import { Tokenizer } from 'htmlparser2';
import QrReader from './QrReader';
declare const _default: {
    Encryption: {
        hexToString: (hex: string) => string;
        encrypt: (plain_text: string, key?: any) => string;
        decrypt: (encrypted_text: string, key?: any) => string;
    };
    Mahasiswa: {
        toPhoto: (nim: string) => string;
        getNims: (body: string) => RegExpMatchArray;
    };
    QrReader: typeof QrReader;
    Tokenizer: typeof Tokenizer;
    Validations: {
        isNim: (str: string) => boolean;
        isClassCode: (str: string) => boolean;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map