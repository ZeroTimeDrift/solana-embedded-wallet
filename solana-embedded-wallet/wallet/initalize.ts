import { registerWallet } from './register.ts';
import { GhostWallet } from './wallet.ts';
import type { Ghost } from './window.ts';

export function initialize(ghost: Ghost): void {
    registerWallet(new GhostWallet(ghost));
}