# 10. 상태 패턴 - 객체의 상태 바꾸기

- 전략 패턴과 상태 패턴은 쌍둥이입니다(객체가 행동을 바꿀 수 있게 함)
  - 전략 패턴 : 알고리즘을 변경
  - 상태 패턴 : 내부 상태를 변경
- 설계는 거의 같지만 그 용도가 다를 수 있다. 알아보자!

## 최첨단 뽑기 기계

- 뽑기 기계에 소프트웨어를 추가
  - 재고 조사 등 데이터 수집용

### 상태 다이어 그램

- `동전 없음`

  - 동전 투입 -> 동전 있음

- `동전 있음`

  - 동전 반환 -> 동전 업음
  - 손잡이 돌림 -> 알맹이 판매

- `알맹이 판매`

  - 알맹이 내보냄
    - 알맹이 > 0 -> 동전 없음
    - 알맹이 = 0 -> 알맹이 매진

- `알맹이 매진`

## 사무실 옆자리에서 들려온 이야기

- `상태` : 기계가 어떤 식으로 설정되어 있는지를 나타냄

  - 동전 없음
  - 동전 있음
  - 알맹이 판매

- 행동 : 다른 상태로 넘어가는 전환 종류
  - 동전 투입
  - 동전 반환
  - 손잡이 돌림
  - 알맹이 내보냄
    - 알맹이 > 0
    - 알맹이 = 0

## 상태 기계 기초 지식 알아보기

### 상태 기계를 구현하는 방법을 살펴보자

1. 상태들을 모아보자

   - 동전 없음
   - 동전 있음
   - 알맹이 매진
   - 알맹이 판매

2. 현재 상태를 저장하는 인스턴스 변수를 만들고 각 상태의 값을 정의합니다.

```java
final static int SOLD_OUT = 0;
final static int NO_QUARTER = 1;
final static int HAS_QUARTER = 2;
final static int SOLD = 3;

int state = SOLD_OUT;
```

- enum을 사용하면 더 좋을 것 같다

```ts
// Typescript enum을 사용해서 상태를 정의
enum State {
  SOLD_OUT = 0,
  NO_QUARTER = 1,
  HAS_QUARTER = 2,
  SOLD = 3,
}

let state = State.SOLD_OUT;
```

3. 이 시스템에서 일어날 수 있는 모든 행동을 모아 봅니다
   - 동전 투입
   - 동전 반환
   - 손잡이 돌림
   - 알맹이 내보냄

- 여기에 있는 행동들은 뽑기 기계의 인터페이스라고 할 수 있습니다

4. 이제 상태 기계 역할을 하는 클래스를 만들어보자

- 각 행동을 구현할 때는 조건문을 써서 상태별로 어떤 작업을 처리해야 할지 결정합니다
- 예를 들어, '동전 투입' 행동은 다음과 같은 메소드로 처리할 수 있다

```ts
const insertQuarter = () => {
  if (state === State.SOLD_OUT) {
    console.log("매진되었습니다. 다음 기회에 이용해주세요.");
  } else if (state === State.NO_QUARTER) {
    console.log("동전이 투입되었습니다.");
    state = State.HAS_QUARTER;
  } else if (state === State.HAS_QUARTER) {
    console.log("동전은 한 개만 넣어주세요.");
  } else if (state === State.SOLD) {
    console.log("알맹이를 내보내고 있습니다.");
  }
};
```

- 상태 기계를 구현할 때 이런 기법을 많이 사용합니다.
- 상태값을 저장하는 인스턴스 변수를 만들고, 메소드 내에서 조건문을 써서 다양한 상태를 처리합니다.

## 뽑기 기계 코드 만들기

## 알림! 뽑기 기계 코드 수정 요청

- 10% 확률로 알맹이가 2개 나오도록 수정

## 요청 사항 살펴보기

- 처음에 만들었던 코드는 꽤 훌륭하다고 생각했는데, 새로운 기능을 추가해 달라는 요청을 받고 보니 확장이 어렵겠군요

### 리팩토링

- 바뀌는 부분은 캡슐화한다
- 상태별 행동을 별도의 클래스에 넣어 두고 모든 상태에서 각각 자기가 할 일을 구현하면 어떨까요?
  - 뽑기 기계가 현재 상태를 나타내는 사아태 객체에게 작업을 넘기게 하면 된다
- 구성을 활용하라는 원칙을 적용하는 셈

## 새로운 디자인 구상하기

- 기존 코드를 그대로 활용하는 대신, 상태 객체들을 별도의 코드에 넣고, 어떤 행동이 일어나면 현재 상태 객체에서 필요한 작업을 처리

### 계획 정리

1. 뽑기 기계와 관련된 모든 행동에 관한 메소드가 들어있는 State 인터페이스를 정의해야 합니다
2. 그 다음에는 기계의 모든 상태를 대상으로 상태 클래스를 구현해야 합니다
   - 기계가 어떤 상태에 있다면, 그 상태에 해당하는 상태 클래스가 모든 작업을 책임져야 하죠
3. 마지막으로 조건문 코드를 전부 없애고 상태 클래스에 모든 작업을 위임합니다.

- 기존에 배웠던 디자인 원칙들을 따르면서 `상태 패턴`이라는 새로운 패턴을 구현하게 되었습니다.
- 상태 패턴의 정의는 우선 이 디자인을 코드로 만들어 본 다음 자세히 알아보겠습니다.

## State 인터페이스 및 클래스 정의하기

```ts
// 우선 모든 상태 클래스에서 구현할 State 인터페이스를 만들어 봅시다
interface State {
  insertQuarter(): void;
  ejectQuarter(): void;
  turnCrank(): void;
  dispense(): void;
}

// 디자인에 들어있는 모든 상태를 캡슐화해서 State 인터페이슬 구현하는 클래스를 만듭니다
interface SoldState extends State {
  // ...
}

interface SoldOutState extends State {
  // ...
}

interface NoQuarterState extends State {
  // ...
}

interface HasQuarterState extends State {
  // ...
}

// 당첨을 나타내는 상태는 새로운 디자인에 맞게 다시 구현한 후에 생각해보자
```

- 각 상태에 따라 메소드가 호출 되었을 때 무슨일을 해야 하는지 생각해 봐야 합니다

### 각 상태에 따른 행동 정의하기

- NoQuarterState

  - insertQuarter() : HasQuarterState로 전환
  - ejectQuarter() : 동전을 넣어 달라는 메세지를 출력
  - turnCrank() : 손잡이를 돌렸지만 동전이 없다는 메시지를 출력
  - dispense() : 동전을 넣어야 한다는 메시지를 출력

- HasQuarterState

  - insertQuarter() : 동전을 두 개 넣을 수는 없다는 메시지를 출력
  - ejectQuarter() : 동전을 반환하고 NoQuarterState로 전환
  - turnCrank() : SoldState로 전환
  - dispense() : 알맹이가 나가지 않았다는 메시지를 출력

- SoldState

  - insertQuarter() : 알맹이를 내보내고 있으니 기다려 달라는 메시지를 출력
  - ejectQuarter() : 이미 손잡이를 돌렸다는 메시지를 출력
  - turnCrank() : 한 번만 돌려 달라는 메시지를 출력
  - dispense() : 알맹이를 하나 내보냄. 이때 알맹이 개수를 확인하고
    - 알맹이 개수가 0보다 크면 NoQuarterState로 전이
    - 알맹이 개수가 0이면 SoldOutState로 전이

- SoldOutState

  - insertQuarter() : 알맹이가 없다는 메세지를 출력
  - ejectQuarter() : 동전을 넣지 않았다는 것을 알림
  - turnCrank() : 알맹이가 없다는 메세지를 출력
  - dispense() : 알맹이가 나가지 않았음을 알림

- WinnerState
  - insertQuarter() : 알맹이를 내보내고 있으니 기다려 달라는 메시지를 출력
  - ejectQuarter() : 이미 손잡이를 돌렸다는 메시지를 출력
  - turnCrank() : 알맹이를 내보내고 있으니 기다려 달라는 메시지를 출력
  - dispense() : 알맹이를 두 개 내보냄.
    - 알맹이 개수가 0보다 크면 NoQuarterState로 전이
    - 알맹이 개수가 0이면 SoldOutState로 전이

## State 클래스 구현하기

- 상태를 구현해보자
- 각 메소드에서 어떤 일을 해야 하는지 정리했으니 코딩만 하면 됩니다
- 전에 만들었던 상태 코드와 거의 비슷하게 만들면 되지만 이번에는 모든 코드가 서로 다른 클래스에 분산됩니다

## 뽑기 기계 코드 수정하기

## 뽑기 기계 전체 코드 살펴보기

## 다른 상태 클래스 구현하기
