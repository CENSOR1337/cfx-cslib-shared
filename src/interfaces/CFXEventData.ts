export interface CFXEventData {
	eventName: string;
	callback: (...args: any[]) => void;
}
