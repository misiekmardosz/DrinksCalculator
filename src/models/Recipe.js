export class Recipe {

    /**
     *
     * @param id: string
     * @param name: string
     */
    constructor(name, ingredients, process) {
        this.id = null;
        this.name=name;
        this.ingredients= ingredients; //array
        this.process = process
    }

    setId(id) {
        this.id = id;
    }

}