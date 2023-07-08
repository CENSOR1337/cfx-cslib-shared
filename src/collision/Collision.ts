import { WordObject } from "../system/WordObject";
import { Vector3 } from "../utils/Vector3";
import { Dispatcher } from "../utils/Dispatcher";

interface listenerType {
	id: number;
	type: "enter" | "exit";
}

export class Collision extends WordObject {
	public playersOnly: boolean = false;
	private interval: NodeJS.Timer;
	private insideEntities: Set<number> = new Set();
	private destroyed: boolean = false;
	private listeners = {
		enter: new Dispatcher(),
		exit: new Dispatcher(),
	};

	constructor(pos: Vector3) {
		super(pos);
		this.interval = setInterval(this.onTick.bind(this), 1000);
	}

	public onBeginOverlap(callback: (entity: number) => void): listenerType {
		const id = this.listeners.enter.add(callback);
		return { id: id, type: "enter" };
	}

	public onEndOverlap(callback: (entity: number) => void) {
		const id = this.listeners.exit.add(callback);
		return { id: id, type: "exit" };
	}

	public off(listener: listenerType) {
		if (listener.type === "enter") {
			this.listeners.enter.remove(listener.id);
		} else {
			this.listeners.exit.remove(listener.id);
		}
	}

	public destroy() {
		this.destroyed = true;
	}

	private onTick() {
		if (this.destroyed) {
			clearInterval(this.interval);
			for (const handle of this.insideEntities) {
				this.listeners.exit.broadcast(handle);
			}
			this.insideEntities.clear();
			return;
		}

		const entities = this.getRevelantEntities();

		for (const handle of this.insideEntities) {
			const isValid = this.isEntityValid(handle);
			if (!isValid) {
				this.insideEntities.delete(handle);
				this.listeners.exit.broadcast(handle);
			}
		}

		for (const handle of entities) {
			if (this.insideEntities.has(handle)) continue;
			const isValid = this.isEntityValid(handle);
			if (isValid) {
				if (!this.insideEntities.has(handle)) {
					this.insideEntities.add(handle);
					this.listeners.enter.broadcast(handle);
				}
			}
		}
	}

	protected isPosInside(pos: Vector3) {
		// implement in child class
		return false;
	}

	protected isEntityInside(entity: number) {
		// implement in child class
		return false;
	}

	protected isEntityValid(entity: number) {
		if (!DoesEntityExist(entity)) return false;
		if (!this.isEntityInside(entity)) return false;
		return true;
	}

	protected getRevelantEntities(): number[] {
		// implement in child class
		return [];
	}
}
