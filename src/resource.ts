import { on, onNet } from "./event";
const resourceName = GetCurrentResourceName();

export const isServer = IsDuplicityVersion();
export const isClient = !isServer;

export class Resource {
	public static readonly resourceName: string = resourceName;

	public static on(eventName: string, callback: (...args: any[]) => void): any {
		return on(this.getEventName(eventName), callback);
	}

	public static onNet(eventName: string, callback: (...args: any[]) => void): any {
		return onNet(this.getEventName(eventName), callback);
	}

	public static emit(eventName: string, ...args: any[]): void {
		return emit(this.getEventName(eventName), ...args);
	}

	public static getEventName(eventName: string): string {
		return `${resourceName}:${eventName}`;
	}

	public static onResourceStop(callback: () => void) {
		return Resource.on("onResourceStop", (resource: string) => {
			if (resource !== resourceName) return;
			callback();
		});
	}

	public static onResourceStart(callback: () => void) {
		return Resource.on("onResourceStart", (resource: string) => {
			if (resource !== resourceName) return;
			callback();
		});
	}
}
