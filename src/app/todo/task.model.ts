export class Task{
    public completed: boolean;
    public description: string;
    public modified: number;
    public dueDate: number;
    public completionDate: number;
    public isTimed: boolean;
    public elapsedTime: number;
    private _duration: number;

    public get duration(): number {
        return this._duration;
    }
    public set duration(value: number) {
        this.dueDate = (value* 60000) + Date.now();
        this._duration = value;
    }

    constructor(obj: any = {}){
        let {completed, description, modified, dueDate, isTimed, elapsedTime, duration} = obj;
        this.completed =  completed || false;
        this.description = description || "";
        this.modified = modified || Date.now();
        this.dueDate = dueDate ||  this.modified;
        this.isTimed = isTimed || false;
        this.elapsedTime = elapsedTime || 0;
        this._duration = duration || 0;
    }

    public recalculateRelativetime(){
        this.duration = this.duration;
    }
}