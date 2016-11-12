export class FormEntry {
    public isDirty: boolean = false;
    public isValid: boolean = true;
}

export class FormContext {
    private entries: FormEntry[] = [];

    public Join(): FormEntry {
        let entry = new FormEntry();
        this.entries.push(entry);
        return entry;
    }

    public isValid() {
        return !this.entries.find(x => !x.isValid);
    }

    public submitted() {
        this.entries.forEach(x => x.isDirty = false);
    };
}