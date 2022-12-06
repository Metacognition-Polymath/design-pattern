# 9. 반복자 패턴과 컴포지트 패턴

- 컬렉션 잘 관리하기
- 컬렉션 : 데이터 묶음

  - https://tenlie10.tistory.com/10

- 학습 목표
  - 객체 저장 방식을 보여주지 않으면서 클라이언트가 객체에 일일이 접근할 수 있게 해주는 방법을 알아본다
  - 객체들로 구성된 슈퍼 컬렉션을 알아본다
  - 그밖에 객체의 역할도 몇 가지 더 배워보자

## 속보! 객체 마을 식당과 팬케이크 하우스 합병

- 팬케이크 하우스 : 아침 메뉴
- 객체마을 식당 : 점심 메뉴

- 루(Lou)는 메뉴에 들어갈 내용을 ArrayList에 저장
- 멜(Mel)은 메뉴에 들어갈 내용을 Array에 저장

## 메뉴 항목 살펴보기

```java

public class MenuItem {
  String name;
  String description;
  boolean vegetarian;
  double price;

  // MenuItem은 이름, 설명, 채식주의 여부, 가격으로 구성되어 있다
  public MenuItem(String name, String description, boolean vegetarian, double price) {
    this.name = name;
    this.description = description;
    this.vegetarian = vegetarian;
    this.price = price;
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public double getPrice() {
    return price;
  }

  public boolean isVegetarian() {
    return vegetarian;
  }
}

```

## 루와 멜의 메뉴 구현법 비교하기

- 루 : 메뉴에 새로운 항목을 추가하기 쉽게 ArrayList를 사용
- 멜 : 최대 개수를 딱 정해 놓고 진짜 배열을 사용, MenuItem을 그냥 쓸 수 있음

```java

public class PancakeHouseMenu {
  List<MenuItem> menuItems;

  public PancakeHouseMenu() {
    menuItems = new ArrayList<>();

    addItem("K&B's Pancake Breakfast", "Pancakes with scrambled eggs, and toast", true, 2.99);
    addItem("Regular Pancake Breakfast", "Pancakes with fried eggs, sausage", false, 2.99);
    addItem("Blueberry Pancakes", "Pancakes made with fresh blueberries", true, 3.49);
    addItem("Waffles", "Waffles, with your choice of blueberries or strawberries", true, 3.59);
  }

  public void addItem(String name, String description, boolean vegetarian, double price) {
    MenuItem menuItem = new MenuItem(name, description, vegetarian, price);
    menuItems.add(menuItem);
  }

  // ArrayList는 List의 child
  public ArrayList<MenuItem> getMenuItems() {
    return menuItems;
  }
}

```

```java

public class DinerMenu {
  static final int MAX_ITEMS = 6;
  int numberOfItems = 0;
  MenuItem[] menuItems;

  public DinerMenu() {
    menuItems = new MenuItem[MAX_ITEMS];

    addItem("Vegetarian BLT", "(Fakin') Bacon with lettuce & tomato on whole wheat", true, 2.99);
    addItem("BLT", "Bacon with lettuce & tomato on whole wheat", false, 2.99);
    addItem("Soup of the day", "Soup of the day, with a side of potato salad", false, 3.29);
    addItem("Hotdog", "A hot dog, with saurkraut, relish, onions, topped with cheese", false, 3.05);
  }

  public void addItem(String name, String description, boolean vegetarian, double price) {
    MenuItem menuItem = new MenuItem(name, description, vegetarian, price);
    if (numberOfItems >= MAX_ITEMS) {
      System.err.println("Sorry, menu is full! Can't add item to menu");
    } else {
      menuItems[numberOfItems] = menuItem;
      numberOfItems = numberOfItems + 1;
    }
  }

  public MenuItem[] getMenuItems() {
    return menuItems;
  }
}

```

#### 메뉴 구현 방식이 다를 때, 서로 다른 메뉴를 사용하는 클라이언트를 만들어보자

- 클라이언트 : 합병해서 만든 가게의 `자바 종업원`
- 자바 종업원
  - 주문 메뉴를 출력하는 능력
  - 주방장에게 물어보지 ㅇ낳고도 알아서 어떤 메뉴가 채식주의자용인지 알아내는 능력

```java

// 자바 종업원
public class Waitress {
  PancakeHouseMenu pancakeHouseMenu;
  DinerMenu dinerMenu;

  public Waitress(PancakeHouseMenu pancakeHouseMenu, DinerMenu dinerMenu) {
    this.pancakeHouseMenu = pancakeHouseMenu;
    this.dinerMenu = dinerMenu;
  }

  public void printMenu() {
    // 메뉴에 있는 모든 항목을 출력
  }

  public void printBreakfastMenu() {
    // 아침 식사 항목만 출력
  }

  public void printLunchMenu() {
    // 점심 식사 항목만 출력
  }

  public void printVegetarianMenu() {
    // 채식주의자용 메뉴 항목만 출력
  }

  public boolean isItemVegetarian(String name) {
    // 주어진 이름의 메뉴 항목이 채식주의자용인지 확인
  }
}

```

## 자격 요건 구현하기: 1차 시도

- 각 메뉴에 들어있는 모든 항목을 출력하려면 PancakeHouseMenu와 DinerMenu의 메뉴 항목을 모두 가져와야 함
- 각 메뉴의 getMenuItems()를 호출하지만 리턴타입이 다름

```java

public class Waitress {
  PancakeHouseMenu pancakeHouseMenu;
  DinerMenu dinerMenu;

  public Waitress(PancakeHouseMenu pancakeHouseMenu, DinerMenu dinerMenu) {
    this.pancakeHouseMenu = pancakeHouseMenu;
    this.dinerMenu = dinerMenu;
  }

  public void printMenu() {
    ArrayList<MenuItem> breakfastItems = pancakeHouseMenu.getMenuItems();
    for (int i = 0; i < breakfastItems.size(); i++) {
      MenuItem menuItem = (MenuItem)breakfastItems.get(i);
      System.out.print(menuItem.getName() + ", ");
      System.out.print(menuItem.getPrice() + " -- ");
      System.out.println(menuItem.getDescription());
    }

    MenuItem[] lunchItems = dinerMenu.getMenuItems();
    for (int i = 0; i < lunchItems.length; i++) {
      MenuItem menuItem = lunchItems[i];
      System.out.print(menuItem.getName() + ", ");
      System.out.print(menuItem.getPrice() + " -- ");
      System.out.println(menuItem.getDescription());
    }
  }
}

```

- 같은 반복문을 두 번 사용해야 함

## 쓰면서 제대로 공부하기

- printMenu()의 설명
  - 인터페이스가 아닌 PancakeHouseMenu와 DinerMenu의 구상 클래스를 사용하고 있음
  - 종업원은 각 메뉴에서 항목의 컬렉셔능ㄹ 표현하는 방법을 알아야 하므로 캡슐화의 기본 원칙이 지켜지지 않고 있음
  - 코드가 중복 됨
  - 메뉴 항목의 목록을 DinerMenu를 사용하는 방식에서 Hashtable을 사용하는 방식으로 전환하려면 종업원 코드를 많이 수정해야 함

## 어떻게 해야 할까요?

- 각 메뉴에 똑같은 인터페이스를 구현
  - 사실 getMenuItems() 메소드의 리턴 형식을 제외하면 거의 비슷

## 반복을 캡슐화 하기

- 지금 까지 배운 내용 중 가장 중요한 내용 : `바뀌는 부분은 캡슐화하라`

```java

Iterator iterator = breakfastMenu.createIterator();

while (iterator.hasNext()) {
  MenuItem menuItem = iterator.next();
}

```

## 반복자 패턴 알아보기

- 참고

  - [javascript-iterable-정리](https://github.com/Metacognition-Polymath/javascript-deep-dive/tree/main/34_%EC%9D%B4%ED%84%B0%EB%9F%AC%EB%B8%94/Tony)

- 반복 작업을 캡슐화
- 이 방법도 일종의 디자인 패턴으로 반복자(iterator) 패턴이라고 부릅니다
  - 반복자 패턴은 Iterator 인터페이스에 의존합니다

```java
public interface Iterator {
  boolean hasNext(); // 다음 항목이 있는지 확인
  Object next(); // 다음 항목을 리턴
}
```

- 이 인터페이스가 있으면 배열, 리스트, 해시테이블은 물론, 모든 종류의 객체 컬렉션에 반복자를 구현할 수 있습니다
- 컬렉션은 객체를 모아 놓은 것에 불과하다
  - 컬렉션을 집합체(aggregation)라고 부르기도 합니다

## 객체마을 식당에 반복자 추가하기

```java

public class DinerMenuIterator implements Iterator {
  MenuItem[] items;
  int position = 0;

  public DinerMenuIterator(MenuItem[] items) {
    this.items = items;
  }

  public MenuItem next() {
    MenuItem menuItem = items[position];
    position = position + 1;
    return menuItem;
  }

  public boolean hasNext() {
    if (position >= items.length || items[position] == null) {
      return false;
    } else {
      return true;
    }
  }
}

```

## 반복자 사용하기

```java

public class DinerMenu {
  static final int MAX_ITEMS = 6;
  int numberOfItems = 0;
  MenuItem[] menuItems;

  // 생성자

  // addItem 메소드 호출

  // getMenuItems 메소드 삭제 - 내부 구조를 다 드러내는 단점이 있어서 없애는게 낫다

  public Iterator createIterator() {
    return new DinerMenuIterator(menuItems);
  }

  // 기타 메뉴 관련 메소드
}

```

### 뇌 단련

- PancakeHouseIterator를 만들고, PancakeHouseMenu가 PancakeHouseIterator를 리턴하도록 만들어봅시다

```java

// PancakeHouseIterator
public class PancakeHouseIterator implements Iterator {
  ArrayList<MenuItem> items;
  int position = 0;

  public PancakeHouseIterator(ArrayList<MenuItem> items) {
    this.items = items;
  }

  public MenuItem next() {
    MenuItem menuItem = items.get(position);
    position = position + 1;
    return menuItem;
  }

  public boolean hasNext() {
    if (position >= items.size() || items.get(position) == null) {
      return false;
    } else {
      return true;
    }
  }
}

// PancakeHouseMenu
public class PancakeHouseMenu {
  ArrayList<MenuItem> menuItems;

  public PancakeHouseMenu() {
    menuItems = new ArrayList<MenuItem>();

    addItem("K&B's Pancake Breakfast", "Pancakes with scrambled eggs, and toast", true, 2.99);
    addItem("Regular Pancake Breakfast", "Pancakes with fried eggs, sausage", false, 2.99);
    addItem("Blueberry Pancakes", "Pancakes made with fresh blueberries", true, 3.49);
    addItem("Waffles", "Waffles, with your choice of blueberries or strawberries", true, 3.59);
  }

  public void addItem(String name, String description, boolean vegetarian, double price) {
    MenuItem menuItem = new MenuItem(name, description, vegetarian, price);
    menuItems.add(menuItem);
  }

  public ArrayList<MenuItem> getMenuItems() {
    return menuItems;
  }

  public Iterator createIterator() {
    return new PancakeHouseIterator(menuItems);
  }
}

```

## 종업원 코드에 반복자 적용하기

- 이제 반복자 코드를 종업원에도 적용해봅시다
- 종업원에 반복자를 적용하는 방법
  - 반복자를 인자로 받는 printMenu() 메소드를 만들고 각 메뉴의 getIterator() 메소드로 반복자를 반은 후 새로운 메소드에 넘기면 됩니다

```java

public class Waitress {
  PancakeHouseMenu pancakeHouseMenu;
  DinerMenu dinerMenu;

  // 생성자에서 두 메뉴를 인자로 받아옵니다
  public Waitress(PancakeHouseMenu pancakeHouseMenu, DinerMenu dinerMenu) {
    this.pancakeHouseMenu = pancakeHouseMenu;
    this.dinerMenu = dinerMenu;
  }

  // printMenu() 메소드에서 2개의 반복자를 생성합니다. 메뉴마다 하나씩 필요하기 때문
  public void printMenu() {
    Iterator pancakeIterator = pancakeHouseMenu.createIterator();
    Iterator dinerIterator = dinerMenu.createIterator();

    System.out.println("MENU\n----\nBREAKFAST");
    printMenu(pancakeIterator); // 반복자를 가지고 오버로드 된 printMenu() 메소드를 호출합니다
    System.out.println("\nLUNCH");
    printMenu(dinerIterator);
  }

  // 이제 순환문 하나만 있어도 됩니다
  private void printMenu(Iterator iterator) {
    while (iterator.hasNext()) {
      MenuItem menuItem = (MenuItem) iterator.next();
      System.out.print(menuItem.getName() + ", ");
      System.out.print(menuItem.getPrice() + " -- ");
      System.out.println(menuItem.getDescription());
    }
  }
}

// 종업원 코드 테스트(실행)
public class MenuTestDrive {
  public static void main(String[] args) {
    PancakeHouseMenu pancakeHouseMenu = new PancakeHouseMenu();
    DinerMenu dinerMenu = new DinerMenu();

    Waitress waitress = new Waitress(pancakeHouseMenu, dinerMenu);

    waitress.printMenu();
  }
}

```

## 반복자 패턴의 특징 알아보기

- 서로의 차이점을 인정하고 원래 코드를 그대로 사용하되, getIterator() 메소드만 추가

| 관리하기 힘든 종업원 코드                                                                                                       | Iterator가 장착된 신형 종업원 코드                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 메뉴가 캡슐화 되어 있지 않습니다. 객체마을 식당에서 ArrayList를 쓰고 팬 케이크 하우스에서는 배열을 쓴다는 사실을 알고 있습니다. | 메뉴가 캡슐화 되어 있습니다. 종업원은 메뉴에서 메뉴 항목의 컬렉션을 어떤 식으로 저장하는지 전혀 알 수가 없다                                  |
| MenuItems을 대상으로 반복 작업을 하려면 2개의 순환문이 필요                                                                     | 반복자만 구현한다면 다형성을 활용해서 어떤 컬렉션 이든 1개의 순환문으로 처리할 수 있다                                                        |
| 종업원이 구상 클래스(MenuItem[]과 ArrayList)에 직접 연결되어 있습니다                                                           | 종업원은 인터페이스(반복자)만 알면 됩니다                                                                                                     |
| 유사한 인터페이스를 가졌음에도 2개의 서로 다른 구상 메뉴 클래스에 묶여 있습니다                                                 | Menu 인터페이스가 완전히 똑같..어? 아직 인터페이스가 통일되지 않았군요! 종업원은 여전히 2개의 구상 메뉴 클래스에 묶여 있습니다. 고쳐야겠네요! |

## 통합 식당 코드 다시 살펴보기

- PancakeHouseMenu와 DinerMenu는 똑같은 메소드를 제공하지만 아직 같은 인터페이스를 구현하고 있진 않습니다
- !! 책 367쪽 참고 !!

## 인터페이스 개선하기

- PancakeHouseMenu와 DinerMenu가 같은 인터페이스를 구현하도록 만들어야 합니다
- 자바에 내장된 Iterator 인터페이스를 사용하지 않은 이유 : 반복자를 만드는 과정을 살펴보려고
  - 이제 자바에 있는 Iterator 인터페이스를 사용해 봅시다

```java

public interface Iterator {
  boolean hasNext();
  Object next();
  void remove();
}
```

## 무엇이든 물어보세요

- Q1) 객체 컬렉션에서 어떤 항목을 제거하는 기능을 제공하고 싶지 않다면 어떻게 해야 할까요?
- A1) remove() 메소드를 반드시 제공해야 하는 건 아닙니다
  - 물론 Iterator 인터페이스에 포함되어 있는 메소드라서 메소드를 정의하지 않을 수는 없지만
  - 대신 remove() 메소드를 호출하면 UnsupportedOperationException 예외를 던지도록 구현하면 됩니다
- Q2) 멀티스레드를 사용할 때 같은 객체 컬렉션에 여러 반복자가 있다면 remove는 어떤 식으로 작동하나요?
- A2) 반복자를 써서 컬렉션에 있는 각 항목에 접근하고 있는 상황에서 컬렉션이 변경될 때를 대비한 remove() 행동은 정의되어 있지 않습니다
  - 따라서 컬렉션에 동시에 접근하는 멀티스레드 코드를 디자인할 때는 매우 조심해야 합니다

## java.util.Iterator 적용하기 - 369쪽

```java

public Iterator<MenuItem> createIterator() {
  return menuItems.iterator();
}

import java.util.Iterator;

public class DinerMenuIterator implements Iterator<MenuItem> {
  MenuItem[] items;
  int position = 0;

  public DinerMenuIterator(MenuItem[] items) {
    this.items = items;
  }

  public MenuItem next() {
    MenuItem menuItem = items[position];
    position = position + 1;
    return menuItem;
  }

  public boolean hasNext() {
    if (position >= items.length || items[position] == null) {
      return false;
    } else {
      return true;
    }
  }

  public void remove() {
    if (position <= 0) {
      throw new IllegalStateException("You can't remove an item until you've done at least one next()");
    }
    if (items[position-1] != null) {
      for (int i = position-1; i < (items.length-1); i++) {
        items[i] = items[i+1];
      }
      items[items.length-1] = null;
    }
  }
}
```

```java

public interface Menu {
  public Iterator<MenuItem> createIterator();
}

public class Waitress {
  Menu pancakeHouseMenu;
  Menu dinerMenu;

  public Waitress(Menu pancakeHouseMenu, Menu dinerMenu) {
    this.pancakeHouseMenu = pancakeHouseMenu;
    this.dinerMenu = dinerMenu;
  }

  public void printMenu() {
    Iterator pancakeIterator = pancakeHouseMenu.createIterator();
    Iterator dinerIterator = dinerMenu.createIterator();
    System.out.println("MENU\n----\nBREAKFAST");
    printMenu(pancakeIterator);
    System.out.println("\nLUNCH");
    printMenu(dinerIterator);
  }

  private void printMenu(Iterator iterator) {
    while (iterator.hasNext()) {
      MenuItem menuItem = (MenuItem)iterator.next();
      System.out.print(menuItem.getName() + ", ");
      System.out.print(menuItem.getPrice() + " -- ");
      System.out.println(menuItem.getDescription());
    }
  }

  // ...
}

```

## 변경된 통합 식당 코드 살펴보기 - 371쪽

![](./images/%EB%B3%80%EA%B2%BD%EB%90%9C%ED%86%B5%ED%95%A9%EC%8B%9D%EB%8B%B9%EC%BD%94%EB%93%9C%EC%82%B4%ED%8E%B4%EB%B3%B4%EA%B8%B0.jpeg)

- PancakeHouseMenu와 DinerMenu 클래스에서 Menu 인터페이스를 구현합니다
- Waitress 클래스에서 각 메뉴 객체를 참조할 때는 구상 크르래스 대신 인터페이스를 사용하면 됩니다
  - 구현보다는 인터페이스에 맞춰서 프로그래밍한다 라는 원칙을 따를 수 있어서 Waitress 클래스와 구상 클래스 사이의 의존성을 줄일 수 있습니다

## 반복자 패턴의 정의

- 반복자 패턴(Iterator Pattern)은 컬렉션의 구현 방법을 노출하지 않으면서 집합체 내의 모든 항목에 접근하는 방법을 제공합니다
- 반복자 패턴을 사용하면 내부 구현 방법을 외부로 노출하지 않으면서 집합체에 있는 모든 항목에 일일이 접근할 수 있습니다
- 또한 각 항목에 일일이 접근할 수 있게 해 주는 기능을 집합체가 아닌 반복자 객체가 책임진다는 장점도 있습니다
- 그러면 집합체 인터페이스와 구현이 간단해지고, 각자에게 중요한 일만을 처리할 수 있게 됩니다

## 반복자 패턴의 구조 알아보기

![](./images/%EB%B0%98%EB%B3%B5%EC%9E%90%ED%8C%A8%ED%84%B4%EC%9D%98%EA%B5%AC%EC%A1%B0%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0.jpeg)

## 단일 역할 원칙

- 집합체에서 내부 컬렉션 관련 기능과 반복자용 메소드 관련 기능을 전부 구현한다면?

  - 집합체에 들어가는 메소드 개수가 늘어난다

- 클래스에서 원래 클래스의 역할 외에 다른 역할을 처리할 때 2가지 이유로 그 클래스가 바뀔 수 있다는 사실을 알아야 합니다
- 첫째, 컬렉션이 어떤 이유로 바뀌게 되면 그 클래스도 바뀌어야 합니다
- 둘째, 반복자 관련 기능이 바뀌었을 때도 클래스가 바뀌어야 합니다
- 이런 이유로 이번 시간 이후로 변경과 관련된 디자인 원칙이 하나 더 추가됩니다

- 디자인 원칙 : **단일 역할 원칙(Single Responsibility Principle)**

  - 클래스를 변경할 이유는 하나뿐이어야 한다

- 클래스를 고치는 일은 최대한 피해야 합니다
  - 코드를 변경하다 보면 온갖 문제가 생길 수 있으니까요
  - 코드를 변경할 만한 이유가 2가지나 되면 그만큼 그 클래스를 나중에 고쳐야 할 가능성이 커지며 디자인에 있어서 2가지 부분에 영향이 미치게 됩니다
- 응집도(cohesion)란 한 클래스 또는 모듈이 특정 목적이나 역할을 얼마나 일관되게 지원하는지를 나타내는 척도입니다

## 무엇이든 물어보세요 - 376쪽

- Q1) 다른 책을 보니까 반복자 패턴의 클래스 다이어 그램에 first(), next(), isDone(), currentItem() 메소드가 들어있던데요?
- A1) 예전엔 그런 이름을 가진 메소드를 많이 썼지만 고전적인 이름이다

  - 요즘은 next(), hasNext(), remove() 등의 메소드를 사용하는 것이 대세입니다
  - first()에 해당하는 메소드가 없는 이유는 무언가를 처음부터 다시 돌리고 싶을 때 반복자를 새로 만드는 방식을 주로 사용하기 때문입니다

- Q2) '내부 반복자'와 '외부 반복자'의 뜻, 방금 예시에선 어떤 반복자를 사용한 것인가요?
- A2) 우리가 사용한 반복자는 외부 반복자

  - 클라이언트에서 next()를 호출해서 다음 항목을 가져오기에, 클라이언트가 반복 잡업을 제어한다
  - 내부 반복자는 자신이 반복작업을 제어합니다
  - 내부 반복자를 쓸 땐 클라이언트가 반복 작업을 마음대로 제어할 수 없기에 외부 반복자를 쓸 때보다 유연성이 떨어집니다

- Q3) 반대 방향으로 움직이는 반복자도 만들 수도 있나요?
- A3) 가능합니다

  - 반복자 패턴은 반복자가 가리키는 항목을 바꾸는 메소드를 제공하면 됩니다
  - 예를 들어, previous() 메소드를 추가하면 됩니다

- Q4) 해시테이블 같이 정해진 순서가 없는 컬렉션의 반복 작업 순서는 어떻게 정하나요?
- A4) 반복자에는 특별한 순서가 정해져 있지 않습니다

  - 컬렉션이 해시 테이블같이 정렬되지 않은 것일 수도 있고, 중복된 항목이 들어있을 수도 있습니다
  - 접근 순서는 사용된 컬렉션의 특성 및 구현과 연관되어 있습니다
  - 일반적으로 컬렉션 문서에 특별하게 언급이 되어 있지 않은 이상 순서를 가정하면 안 됩니다

- Q5) 반복자로 '다형적인 코드'를 만들수 있다고 했는데요, 좀 더 자세히 설명해 주실 수 있나요?
- A5) Iterator를 매개변수로 받는 메소드를 만들면 다형적인 반복 작업을 사용한다고 할 수 있습니다

  - Iterator를 지원하기만 하면 모든 컬렉션에 써먹을 수 있는 코드를 만든 것과 같습니다

- Q6) 자바를 사용하면 웬만해서는 java.util.Iterator 인터페이스를 쓰게 되지 않나요?
  - 이미 자바 Iterator를 사용하고 있는 클래스에 우리가 구현한 반복자를 사용할 수 있으니까 말이죠
- A6) 거의 그렇습니다

  - 하지만 집합체의 Iterator 인터페이스에 다른 기능을 추가하고 싶다면 Iterator 인터페이스를 확장해서 쓰면 된다는 점을 잘 기억해두세요

- Q7) Enumeration 인터페이스에서도 반복자 패턴을 사용하나요?
- A7) 예전에 Iterator 용도로 쓰였으나 지금은 java.util.Iterator가 쓰입니다

  - Enumeration은 에도 hasNext(), hasMoreElements(), next(), nextElement() 메소드가 있습니다
  - 하지만 Iterator를 지원하는 자바 클래스가 더 많기에 대부분 Enumeration 보다는 Iterator를 사용합니다

- Q8) 자바의 향상된 for 순환문과 반복자 사이에는 어떤 관계가 있나요?
- A8) 그 둘 사이에는 밀접한 관계가 있지만 Iterable 인터페이스를 이해해야 합니다.

## Iterable 인터페이스 알아보기 - 377쪽

- 자바의 모든 컬렉션 유형에서 Iterable 인터페이스를 구현합니다
- 어떤 클래스에서 Iterable을 구현한다면 그 클래스는 iterator() 메소드를 구현합니다
  - iterator() 메소드는 Iterator 인터페이스를 구현한 반복자를 리턴합니다
- 이 인터페이에는 컬렉션에 있는 항목을 대상으로 반복 작업을 수행하는 방법을 제공하는 forEach() 메소드가 기본으로 포함됩니다
- 그 외에도 자바는 향상된 for 순환문으로 몇 가지 편리한 문법적 기능을 제공합니다

## 향상된 for 순환문 알아보기 - 378쪽

```java

List<MenuItem> menuItems = new ArrayList<MenuItem>();

// 기존 while문 사용
Iterator<MenuItem> iterator = menuItems.iterator();
while(iterator.hasNext()) {
  MenuItem menuItem = iterator.next();
  System.out.println(menuItem.getName());
}

// 향상된 for문 사용
for(MenuItem menuItem : menuItems) {
  System.out.println(menuItem.getName());
}

```

## 향상된 for 순환문 사용 시 주의 사항

- 배열은 컬렉션이 아니라서 Iterable 인터페이스를 구현하지 않습니다
- 이것을 해결하는 방법은 리팩터링을 해야하지만 이것은 이 책의 범위를 벗어나므로 넘어가도록 하겠습니다

## 객체마을 카페 메뉴 살펴보기

```java
// 기존 코드

public class CafeMenu {
  Map<String, MenuItem> menuItems = new HashMap<String, MenuItem>();

  public CafeMenu() {
    addItem("Veggie Burger and Air Fries",
      "Veggie burger on a whole wheat bun, lettuce, tomato, and fries",
      true,
      3.99);
    addItem("Soup of the day",
      "A cup of the soup of the day, with a side salad",
      false,
      3.69);
    addItem("Burrito",
      "A large burrito, with whole pinto beans, salsa, guacamole",
      true,
      4.29);
  }

  public void addItem(String name, String description, boolean vegetarian, double price) {
    MenuItem menuItem = new MenuItem(name, description, vegetarian, price);
    menuItems.put(menuItem.getName(), menuItem);
  }

  public Map<String, MenuItem> getMenuItems() {
    return menuItems;
  }
}
```

- 이 코드를 지금 사용 중인 프레임워크에서 쓸 수 있게 고칠 때 해야할 일 3가지
  - Menu 인터페이스 구현
  - getItems() 제거
  - HashMap 값들에 반복 작업을 할 수 있는 반복자를 리턴하는 createIterator() 메소드 추가

## 객체마을 카페 메뉴 코드 고치기

- 객체마을 카페 메뉴를 기존 프레임워크에 추가하는 일은 간단하다
  - HashTable도 Iterator를 지원하는 자바 컬렉션이기 때문
  - 하지만ArrayList와는 조금 다른 식으로 고쳐야 합니다

```java
// 1. Menu 인터페이스 구현
public class CafeMenu implements Menu {
  Map<String, MenuItem> menuItems = new HashMap<String, MenuItem>();

  public CafeMenu() {
    addItem("Veggie Burger and Air Fries",
      "Veggie burger on a whole wheat bun, lettuce, tomato, and fries",
      true,
      3.99);
    addItem("Soup of the day",
      "A cup of the soup of the day, with a side salad",
      false,
      3.69);
    addItem("Burrito",
      "A large burrito, with whole pinto beans, salsa, guacamole",
      true,
      4.29);
  }

  public void addItem(String name, String description, boolean vegetarian, double price) {
    MenuItem menuItem = new MenuItem(name, description, vegetarian, price);
    menuItems.put(menuItem.getName(), menuItem);
  }

  // 2. getItems() 제거 - menuItems 구현을 waitress에 모두 공개할 필요가 없기 때문
  // public Map<String, MenuItem> getMenuItems() {
  //   return menuItems;
  // }

  // 3. createIterator() 메소드 추가
  public Iterator<MenuItem> createIterator() {
    return menuItems.values().iterator();
  }
}

```

## 종업원 코드에 카페 메뉴 추가하기

- 이제 우리가 고친 메뉴를 지원하도록 종업원 코드를 바꿔줍시다
- Waitress 클래스에 Iterator를 쓰도록 고치면 되니까 별로 어려울 것은 없습니다

```java

public class Waitress {
  Menu pancakeHouseMenu;
  Menu dinerMenu;
  Menu cafeMenu;

  public Waitress(Menu pancakeHouseMenu, Menu dinerMenu, Menu cafeMenu) {
    this.pancakeHouseMenu = pancakeHouseMenu;
    this.dinerMenu = dinerMenu;
    this.cafeMenu = cafeMenu;
  }

  public void printMenu() {
    Iterator pancakeIterator = pancakeHouseMenu.createIterator();
    Iterator dinerIterator = dinerMenu.createIterator();
    Iterator cafeIterator = cafeMenu.createIterator();

    System.out.println("MENU\n----\nBREAKFAST");
    printMenu(pancakeIterator);
    System.out.println("\nLUNCH");
    printMenu(dinerIterator);
    System.out.println("\nDINNER"); // 카페 메뉴는 저녁 메뉴로 제공
    printMenu(cafeIterator); // 메뉴를 출력할 때는 반복자를 생성하고 printMenu()에 전달
  }

  // 이 부분은 바꿀 필요가 없음
  private void printMenu(Iterator iterator) {
    while (iterator.hasNext()) {
      MenuItem menuItem = (MenuItem)iterator.next();
      System.out.print(menuItem.getName() + ", ");
      System.out.print(menuItem.getPrice() + " -- ");
      System.out.println(menuItem.getDescription());
    }
  }
}

```

## 카페 메뉴까지 추가된 통합 식당 코드 테스트

```java

public class MenuTestDrive {
  public static void main(String[] args) {
    Menu pancakeHouseMenu = new PancakeHouseMenu();
    Menu dinerMenu = new DinerMenu();
    Menu cafeMenu = new CafeMenu();

    Waitress waitress = new Waitress(pancakeHouseMenu, dinerMenu, cafeMenu);

    waitress.printMenu();
  }
}

```

#### 지금까지 한 일을 정리해봅시다

- 종업원이 메뉴 항목을 대상으로 반복 작업을 쉽게 처리하는 방법을 찾고 있었습니다
  - 메뉴 항목이 서로 다른 방식으로 구현되어 있었기에 서로 다른 인터페이스를 써서 반복 작업을 처리해야 했습니다
- 그러면서도 종업원이 메뉴 항목이 어떤식으로 구현되어 있는지는 알 필요가 없도록 하고 싶었죠
- 그래서 종업원을 구현과 분리했죠
- 그리고 메뉴 항목을 구현과 분리했습니다
  - 종업원에게 반복자를 제공하고, 메뉴 항목은 반복자를 구현하도록 했습니다
- 그리고 종업원의 확장성도 강화했습니다
  - 반복자를 사용해서 종업원을 메뉴 항목 구현으로 부터 분리했습니다
- 그리고 다른 것이 있습니다
  - 자바는 여러 객체를 저장하고 불러오는 다양한 컬렉션 클래스를 제공합니다
  - Vector와 LinkedList 등이 있죠
  - 대부분 서로 다른 인터페이스를 사용합니다
  - 하지만 거의 모두 Iterator 객체를 반을 수 있는 방법을 지원합니다

## 코드 자석

- 주방장이 요일별로 점심 메뉴 항목을 바꾸기로 했습니다
- 즉, 월, 수, 금, 일요일에 제공하는 메뉴와 화, 목, 토요일에 제공하는 메뉴가 달라지는 거죠

```java

import java.util.Iterator;
import java.util.Calendar;

public class AlternatingDinerMenuIterator implements Iterator<MenuItem> {
  MenuItem[] items;
  int position;

  public AlternatingDinerMenuIterator(MenuItem[] items) {
    this.items = items;
    position = Calendar.DAY_OF_WEEK % 2;
  }

  public boolean hasNext() {
    if (position >= items.length || items[position] == null) {
      return false;
    } else {
      return true;
    }
  }

  public Object next() {
    MenuItem menuItem = items[position];
    position = position + 2;
    return menuItem;
  }

  public void remove() {
    throw new UnsupportedOperationException(
      "Alternating Diner Menu Iterator does not support remove()");
  }
}

```

## 종업원 코드 개선하기

- 지금 종업원 코드는 처음 만들었던 코드에 비해 훨씬 나아졌지만 printMenu()를 3번이나 호출해야 한다는 점과
- 새로운 메뉴가 추가될 때 마다 종업원 코드를 추가해야한다는 점이 문제로 남아 있습니다
- OCP(Open-Closed Principle)를 준수하려면 어떻게 해야 할까요?

```java
// 기존 코드

public void printMenu() {
  Iterator<MenuItem> breakfastIterator = breakfastMenu.createIterator();
  Iterator<MenuItem> lunchIterator = lunchMenu.createIterator();
  Iterator<MenuItem> dinerIterator = dinerMenu.createIterator();

  System.out.println("MENU\n----\nBREAKFAST");
  printMenu(breakfastIterator);
  System.out.println("\nLUNCH");
  printMenu(lunchIterator);
  System.out.println("\nDINER");
  printMenu(dinerIterator);
}

```

#### 메뉴들을 ArrayList로 묶어서 반복자로 각 메뉴를 반복작업을 할 수 있다 - 루의 아이디어

```java

public class Waitress {
  ArrayList<Menu> menus;

  public Waitress(ArrayList<Menu> menus) {
    this.menus = menus;
  }

  public void printMenu() {
    Iterator<Menu> menuIterator = menus.iterator();
    while (menuIterator.hasNext()) {
      Menu menu = menuIterator.next();
      printMenu(menu.createIterator());
    }
  }

  private void printMenu(Iterator<MenuItem> iterator) {
    while (iterator.hasNext()) {
      MenuItem menuItem = iterator.next();
      System.out.print(menuItem.getName() + ", ");
      System.out.print(menuItem.getPrice() + " -- ");
      System.out.println(menuItem.getDescription());
    }
  }
}

```

- 이번에는 디저트 서브메뉴를 추가해달라고 하네요
  - 메뉴 안에 서브메뉴가 들어가 있는 것도 지원해 달라는 군요
  - 그냥 디저트 메뉴를 DinerMenu 컬렉션원소로 넣을 수 있으면 좋겠지만, 지금 구현되어 있는 코드를 가지고는 그렇게 할 수 없습니다

#### 우리가 원하는 것 - 391쪽

- 전체 메뉴
  - 팬케이크 하우스 메뉴(ArrayList)
  - 객체 식당 메뉴(`Array[]`)
    - 디저트 메뉴(`Array[][]`)
  - 객체마을 카페 메뉴(HashMap)

## 리팩터링 준비하기

- 결국 모든 메뉴(서브메뉴 포함)를 대상으로 제대로 작동할 수 있도록 코드를 고쳐야할 때가 왔습니다
- 주방장들에게 ㅁ뉴 코드를 새로 구현해달라고 요청해야 합니다
- 시스템이 복잡해져서 지금 당장 디자인을 완전히 뜯어 고치지 않으면 서브메뉴를 기존 메뉴에 추가할 수가 없습니다
- 새로운 디자인에 어떤 것들이 필요한지 생각해 봅시다
  - 메뉴, 서브메뉴, 메뉴 항목 등을 모두 넣을 수 있는 트리형태의 구조가 필요합니다
  - 각 메뉴에 있는 모든 항목을 대상으로 특정 작업을 할 수 있는 방법을 제공해야 하며,
    - 그 방법은 적어도 지금 사용중인 반복자만큼 편리해야 합니다
  - 더 유연한 방법으로 아이템을 대상으로 반복 작업을 수행할 수 있어야 합니다
    - 예를들어, 객체 마을 식당 메뉴에 껴있는 디저트 메뉴를 대상으로만 반복작업을 할 수 있으면서도 디저트 서브메뉴까지 포함한, 모든 객체마을 식당 메뉴를 대상으로 반복작업을 할 수 있어야 합니다

![](./images/%EB%A6%AC%ED%8C%A9%ED%84%B0%EB%A7%81%EC%A4%80%EB%B9%84%ED%95%98%EA%B8%B0.jpeg)

## 컴포지트 패턴의 정의

- 반복자 패턴을 쓰는 걸 포기한건 아니지만(여전히 반복자 패턴도 쓰입니다)
- 메뉴관리는 반복자 패턴만으로 처리하기 어려우니 메뉴 관리에 도움이 되는 컴포지트 패턴을 쓰기로 결정했습니다

- **컴포지트 패턴**(Composite Pattern)으로 객체를 트리구조로 구성해서 부분-전체 계층구조를 구현합니다.

  - 컴포지트 패턴을 사용하면 클라이언트에서 개별 객체와 복합 객체를 똑같은 방법으로 다룰 수 있습니다

- 부분-전체 계층 구조(part-whole hierarchy)를 생성할 수 있습니다
  - 부분 전체 계층 구조 : 부분(메뉴 및 메뉴 항목)들이 계층을 이루고 있지만 모든 부분을 묶어서 전체로 다룰 수 있는 구조
- 메뉴를 이런 방식으로 만들어 두면 컴포지트 패턴을 써서 개별 객체와 복합 객체에도 똑같은 방식을 적용할 수 있습니다
- 메뉴, 서브메뉴, 서브서브메뉴로 구성된 트리 구조
  - 각각이 모두 복합 객체가 될 수 있다는 말
  - 각 메뉴 안에 다른 메뉴와 메뉴 항목이 또 들어갈 수 있음
    - 개별 객체도 메뉴이지만 다른 객체가 들어있지 않을 뿐
- 컴포지트 패턴을 따르는 디자인을 사용하면 간단한 코드만 가지고도 똑같은 작업을 전체 메뉴 구조를 대상으로 반복해서 적용할 수 있습니다

- 컴포지트 패턴을 사용하면 객체의 구성과 개별 객체를 노드로 가지는 트리 형태의 객체 구조를 만들 수 있습니다
- 이런 복합 구조(composite structure)를 사용하면 복합 객체와 개별 객체를 대상으로 똑같은 작업을 적용할 수 있습니다
- 즉, 복합 객체와 개별 객체를 구분할 필요가 거의 없어지죠

## 컴포지트 패턴으로 메뉴 디자인 하기

![](./images/%EC%BB%B4%ED%8F%AC%EC%A7%80%ED%8A%B8%ED%8C%A8%ED%84%B4%EC%9C%BC%EB%A1%9C%EB%A9%94%EB%89%B4%EB%94%94%EC%9E%90%EC%9D%B8%ED%95%98%EA%B8%B0.jpeg)

## 메뉴 구성 요소 구현하기

```java

public abstract class MenuComponent {
    public void add(MenuComponent menuComponent) {
        throw new UnsupportedOperationException();
    }

    public void remove(MenuComponent menuComponent) {
        throw new UnsupportedOperationException();
    }

    public MenuComponent getChild(int i) {
        throw new UnsupportedOperationException();
    }

    public String getName() {
        throw new UnsupportedOperationException();
    }

    public String getDescription() {
        throw new UnsupportedOperationException();
    }

    public double getPrice() {
        throw new UnsupportedOperationException();
    }

    public boolean isVegetarian() {
        throw new UnsupportedOperationException();
    }

    public void print() {
        throw new UnsupportedOperationException();
    }
}

```

## 메뉴 항목 구현하기

```java

public class MenuItem extends MenuComponent {
    String name;
    String description;
    boolean vegetarian;
    double price;

    public MenuItem(String name, String description, boolean vegetarian, double price) {
        this.name = name;
        this.description = description;
        this.vegetarian = vegetarian;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public double getPrice() {
        return price;
    }

    public boolean isVegetarian() {
        return vegetarian;
    }

    public void print() {
        System.out.print("  " + getName());
        if (isVegetarian()) {
            System.out.print("(v)");
        }
        System.out.println(", " + getPrice());
        System.out.println("     -- " + getDescription());
    }
}

```

## 메뉴 구현하기

- MenuItem도 다 준비뙛으니 이제 복합 객체 클래스인 Menu만 준비하면 됩니다

```java

public class Menu extends MenuComponent {
  List<MenuComponent> menuComponents = new ArrayList<>();
  String name;
  String description;

  public Menu(String name, String description) {
    this.name = name;
    this.description = description;
  }

  public void add(MenuComponent menuComponent) {
    menuComponents.add(menuComponent);
  }

  public void remove(MenuComponent menuComponent) {
    menuComponents.remove(menuComponent);
  }

  public MenuComponent getChild(int i) {
    return menuComponents.get(i);
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public void print() {
    System.out.print("\n" + getName());
    System.out.println(", " + getDescription());
    System.out.println("---------------------");

    // Iterator<MenuComponent> iterator = menuComponents.iterator();
    // while (iterator.hasNext()) {
    //   MenuComponent menuComponent = iterator.next();
    //   menuComponent.print();
    // }

    for (MenuComponent menuComponent : menuComponents) {
      menuComponent.print();
    }
  }
}

```

## 종업원 코드에 컴포지트 적용하기

- 종업원 코드도 변경된 메뉴 코드에 맞게 수정해보자

```java

public class Waitress {
  MenuComponent allMenus;

  public Waitress(MenuComponent allMenus) {
    this.allMenus = allMenus;
  }

  public void printMenu() {
    allMenus.print();
  }
}

```

![](./images/%EB%B3%B5%ED%95%A9%EA%B0%9D%EC%B2%B4%EB%93%A4%EC%9D%98%EA%B5%AC%EC%84%B1.jpeg)

## 메뉴 코드 테스트

```java

public class MenuTestDrive {
  public static void main(String[] args) {
    MenuComponent pancakeHouseMenu = new Menu("PANCAKE HOUSE MENU", "Breakfast");
    MenuComponent dinerMenu = new Menu("DINER MENU", "Lunch");
    MenuComponent cafeMenu = new Menu("CAFE MENU", "Dinner");
    MenuComponent dessertMenu = new Menu("DESSERT MENU", "Dessert of course!");

    MenuComponent allMenus = new Menu("ALL MENUS", "All menus combined");

    allMenus.add(pancakeHouseMenu);
    allMenus.add(dinerMenu);
    allMenus.add(cafeMenu);

    dinerMenu.add(new MenuItem("Pasta", "Spaghetti with Marinara Sauce, and a slice of sourdough bread", true, 3.89));
    dinerMenu.add(dessertMenu);

    dessertMenu.add(new MenuItem("Apple Pie", "Apple pie with a flakey crust, topped with vanilla icecream", true, 1.59));

    Waitress waitress = new Waitress(allMenus);
    waitress.printMenu();
  }
}

```

### 405쪽) 한 클래스에서 한 역할만 맡아야 한다고 했으면서 이 패턴에서는 한 클래스에 2가지 역할을 넣고 있네요?

- 컴포지트 패턴에서는 계층 구조를 관리하는 일과 메뉴 관련 작업을 처리해야 하잖아요
  - 일리가 있는 지적입니다
- 컴포지트 패턴에서는 단일 역할 원칙을 깨는 대신 투명성 확보하는 패턴이라고 할 수 있습니다
  - 투명성(transparency)이란 무엇일까요?
    - Component 인터페이스에 자식들을 관리하는 기능과 잎으로써의 기능을 전부 넣어서 클라이언트가 복합 객체와 잎을 똑같은 방식으로 처리할 수 있도록 만들 수 있습니다
    - 어떤 원소가 복합 객체인지 잎인지가 클라이언트에게는 투명하게 보이죠
- Component 클래스에는 두 종류의 기능이 모두 들어있다 보니 안전성은 약간 떨어집니다
- 클라이언트가 어떤 원소를 대상으로 무의미하거나 부적절한 작업(메뉴항목에 메뉴를 추가한다든가 하는 일)을 처리하려고 할 수도 있을 테니까요
  - 이런 문제는 디자인상의 결정 사항에 속합니다
  - 다른 방향으로 디자인해서 여러 역할을 서로 다른 인ㅊ터페이스로 분리할 수도 있습니다
  - 그러면 안전성은 높아지지만 투명성은 떨어지게 되고 코드에서 조건문이나 instanceof 연산자를 사용해야 할 수도 있습니다
- 다시 질문으로 돌아가서 지적한 내용은 상황에 따라 원칙을 적절하게 사용해야 함을 보여주는 대표적인 사례라고 할 수 있습니다
  - 디자인 원칙에서 제시하는 가이드라인을 따르면 좋지만 그 원칙이 디자인에 어떤 영ㅊ향을 끼칠지를 항상 고민하고 원칙을 적용해야 합니다
  - 물론 상황과 원칙을 바라보는 관점에 따라 해석 방법이 크게 달라질 수도 있습니다
  - 예를 들어 잎에 자식을 관리하는 기능(add(0, remove(), getChild() 등)을 넣는 것이 올바르지 못한 디자인이라고 생각할 수도 있지만,
    - 조금 시각을 바꿔보면 잎을 자식이 0개인 노드라고 생각할 수도 있을 테니까요

## 패턴 집중 인터뷰

- 부분 전체 계층 구조

  - GUI를 예를 들어보자
    - GUI에는 프레임이나 패널 같은 최상위 구성요소
      - 그 안에 메뉴, 텍스트틀, 스크롤바, 버튼 같은 구성요소가 들어있다
    - GUI는 여러부분으로 이루어져 있지만, 화면에 표시할 때는 대게 부분을 나눠서 생각하기 보다는 전체를 하나로 묶어서 생각ㄷ한다
    - 최상위 구성요소가 화면에 표시되도록 한 다음, 나머지 부분은 그 구성요소에서 알아서 처리하도록 하는 경우를 흔하게 볼 수 있다
  - 다른 구성요소를 포함하고 있는 구성요소는 복합 객체(composite object)라고 부릅니다

- 모든 객체의 인터페이스가 같다

  - 의미 없는 메소드가 생길 수 있다
  - 아무일도 하지 않거나 null 또는 false를 상황에 맞게 리턴하는 방법이 있다
  - 클라이언트에서도 예외 상황을 적절히 처리할 준비를 하고 있어야 한다

- 자식한테 부모의 레퍼런스가 있을 수도 있나요?

  - 트리 내에서 돌아다니기 편하도록 자식에게 부모 노드의 포인터를 넣을 수도 있습니다
  - 그리고 자식의 레퍼런스를 지워야 할 때도 반드시 그 부모한테 자식을 지우라고 해야 하는데, 레퍼런스를 만들어 두면 더 쉽게 지울 수 있습니다

- 이 밖에 더 고려할 점이 있나요?

  - 자식의 순서도 고려해야 합니다
    - 어떤 복합 객체에서 자식을 특별한 순서에 맞게 저장해야 한다면, 어떻게 해야할까요? 그럴 때는 자식을 추가하거나 제거할 때 더 복잡한 관리 방법을 사용해야 합니다.
    - 그리고 계층 구조를 돌어다니는 데 있어서도 더 많은 주의를 기울여야 하고요.

- 캐시

  - 복합 구조가 너무 복잡하거나, 복합 객체 전체를 도는 데 너무 많은 자원이 필요하다면 복합 노드를 캐싱해 두면 도움이 됩니다.
  - 예를 들어 복합 객체에 있는 모든 자식이 어떤 계산을 하고, 그 계산을 박복 작업한다면 계산 결과를 임시로 저장하는 캐시를 만들어서 속도를 향상 시킬 수도 있습니다

- 컴포지트 패턴의 장점
  - 클라이언트를 단순화 시킬 수 있다 !
  - 컴포지트 패턴을 사용하는 클라이언트들은 복합 객체를 사용하고 있는지, 잎 객체를 사용하고 있는지를 신경 쓰지 않아도 됩니다

## 디자인 도구상자 안에 들어가야 할 도구들

### 객체지향 원칙

- 바뀌는 부분은 캡슐화한다
- 상속보다는 구성을 활용한다
- 구현보다는 인터페이스에 맞춰서 프로그래밍한다
- 서로 상호작용하는 객체 사이에는 가능하면 느슨한 결합을 사용해야 한다
- 확장에는 열려 있어야 하지만 변경에는 닫혀 있어야 한다
- 추상화된 것에 의존하게 만들고 구상 클래스에 의존하지 않게 만든다
- 진짜 절친에게만 이야기해야 한다(?)
- 먼저 연락하지 마세요. 저희가 연락드리겠습니다
- **어떤 클래스가 바뀌는 이유는 하나뿐 이어야만 한다.**

### 객체지향 기초

- 추상화
- 캡슐화
- 다형성
- 상속

### 객체지향 패턴

- 반복자 패턴
  - 컬렉션의 구현 방법을 노출하지 않으면서 집합체 내의 모든 항목에 접근하는 방법을 제공합니다
- 컴포지트 패턴
  - 객체들을 트리 구조로 구성하여 부분-전체 계층구조를 구현합니다.
  - 컴포지트 패턴을 사용하면 클라이언트에서 개별 객체와 복합 객체를 똑같은 방법으로 다룰 수 있습니다.

## 핵심 정리

- 반복자를 사용하면 내부 구조를 드러내지 않으면서도 클라이언트가 컬렉션 안에 들어있는 모든 원소에 접근하도록 할 수 있습니다.
- 반복자 패턴을 사용하면 집합체를 대상으로 하는 반복 작업을 별도의 객체로 캡슐화 할 수 있습니다.
- 반복자 패턴을 사용하면 컬렉션에 있는 모든 데이터를 대상으로 반복 작업을 하는 역할을 컬렉션에서 분히라 수 있습니다.
- 반복자 패턴을 쓰면 반복작업에 똑같은 인터페이스를 적용할 수 있으므로 직합체에 있는 객체를 활용하는 코드를 만들 때 다형성을 활용할 수 있습니다.
- 한 클래스에는 될 수 있으면 한 가지 역할만 부여하는 것이 좋습니다.
- 컴포지트 패턴은 개별 객체와 복합 객체를 모두 담아 둘 수 있는 구조를 제공합니다.
- 컴포지트 패턴을 사용하면 클라이언트가 개별 객체와 복합 객체를 똑같은 방법으로 다룰 수 있습니다.
- 복합 구조에 들어있는 것을 구성요소라고 부릅니다. 구성 요소에는 복합 객체와 잎 객체가 있습니다.
- 컴포지트 패턴을 적용할 때는 여러 가지 장단점을 고려해야 합니다.
  - 상황에 따라 투명성과 안정성 사이에서 적절한 균형을 찾아야 합니다.
