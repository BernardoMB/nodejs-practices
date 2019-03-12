class Person {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }
    getPersonDescription () {
        return `${this.name} is ${this.age} years old.`;
    }
}

var me = new Person ('Bernardo', '23');
var myDescription = me.getPersonDescription();
console.log(myDescription);