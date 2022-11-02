# 싱글턴 패턴 - 하나뿐인 특별한 객체 만들기

- 인스턴스가 하나뿐인 특별한 객체를 만들어 봅시다
  - 싱글턴 패턴은 클래스 다이어그램에 클래스가 하나뿐이다
  - 단순하지만 구현하기는 까다롭다
  - Let's get it

#### 대화로 알아보기

- 개발자) 어떤 용도?
- 전문가) 하나만 있어도 잘 돌아가는 객체는 많다
  - 스레드 풀, 캐시, 대화상자, 사용자 설정, 레지스트리 설정을 처리하는 객체, 로그 기록용 객체, 디바이스 드라이버
  - 이런 객체들은 인스턴스가 2개 이상이면
    - 프로그램이 이상하게 돌아간다든가
    - 자원을 불필요하게 잡아먹는다든가
    - 결과에 일관성이 없어진다든가 하는 심각한 문제가 생길 수 있다
- 개발자) 전역변수나 정적 변수를 쓰면 되는거 아닌가요?
- 전문가) 싱글턴 패턴은 특정 클래스에 객체 인스턴스가 하나만 만들어지도록 해주는 패턴
  - 싱글턴 패턴을 사용하면 전역 변수를 사용할 때와 마찬가지로 객체 인스턴스를 어디서든지 액세스할 수 있게 만들며,
  - 전역변수를 쓸 때 처럼 여러 단점을 감수할 필요도 없다
- 개발자) 전역변수에 어떤 단점이 있나요?
- 전문가) 예를들면
  - 전역 변수에 객체를 대입하면 애플리케이션이 시작될 때 객체가 생성 됨
    - 그 객체가 자원을 많이 차지한다고 해보자
    - 만약 애플리케이션이 끝날 때 까지 그 객체를 한 번도 쓰지 않는다면 괜히 자원만 먹는 쓸데없는 객체가 될 수 있다
  - 싱글턴 패턴을 사용하면 필요할 때만 객체를 만들 수 있다
  - 인스턴스를 2개 이상 만들지 않게 한다는 것은 간단하지 않을 수 있다

## 리틀 싱글턴 알아보기

```java
public MyClass {
  private MyClass() {
    // 생성자
  }

  public static MyClass getInstance() {
    return new MyClass();
  }
}
```

- 생성자가 private으로 선언되어 있어서 인스턴스를 만들 수 없는 클래스
- 정적 메소드
  - `MyClass.getInstance();` 와 같이 호출 할 수 있음

## 고전적인 싱글턴 패턴 구현법

```java
public class Singleton {
  private static Singleton uniqueInstance;

  private Singleton() {}

  public static Singleton getInstance() {
    if (uniqueInstance == null) {
      // 정적 변수 이기 때문에 있다면 기존 인스턴스를 반환
      uniqueInstance = new Singleton();
    }
    return uniqueInstance;
  }
}
```

- 필요한 상황이 닥치기 전까지 인스턴스를 생성하지 않게 됨
  - lazy instantiation

## 패턴 집중 인터뷰

- 싱글턴은 유일하다
  - 인스턴스가 2개가 되지 않도록 싱글턴 패턴으로 만들어짐
- 애플리케이션에서 어떤 객체에서도 같은 자원을 사용할 수 있음
  - e.g.
    - 레지스트리 설정
    - 연결 풀, 스레드 풀 같은 자원풀을 관리하는 데도 사용
- private으로 생성자를 숨겨놓았다

## 초콜릿 보일러 코드 살펴보기

- 초콜릿 보일러 : 초콜릿과 우유를 받아서 끓이고 초코바를 만드는 단계로 넘겨주는 장치

```java
public class ChocolateBoiler {
  private static ChocolateBoiler uniqueInstance;
  public static ChocolateBoiler getInstance() {
    if (uniqueInstance == null) {
      uniqueInstance = new ChocolateBoiler();
    }
    return uniqueInstance;
  }
}
```

```ts
class ChocolateBoiler {
  private static uniqueInstance: ChocolateBoiler;
  public static getInstance(): ChocolateBoiler {
    if (!ChocolateBoiler.uniqueInstance) {
      ChocolateBoiler.uniqueInstance = new ChocolateBoiler();
    }
    return ChocolateBoiler.uniqueInstance;
  }
}
```

- javascript(typescript)에선 static 멤버변수에 접근할 때 `클래스명.메서드명` 으로 접근해야 된다
  - java에선 해당 클래스 안에선 클래스명과 접근 연산자를 붙이지 않고도 접근 가능
