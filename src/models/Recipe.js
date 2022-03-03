export class Recipe {

    /**
     *
     * @param id: string
     * @param name: string
     */
    constructor(name, ingridients, process) {
        this.id = null;
        this.name=name;
        this.ingridients= ingridients; //array
        this.process = process
    }

    setId(id) {
        this.id = id;
    }

}