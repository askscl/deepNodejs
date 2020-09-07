/* function Fish(name, color){
    this.name = name;
    this.color = color;
}
Fish.prototype.livesIn = "water";
Fish.prototype.price = 20;

var fish1 = new Fish('mackarel', 'gray');
var fish2 = new Fish('goldfish', 'orange');
var fish3 = new Fish('salmon', 'white');
var fish = [fish1, fish2, fish3]
for ( var i = 0; i <3; i++){
    console.log(fish[i].name + "," + fish[i].color + "," + fish[i].livesIn + "," + fish[i].price);
} */

/* function Employee(name, salary){
    this.name = name;
    this.salary = salary;
}
Employee.prototype.getSalary = function getSalaryFunction(){
    return this.salary;
}
Employee.prototype.addSalary = function addSalaryFunction(addition){
    this.salary = this.salary + addition;
}
var boss1 = new Employee("Joan", 200);
var boss2 = new Employee("Kim", 100);
var boss3 = new Employee("Sam", 150);

console.log(boss1.getSalary());
console.log(boss2.getSalary());
console.log(boss3.getSalary());
boss3.addSalary(100)
console.log(boss3.getSalary()); */

//子类如何重写父类的属性或方法
/* function AClass(){
    this.Property = 1;
    this.Method = function(){
        console.log(1);
    }
}

function AClass2(){
    this.Property2 = 2;
    this.Method2 = function(){
        console.log(2);
    }
}

AClass2.prototype = new AClass();
AClass2.prototype.Property = 3;
AClass2.prototype.Method = function(){
    console.log(4);
}
var  obj = new AClass2();
console.log(obj.Property);
obj.Method(); */

/* function Aclass(){
    this.Property = 1;
    this.Method = function(){
        console.log(1);
    }
}
var obj = new Aclass();
obj.Property2 = 2;
obj.Method2 = function(){
    console.log(2);
}
console.log(obj.Property2);
obj.Method2(); */

/* function Aclass(){
    this.Property = 1;
    this.Method = function(){
        console.log(1);
    }
}
Aclass.prototype.Property = 2;
Aclass.prototype.Method = function(){
    console.log(2);
}
var obj = new Aclass();
console.log(obj.Property);
obj.Method(); */

/* function baseClass(){
    this.showMsg = function(){
        console.log("baseClass::showMsg");
    }
}

function extendClass(){
    this.showMsg = function(){
        console.log("extendClass::showMsg");
    }
}
extendClass.prototype = new baseClass();
var instance = new extendClass();
instance.showMsg();

var baseinstance = new baseClass();
baseinstance.showMsg.call(instance); */

/* function Person(name){
    this.name = name;
    this.showMe = function(){
        console.log(this.name);
    };
}

var one = new Person('js');
console.log(one.prototype);
console.log(typeof Person.prototype);
console.log(Person.prototype.constructor); */

function Cat(){
    this.A = function(){
        console.log("Cat::A");
    };
    this.B = function(){
        console.log("Cat::B");
    };
}
Cat.A = function(){
    console.log("Cat::A static");
}

function Dog(){
    this.A = function(){
        console.log("Dog::A");
    }
}
Dog.A = function(){
    console.log("Dog::A static");
}

console.log(Dog);
Dog.prototype = new Cat();
console.log(Dog);

// var baseinstance = new Cat();
// var instance = new Dog();

// Cat.A.call(instance);
// baseinstance.A.call(instance);


/* 
    function Hello() { }

    function subHello() { }

    Hello.prototype = subHello.prototype;

    subHello.prototype.name = "jack";

    subHello.prototype.subMethod = function () {

        console.log(this.name)

    }

    var obj = new subHello();

    obj.subMethod();
    var obj2 = new Hello();

    obj2.subMethod(); 
*/









