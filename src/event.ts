import { Vector2 } from "./utils/Vector2";
import { Vector3 } from "./utils/Vector3";
import { Vector4 } from "./utils/Vector4";
import { CFXEventData } from "./interfaces/CFXEventData";

export class Cfx {
	public static addEventListener = global.addEventListener;
	public static triggerEvent = global.TriggerEvent;
	public static addNetEventListener = global.addNetEventListener;
	public static removeEventListener = global.removeEventListener;
	public static triggerClientEvent = global.TriggerClientEvent;
	public static triggerServerEvent = global.TriggerServerEvent;
}

const getClassFromArguments = (...args: any[]): any[] => {
	const newArgs: any[] = [];

	for (const arg of args) {
		const argType = arg.type;
		if (!argType) continue;
		switch (argType) {
			case Vector2.type: {
				newArgs.push(Vector2.create(arg));
				continue;
			}
			case Vector3.type: {
				newArgs.push(Vector3.create(arg));
				continue;
			}
			case Vector4.type: {
				newArgs.push(Vector4.create(arg));
				continue;
			}

			default: {
				newArgs.push(arg);
			}
		}
	}
	return newArgs;
};

export class Event {
	public static on(eventName: string, listener: (...args: any[]) => void): CFXEventData {
		Cfx.addEventListener(eventName, listener);
		return { eventName, listener } as CFXEventData;
	}

	public static once(eventName: string, listener: (...args: any[]) => void): CFXEventData {
		const eventData = Event.on(eventName, (...args: any[]) => {
			listener(...args);
			Event.off(eventData);
		});
		return eventData;
	}

	public static off(eventData: CFXEventData): void {
		return Cfx.removeEventListener(eventData.eventName, eventData.listener);
	}

	public static emit(eventName: string, ...args: any[]): void {
		return Cfx.triggerEvent(eventName, ...getClassFromArguments(...args));
	}
}

export const on = Event.on;
export const once = Event.once;
export const off = Event.off;
export const emit = Event.emit;

export function log(...args: any[]) {
	console.log(...args);
}

export function everyTick(callback: () => void): number {
	return setTick(callback);
}

export function clearEveryTick(id: number) {
	return clearTick(id);
}
