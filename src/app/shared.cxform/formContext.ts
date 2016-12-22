export class FormEntry {
    public isDirty: boolean = false;
    public isValid: boolean = true;
}

export class FormContext {
    private entries: FormEntry[] = [];

    public disabled: boolean = false;

    public Join(): FormEntry {
        let entry = new FormEntry();
        this.entries.push(entry);
        return entry;
    }

    public isValid() {
        return !this.entries.find(x => !x.isValid);
    }

    public isDirty() {
        return !!this.entries.find(x => x.isDirty);
    }

    public submitted() {
        this.entries.forEach(x => x.isDirty = false);
    };
}