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

## java.util.Iterator 적용하기
