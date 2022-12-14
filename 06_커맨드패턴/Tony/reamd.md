# 6. 커맨드 패턴 - 호출 캡슐화 하기

- 캡슐화를 더 높은 수준으로 끌어올려보자
  - 메소드 호출을 캡슐화

## 만능 IOT 리모컨

## 협력 업체 클래스 살펴보기

- 각 기기마다 인터페이스가 다르다
- 만능 리모컨에 어떻게 통합할 수 있을까?

## 사무실 옆자리에서 들려온 이야기

- 리모컨이 협력 업체가 제공한 클래스를 자세하게 알 필요가 없도록 만들면 되지 않을까?
- 커맨드 패턴
  - 요청하는 쪽과 그 작업을 처리하는 쪽을 분리
- 커맨드 객체(command object)를 추가

## 커맨드 패턴 소개

- 객체 마을 식당
  - 고객
  - 웨이트리스
  - 주문
  - 주방장

### 음식 주문 과정

- 1. 고객이 종업원에게 주문을 합니다
  - createOrder()
- 2. 종업원은 주문을 받아서 카운터에 전달하고 "주문 들어왔어요!"라고 얘기합니다
  - takeOrder()
  - orderUp()
    - makeBurger() 같은 것들을 지시합니다
- 3. 주방장이 주문대로 음식을 주문합니다
  - makeBurger()
  - makeShake()

## 객체마을 식당 등장인물의 역할

### 주문서는 주문 내용을 캡슐화합니다

- 주문서 : 주문 내용을 요구하는 객체
- orderUp() 메소드가 들어 있음

### 종업원은 주문서를 받고 orderUp() 메소드를 호출합니다

### 주방장은 식사를 준비하는데 필요한 정보를 가지고 있습니다

## 객체마을 식당과 커맨드 패턴

#### 1. 클라이언트 - createCommandObject()

- 클라이언트는 커맨드 객체를 생성
  - 커맨드 객체는 리시버에 전달할 일련의 행동으로 구성된다

#### 2. 커맨드 - execute()

- 커맨드 객체에는 행동과 리시버의 정보가 같이 들어있습니다
  - action1()
  - action2()

```ts
class Command {
  // ...
  execute() {
    receiver.action1();
    receiver.action2();
  }
}
```

- 커맨드 객체에서 제공하는 메소드는 execute() 하나뿐입니다
- execute()
  - 행동 캡슐화
  - 리시버에 있는 특정 행동을 처리

#### 3. 인보커 - setCommand()

- 인보커
- 클라이언트는 인보커(Invoker) 객체의 setCommand() 메소드를 호출하는데, 이때 커맨드 객체를 넘겨줍니다.
- 그 커맨드 객체는 나중에 쓰이기 전까지 인보커 객체에 보관됩니다
- 리모컨

#### 4. 커맨드 - execute()

- 인보커에서 커맨드 객체의 execute() 메소드를 호출하면

#### 5. 리시버 - action1(), action2()

- 각 기기

#### 인보커 로딩

1. 클라이언트에서 커맨드 객체 생성
2. setCommand()를 호출해서 인보커에 커맨드 객체를 저장
3. 나중에 클라이언트에서 인보커에게 그 명령을 실행하라고 요청

## 첫 번째 커맨드 객체 만들기

## 커맨드 객체 사용하기

## 쓰면서 제대로 공부하기

## 커맨드 패턴의 정의

- 커맨드 패턴을 사용하면 요청 내역을 객체로 캡슐화해서 객체를 서로 다른 요청 내역에 따라 매개변수화할 수 있습니다
- 이러면 요청을 큐에 저장하거나 로그로 기록하거나 작업 취소 기능을 사용할 수 있습니다

## 커맨드 객체는 일련의 행동을 특정 리시버와 연결함으로써 요청을 캡슐화한 것

- 행동과 리시버를 한 객체에 넣고, execute()라는 메소드 하나만 외부에 공개하는 방법을 써야 합니다
- 이 메소드 호출에 따라 리시버에서 일련의 작업을 처리합니다
- 밖에서 볼 때는 어떤 객체가 리시버 역할을 하는지, 그 리시버가 어떤 일을 하는지 알 수 없습니다
  - 그냥 execute() 메소드를 호출하면 해당 요청이 처리된다는 사실만 알 수 있습니다.
- 명령으로 객체를 매개변수화하는 사례를 공부했었습니다

  - 리모컨 예제
    - 조명켜기
    - 차고 문 열기
  - 리모컨은 인터페이스만 구현되어 있다면 그 커맨드 객체에서 실제로 어떤 일을 하는지 신경 쓸 필요가 없습니다

- 커맨드 객체를 써서 큐와 로그를 구현하거나 작업 취소를 하는 방법은 배우지 못했습니다
  - 기본적인 커맨드 패턴을 조금만 확장하면 됨
- 메타 커맨드 패턴(Meta Command Pattern)도 그리 어렵지 않게 구현할 수 있습니다
  - 여러 개의 명령을 매크로로 한번에 실행할 수 있습니다

## 커맨드 패턴 클래스 다이어그램 살펴보기

## 리모컨 슬롯에 명령 할당하기

## 리모컨 코드 만들기

## API 문서 만들기

## 작업 취소 기능 추가하기

- Command에 undo() 메소드를 추가하고
- 각 구현 Command에서 undo를 구현한다

## 여러 동작을 한 번에 처리하기

- 매크로
- Command[] 상태를 만들고 commands.forEach((command) => command.execute());

## 커맨드 패턴 활용하기

- 커맨드로 컴퓨테이션의 한 부분을 패키지로 묶어서 일급 객체 형태로 전달할 수도 있습니다
- 그러면 클라이언트에서 커맨드 객체를 생성한 뒤 오랜 시간이 지나도 그 컴퓨테이션을 호출할 수 있습니다
- 이점을 활용해서 커맨드 패턴을 스케줄러나 스레드 풀, 작업 큐와 같은 다양한 작업에 적용할 수 있습니다

## 커맨드 패턴 더 활용하기

- 모든 행동을 기록해 두었다가 애플리케이션이 다운되었을 때 그 행동을 다시 호출해서 복구할 수 있어야 합니다
- 로그 기록 - 실행 히스토리 기록

## 디자인 도구상자 안에 들어가야 할 도구들

### 객체 지향 원칙

- 바뀌는 부분은 캡슐화한다
- 상속보다는 구성을 활용한다
- 구현보다는 인터페이스에 맞춰서 프로그래밍한다
- 상호작용하는 객체 사이에서는 가능하면 느슨한 결합을 사용해야 한다
- 클래스 확장에는 열려 있어야 하지만 변경에는 닫혀 있어야 한다(OCP)
- 추상화된 것에 의존하게 만들고 구상 클래스에 의존하지 않게 만든다

### 객체 지향 기초

- 추상화
- 캡슐화
- 다형성
- 상속

### 객체지향 패턴

- 전략 패턴
- 옵저버 패턴
- 데코레이터 패턴
- 팩토리 패턴
- 싱글턴 패턴
- 커맨드 패턴
  - 요청 내역을 객체로 캡슐화해서 객체를 서로 다른 요청 내역에 따라 매개변수화할 수 있습니다
  - 이러면 요청을 큐에 저장하거나 로그로 기록하거나 작업 취소 기능을 사용할 수 있습니다

## 핵심 정리

- 커맨드 패턴을 사용하면 요청하는 객체와 요청을 수행하는 객체를 분리할 수 있습니다
- 이렇게 분리하는 과정의 중심에는 커맨드 객체가 있으며, 이 객체가 행동이 들어있는 리시버를 캡슐화합니다
- 인보커는 무언가 요청할 때 커맨드 객체의 execute() 메소드를 호출하면 됩니다
  - execute() 메소드는 리시버에 있는 행동을 호출합니다
- 커맨드는 인보커를 매개변수화할 수 있습니다
  - 실행 중에 동적으로 매개변수화를 설정할 수도 있습니다
- execute() 메소드가 마지막으로 호출되기 전의 상태로 되돌리는 작업 취소 메소드를 구현하면 커맨드 패턴으로 작업 취소 기능을 구현할 수도 있습니다
- 매크로 커맨드는 커맨드를 확장해서 여러 개의 커맨드를 한 번에 호출할 수 있게 해 주는 가장 간편한 방법입니다
  - 매크로 커맨드로도 어렵지 않게 작업 취소 기능을 구현할 수 있습니다
- 프로그래밍을 하다 보면 요청을 스스로 처리하는 '스마트' 커맨드 객체를 사용하는 경우도 종종있습니다
- 커맨드 패턴을 활용해서 로그 및 트랜잭션 시스템을 구현할 수 있습니다
