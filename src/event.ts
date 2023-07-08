import { Vector2 } from "./utils/Vector2";
import { Vector3 } from "./utils/Vector3";
import { Vector4 } from "./utils/Vector4";
import { CFXEventData } from "./interfaces/CFXEventData";

const cfx = {
	// @ts-ignore
	addEventListener: global.addEventListener,
	// @ts-ignore
	triggerEvent: global.TriggerEvent,
	// @ts-ignore
	addNetEventListener: global.addNetEventListener,
	// @ts-ignore
	removeEventListener: global.removeEventListener,
};

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

export function on(eventName: string, callback: (...args: any[]) => void): CFXEventData {
	cfx.addEventListener(eventName, callback);
	return {
		eventName,
		callback,
	} as CFXEventData;
}

export function onNet(eventName: string, callback: (...args: any[]) => void): CFXEventData {
	cfx.addEventListener(eventName, callback, true);
	return {
		eventName,
		callback,
	} as CFXEventData;
}

export function once(eventName: string, callback: (...args: any[]) => void): CFXEventData {
	const eventData = on(eventName, (...args: any[]) => {
		callback(...args);
		off(eventData);
	});
	return eventData;
}

export function onceNet(eventName: string, callback: (...args: any[]) => void): CFXEventData {
	const eventData = onNet(eventName, (...args: any[]) => {
		callback(...args);
		off(eventData);
	});
	return eventData;
}

export function off(eventData: CFXEventData): void {
	return cfx.removeEventListener(eventData.eventName, eventData.callback);
}

export function emit(eventName: string, ...args: any[]): void {
	return cfx.triggerEvent(eventName, ...args);
}

export function log(...args: any[]) {
	console.log(...args);
}

export function everyTick(callback: () => void): number {
	return setTick(callback);
}

export function clearEveryTick(id: number) {
	return clearTick(id);
}
