export default class Libsodium {
    private sodium!: typeof import('libsodium-wrappers');

    constructor() {
        import('libsodium-wrappers').then((so) => {
            this.sodium = so;
        });
    }

    async generateKeyPair() {
        await this.sodium.ready;
        const { privateKey, publicKey } = this.sodium.crypto_box_keypair();
        return { private_key: this.sodium.to_hex(privateKey), public_key: this.sodium.to_hex(publicKey) };
    }

    async encript_key_pair(privateKey: string, publicKey: string, data: string) {
        await this.sodium.ready;
        const nonce = this.sodium.randombytes_buf(this.sodium.crypto_box_NONCEBYTES)
        const private_key = this.sodium.from_hex(privateKey);
        const public_key = this.sodium.from_hex(publicKey);
        const encrypted_data = this.sodium.crypto_box_easy(data, nonce, public_key, private_key);
        return this.sodium.to_hex(new Uint8Array([ ...nonce, ...encrypted_data ]));
    }

    private async decript_key_pair(privateKey: string, publicKey: string, data: string) {
        await this.sodium.ready;
        const nonce = this.sodium.from_hex(data).slice(0, this.sodium.crypto_box_NONCEBYTES);
        const private_key = this.sodium.from_hex(privateKey);
        const public_key = this.sodium.from_hex(publicKey);
        const encrypted_data = this.sodium.from_hex(data).slice(this.sodium.crypto_box_NONCEBYTES);
        const decrypted_data = this.sodium.crypto_box_open_easy(encrypted_data, nonce, public_key, private_key);
        return this.sodium.to_string(decrypted_data);
    }

    async validate_password(private_key: string, public_key: string, password: string, encrypted_password: string) {
        const storage_password = await this.decript_key_pair(private_key, public_key, encrypted_password);
        return storage_password === password;
    }

    
}