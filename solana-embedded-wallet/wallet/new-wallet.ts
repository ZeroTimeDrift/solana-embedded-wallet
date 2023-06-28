import { clusterApiUrl, PublicKey, Keypair, SendOptions, Transaction, TransactionSignature, VersionedTransaction } from '@solana/web3.js';
import { EventEmitter } from 'eventemitter3';
import { Ghost, GhostEvent } from './window';
// This is the wallet implementation that plugs into the wallet standard API.
export class GhostImplementation implements Ghost {
    constructor() {
        this.publicKey = Keypair.generate().publicKey;
        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.signAndSendTransaction = this.signAndSendTransaction.bind(this);
        this.signTransaction = this.signTransaction.bind(this);
        this.signAllTransactions = this.signAllTransactions.bind(this);
        this.on = this.on.bind(this);
        this.off = this.off.bind(this);
    }
    publicKey: PublicKey | null = null;
    on<E extends keyof GhostEvent>(event: E, listener: GhostEvent[E], context?: any): void {
        // Implementation of the on method for events emitted by the wallet
    }
    off<E extends keyof GhostEvent>(event: E, listener: GhostEvent[E], context?: any): void {
    }
    emit<E extends keyof GhostEvent>(event: E, data?: any): void {
    }
    async connect(options?: { onlyIfTrusted?: boolean }): Promise<{ publicKey: PublicKey }> {
        // Implementation of the connect method
        // This should return a Promise that resolves to an object with a publicKey of the PublicKey type
        return { publicKey: this.publicKey };
    }

    async disconnect(): Promise<void> {
        // Implementation of the disconnect method
        // This should return a Promise that resolves to void
    }

    async signAndSendTransaction<T extends Transaction | VersionedTransaction>(
        transaction: T,
        options?: SendOptions
    ): Promise<{ signature: TransactionSignature }> {
        // Implementation of the signAndSendTransaction method
        // This should return a Promise that resolves to an object with a signature of the TransactionSignature type
        return { signature: "test" };
    }

    async signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T> {
        // Implementation of the signTransaction method
        // This should return a Promise that resolves to a transaction of the Transaction or VersionedTransaction type
    }

    async signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]> {
        // Implementation of the signAllTransactions method
        // This should return a Promise that resolves to an array of transactions of the Transaction or VersionedTransaction type
    }

    async signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }> {
        // Implementation of the signMessage method
        // This should return a Promise that resolves to an object with a signature of the Uint8Array type
        return { signature: new Uint8Array() };
    }
}