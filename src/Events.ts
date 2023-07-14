import { Vector2 } from "./utils/Vector2";
import { Vector3 } from "./utils/Vector3";
import { Vector4 } from "./utils/Vector4";
import { CFXEventData } from "./interfaces/CFXEventData";
import { Citizen } from "./citizen";

export type listenerType = (...args: any[]) => void;

export class Events {
	public static getClassFromArguments(...args: any[]): any[] {
		const newArgs: any[] = [];

		for (const arg of args) {
			const obj = this.getObjectClass(arg);
			newArgs.push(obj);
		}
		return newArgs;
	}

	protected static getObjectClass(obj: any): any {
		const objType = obj.type;
		if (!objType) return obj;
		switch (objType) {
			case Vector2.type: {
				return Vector2.create(obj);
			}
			case Vector3.type: {
				return Vector3.create(obj);
			}
			case Vector4.type: {
				return Vector4.create(obj);
			}

			default: {
				return obj;
			}
		}
	}

	public static on(eventName: string, listener: listenerType): CFXEventData {
		Citizen.addEventListener(eventName, listener);
		return { eventName, listener } as CFXEventData;
	}

	public static once(eventName: string, listener: listenerType): CFXEventData {
		const eventData = Events.on(eventName, (...args: any[]) => {
			listener(...args);
			Events.off(eventData);
		});
		return eventData;
	}

	public static off(eventData: CFXEventData): void {
		return Citizen.removeEventListener(eventData.eventName, eventData.listener);
	}

	public static emit(eventName: string, ...args: any[]): void {
		return Citizen.triggerEvent(eventName, ...args);
	}
}

export const off = Events.off;
export const emit = Events.emit;

export function everyTick(callback: () => void): number {
	return setTick(callback);
}

export function clearEveryTick(id: number) {
	return clearTick(id);
}
