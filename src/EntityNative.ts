import { Vector3 } from "@cfx/shared";

export class EntityNative {
	protected handle = 0;
	public readonly hash: number;
	constructor(modelHash: string | number) {
		this.hash = typeof modelHash === "string" ? GetHashKey(modelHash) : modelHash;
	}

	public get entity(): number {
		return this.handle;
	}

	public get valid(): boolean {
		return DoesEntityExist(this.handle);
	}

	public get pos(): Vector3 {
		return Vector3.fromArray(GetEntityCoords(this.handle, true));
	}

	public set pos(pos: Vector3) {
		SetEntityCoords(this.handle, pos.x, pos.y, pos.z, false, false, false, false);
	}

	public get rot(): Vector3 {
		return Vector3.fromArray(GetEntityRotation(this.handle, 2));
	}

	public set rot(rot: Vector3) {
		SetEntityRotation(this.handle, rot.x, rot.y, rot.z, 2, false);
	}

	public get heading(): number {
		return GetEntityHeading(this.handle);
	}

	public set heading(heading: number) {
		SetEntityHeading(this.handle, heading);
	}

	public get velocity(): Vector3 {
		return Vector3.fromArray(GetEntityVelocity(this.handle));
	}

	public set velocity(velocity: Vector3) {
		SetEntityVelocity(this.handle, velocity.x, velocity.y, velocity.z);
	}

	public get populationType(): number {
		return GetEntityPopulationType(this.handle);
	}

	public get speed(): number {
		return GetEntitySpeed(this.handle);
	}

	public set freeze(state: boolean) {
		FreezeEntityPosition(this.handle, state);
	}
}
