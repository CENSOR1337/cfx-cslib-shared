export class Tickpool {
	handlers = new Map<number, () => void>();
	currentId: number;
	tickId: number;

	constructor() {
		this.currentId = 0;
		this.tickId = 0;
	}

	add(handler: () => void): number {
		this.currentId++;
		this.handlers.set(this.currentId, handler);
		if (this.tickId === 0) {
			this.tickId = setTick(() => {
				this.handlers.forEach((handler) => {
					handler();
				});
			});
		}
		return this.currentId;
	}

	remove(id: number) {
		const handler = this.handlers.get(id);
		if (!handler) return;
		this.handlers.delete(id);
		if (this.handlers.size > 0) return;
		clearTick(this.tickId);
		this.tickId = 0;
	}

	destroy() {
		clearTick(this.tickId);
	}
}
