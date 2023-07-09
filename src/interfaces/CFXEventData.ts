export interface CFXEventData {
	eventName: string;
	listener: (...args: any[]) => void;
}
