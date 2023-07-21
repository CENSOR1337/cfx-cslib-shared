interface colorRGBA {
	r: number;
	g: number;
	b: number;
	a?: number;
}

function hexToRGB(hex: string): colorRGBA | undefined {
	hex = hex.replace("#", "");

	const hexColorRegex = /^[0-9A-Fa-f]{6}$/;
	if (!hexColorRegex.test(hex)) return undefined;

	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 2), 16);
	const b = parseInt(hex.substring(4, 2), 16);

	return { r, g, b } as colorRGBA;
}

export class RGB {
	constructor(public r: number, public g: number, public b: number) {}

	public static fromHex(hex: string): RGB {
		const color = hexToRGB(hex);
		if (!color) throw new Error(`${hex} is not a valid hex color`);
		return new RGB(color.r, color.g, color.b);
	}
}

export class RGBA extends RGB {
	constructor(public r: number, public g: number, public b: number, public a: number) {
		super(r, g, b);
	}
}
