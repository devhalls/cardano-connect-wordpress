const WALLET_DOWNLOAD_URLS: Record<string, string> = {
	eternl: 'https://eternl.io/app',
	lace: 'https://www.lace.io/',
	nami: 'https://namiwallet.io/',
	flint: 'https://flint-wallet.com/',
	typhon: 'https://typhonwallet.io/',
	gero: 'https://gerowallet.io/',
	vespr: 'https://vespr.xyz/',
	yoroi: 'https://yoroi-wallet.com/',
};

export const CARDANO_WALLETS_URL = 'https://www.cardano.org/wallets/';

export const hasBrowserWallet = (wallets: { name: string }[] = []): boolean => {
	if ( wallets.length > 0 ) {
		return true;
	}

	if ( typeof window === 'undefined' || ! window.cardano ) {
		return false;
	}

	return Object.keys( window.cardano ).length > 0;
};

export const getWalletDownloadUrl = ( walletName?: string | null ): string => {
	if ( walletName ) {
		const url = WALLET_DOWNLOAD_URLS[ walletName.toLowerCase() ];
		if ( url ) {
			return url;
		}
	}

	return CARDANO_WALLETS_URL;
};

export const isWalletExtensionError = ( message: string ): boolean => {
	const normalized = message.toLowerCase();

	return normalized.includes( '[browserwallet]' )
		|| normalized.includes( 'an error occurred during enable' )
		|| normalized.includes( 'wallet extension' )
		|| normalized.includes( 'no wallets detected' );
};
