import { Vector3 } from "../utils/Vector3";
import { WordObject } from "./WordObject";
import { appendInternalNamespace } from "../enum";

const Event = {
	onVirtualEntityStreamIn: appendInternalNamespace("onVirtualEntityStreamIn"),
	onVirtualEntityStreamOut: appendInternalNamespace("onVirtualEntityStreamOut"),
	onVirtualEntitySyncedMetaChange: appendInternalNamespace("onVirtualEntitySyncedMetaChange"),
};

export class VirtualEntity extends WordObject {
	public static readonly type = "VIRTUAL_ENTITY";
	public readonly type = "VIRTUAL_ENTITY";
	public static readonly Event = Event;

	constructor(pos: Vector3, dimension?: number) {
		super(pos, dimension);
	}
}
