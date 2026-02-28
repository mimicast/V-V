export default class vnvActor extends Actor {
    prepareData() {
        // In case some steps need to be overwritten later.
        super.prepareData();
        // const actorData = this.data;
        // const data = actorData.data;
        // const flags = actorData.flags;
        // // Make separate functions for each Actor type (character, npc, etc.) to keep
        // // things organized.
        // if (actorData.type === 'character') this._prepareCharacterData(actorData);
    }

    prepareDerivedData() {
        const actorData = this.system;
        // Add possability for Switch statement on the different actor types
         this._preparePlayerCharacterData(actorData);
    }

    _preparePlayerCharacterData(actorData) {
        // Calculation of Base Character Values
        this._setCharacterValues(actorData);
    }

    async _setCharacterValues(actorData) {
        // Calculation of values here!
    }

    setNote(note) {
        //method to update character notes
        this.update({ "system.note": note });
    }

    addLogEntry(entry) {
        // Add a Log Entry to the Character Event Log
        let log = this.system.log;
        log.push(entry);
        this.update({ "system.log": log });
    }
}