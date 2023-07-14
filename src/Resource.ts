import { Events } from "./Events";
const resourceName = GetCurrentResourceName();

export const isServer = IsDuplicityVersion();
export const isClient = !isServer;

export class Resource {
	public static readonly resourceName: string = resourceName;

	public static on(eventName: string, callback: (...args: any[]) => void): any {
		return Events.on(this.getEventName(eventName), callback);
	}

	public static emit(eventName: string, ...args: any[]): void {
		return Events.emit(this.getEventName(eventName), ...args);
	}

	public static getEventName(eventName: string): string {
		return `${resourceName}:${eventName}`;
	}

	public static onResourceStop(callback: () => void) {
		return Events.on("onResourceStop", (resource: string) => {
			if (resource !== resourceName) return;
			callback();
		});
	}

	public static onResourceStart(callback: () => void) {
		return Events.on("onResourceStart", (resource: string) => {
			if (resource !== resourceName) return;
			callback();
		});
	}
}
