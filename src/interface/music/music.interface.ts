export interface Music {
	name: string,
	author: string,
	link: string,
	platform?: string,
	image?: string,
	other?: {
		requestlink?: string,
		platform?: string,
		originalId?: string,
	}
}
