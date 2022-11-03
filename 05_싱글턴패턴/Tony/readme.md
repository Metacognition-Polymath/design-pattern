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

## 싱글턴 패턴 정의

- 싱글턴 패턴(Singleton pattern)은 클래스 인스턴스를 하나만 만들고, 그 인스턴스로의 전역 접근을 제공합니다
- 클래스에서 하나뿐인 인스턴스를 관리하도록 만들면 된다
- 자원을 많이 잡아먹는 인스턴스가 있다면 게으른 인스턴스화(lazy instantiation) 기법으로 싱글턴을 구현하면 유용하다

## 초콜릿 보일러에 문제 발생

- 멀티스레드를 사용할 시 문제가 생길 수 있음

## 멀티 스레딩 문제 살펴보기

- 서로 다른 두 개의 인스턴스가 만들어 질수 있음

## 멅티 스레딩 문제 해결하기

```java

public class Singleton {
  private static Singleton uniqueInstance;

  private Singleton() {}

  public static synchronized Singleton getInstance() {
    if (uniqueInstance == null) {
      uniqueInstance = new Singleton();
    }
    return uniqueInstance;
  }
}

```

- getInstance()를 동기화하면 멀티스레딩과 관련되니 문제가 간단하게 해결됩니다

  - 문제가 해결되긴 하지만 속도 문제가 발생한다

- 처음을 제외하면 동기화는 불필요한 오버헤드만 증가시킬 뿐이다

## 더 효율적으로 멀티스레딩 문제 해결하기

### 방법1. getInstance()의 속도가 그리 중요하지 않다면 그냥 둡니다

- getInstance()가 애플리케이션에 큰 부담을 주지 않는다면 그냥 둬도 됩니다
  - 다만 동기화하면 성능이 100배 정도 저하된다

### 방법2. 인스턴스가 필요할 때는 생성하지 말고 처음부터 만듭니다

- 나) 만약 사용하지 않는 다면 그대로 자원손해로 이어질 수 있음

### 방법3. 'DCL'을 써서 getInstance()에서 동기화되는 부분을 줄입니다

- DCL(Double-checked Locking)을 사용하면 인스턴스가 생성되어 있는지 확인한 다음 생성되어 있지 않았을 때만 동기화
- 처음에만 동기화하고 나중에는 동기화하지 않아도 됩니다(원하던 방식)

```java
public class Singleton {
  private volatile static Singleton uniqueInstance;

  private Singleton() {}

  public static Singleton getInstance() {
    if (uniqueInstance == null) {
      synchronized (Singleton.class) {
        if (uniqueInstance == null) {
          uniqueInstance = new Singleton();
        }
      }
    }
    return uniqueInstance;
  }
}
```

- `volatile` 키워드를 사용하면 멀티스레딩을 쓰더라도 uniqueInstance변수가 Singleton 인스턴스로 초기화되는 과정이 올바르게 진행됩니다

- 주의!
  - DCL은 자바 1.4이전 버전에서는 쓸 수 없습니다
  - 자바 5보다 낮은 버전의 JVM을 써야만 한다면 다른 방식으로 싱글턴을 구현해야 합니다

## 문제를 해결하는 적절한 방법 선택하기

- getInstance() 메소드를 동기화하는 방법
  - 항상 올바른 결과가 나온다
  - 초콜릿 보일러의 경우에는 속도 문제가 그리 중요하지 않으므로 이 방법을 써도 괜찮다
- 인스턴스를 시작하자마자 만드는 방법
  - 어차피 초콜릿 보일러의 인스턴스는 항상 필요하기 때문에 정적으로 초기화하는 것도 괜찮은 방법이다
- DCL을 쓰는 방법
  - 속도 문제가 그리 중요하지 않은 상황이기에 굳이 DCL을 쓸 필요까지는 없을 듯하다
  - 그리고 반드시 자바 5이상 버전에서 쓸 수 있다는 점도 고려해야 한다

## 무엇이든 물어보세요

- 싱글턴은 간단하지만 문제점이 있을 수 있다
- static으로 선언된 클래스를 사용해도 되지만 여러 클래스가 얽혀있다면 지저분해지고
  - 초기화 순서 문제로 찾아내기 어려운 버그가 생길 수도 있다
  - 가급적 사용하지 않는 것이 좋다
- 자바에서 싱글턴을 사용하는 경우 리플렉션, 직렬화, 역직렬화 문제도 있을 수 있다
- 싱글턴은 느슨한 결합 원칙에 위배되지 않나요? Singleton에 의존하는 객체는 전부 하나의 객체에 단단하게 결합된다
- 클래스는 1가지 일만 해야한다. 싱글턴을 사용하면 그런 개념에서 벗어난다
  - 싱글턴 - 자신의 인스턴스를 관리하는 일 + 그 인스턴스를 사용하고자 하는 목적에 부합하는 작업을 책임
  - 싱글턴에 있는 기능을 별도롤 뽑아내야 한다는 의견도 있다
- 싱글턴의 서브클래스를 만들어도 되는 건가요?
  - 싱글턴의 서브클래스를 만들 때 가장 걸림돌은 생성자가 private으로 선언되어 있다는 점
  - 서브 클래스를 만들려면 똑같은 인스턴스 변수를 공유하게 됨
  - 따라서 서브클래스를 베이스 클래스에서 레지스트리 같은걸 구현해야 함
  - 싱글턴을 확장해서 무엇을 할 것인가?라는 질문에 답할 수 있어야 함
  - 싱글턴은 라이브러리에 넣을 수 있는 형태의 해법이 아니며, 기존 클래스에 있던 코드를 싱글턴 클래스에 넣기 쉽다
- 애플리케이션을 만들 때 싱글턴을 꽤 많이 사용했다면 전ㅂ나적인 디자인을 다시 한번 생각해 봐야 합니다
  - 싱글턴은 특수한 상황에서 제한된 용도로 사용하려고 만들어진 것이기 때문
- 전역변수(static) vs 싱글턴
  - 게으른 인스턴스화

## Enum

- 동기화, 클래스로딩, 리플렉션, 직렬화 등의 문제는 enum으로 싱글턴을 생성해서 해결할 수 있음

```java
public enum Singleton {
  UNIQUE_INSTANCE;
}

public class SingletonClient {
  public static void main (string[] args) {
    Singleton singleton = Singleton.UNIQUE_INSTANCE;
  }
}
```

- java의 enum은 JVM에서 하나만 존재하는 것을 보장함

## 디자인 도구 상자 안에 들어가야 할 도구들

### 객체지향 원칙

- 바뀌는 부분은 캡슐화한다
- 상속보다는 구성을 활용한다
- 구현보다는 인터페이스에 맞춰서 프로그래밍한다
- 상호작용하는 객체 사이에서는 가능하면 느슨한 결합을 사용해야 한다
- 클래스는 확장에는 열려 있어야 하지만 변경에는 닫혀 있어야 한다(OCP)
- 추상화된 것에 의존하게 만들고
  구상 클래스에 의존하지 않게 만든다

### 객체지향 기초

- 추상화
- 캡슐화
- 다형성
- 상속

### 객체 지향 패턴

- 전략 패턴
- 옵저버 패턴
- 데코레이터 패턴
- 추상 팩토리 패턴
- 팩토리 메소드 패턴
- 싱글턴 패턴

## 핵심 정리

- 어떤 클래스에 싱글턴 패턴을 적용하면 그 클래스의 인스턴스가 1개만 있도록 할 수 있도록 할 수 있습니다
- 싱글턴 패턴을 사용하면 하나뿐인 인스턴스를 어디서든 접근 할 수 있도록 할 수 있습니다
- 자바에서 싱글턴 패턴을 구현할 때는 private 생성자와 정적 메소드, 정적 변수를 사용합니다
- 멀티 스레드를 사용하는 애플리케이션에는 속도와 자원 문제를 파악해 보고 적절한 구현법을 사용해야 합니다
  - 사실 모든 애플리케이션에서 멀티스레딩을 쓸 수 있다고 생각해야 합니다
- DCL을 써서 구현하면 자바 5이전에 나온 버전에서는 스레드 관련 문제가 생길 수 있습니다
- 클래스 로더가 여러 개 있으면 싱글턴이 제대로 작동하지 않고, 여러 개의 인스턴스가 생길 수 있습니다
- 자바의 enum을 쓰면 간단하게 싱글턴을 구현할 수 있습니다

## 낱말 퀴즈
