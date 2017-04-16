export class FormEntry {
    public isDirty = false;
    public isValid = true;
}

export class FormContext {
    private entries: FormEntry[] = [];

    public disabled = false;

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
