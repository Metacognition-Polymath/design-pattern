/**
 * 변수를 선언할 때 추상클래스나 인터페이스 같은 상위 형식으로 선언해야 한다
 */
abstract class Animal {
  abstract makeSound(): void;
}

class Dog extends Animal {
  makeSound() {
    this.bark();
  }
  bark() {
    console.log("멍멍");
  }
}

class Cat extends Animal {
  makeSound() {
    this.meow();
  }
  meow() {
    console.log("야옹");
  }
}

// Dog 형식으로 선언하면 구체적인 구현에 맞춰서 코딩
const dog: Dog = new Dog();
dog.bark();
dog.makeSound(); // TS는 이것도 가능

// 상위 형식에 맞춰서 프로그래밍
const cat: Animal = new Cat();
cat.makeSound();
