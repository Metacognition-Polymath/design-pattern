# 02. 객체들에게 연락 돌리기 - 옵저버 패턴

- 뭔가 재미있는 일이 생겼을 때 모르고 지나치면 슬프겠죠?
  - 뭔가 중요한 일이 일어났을 때 객체에게 새 소식을 알려줄 수 있는 패턴 => 옵저버 패턴
- 옵저버 패턴

  - 자주 사용되는 패턴! 엄청나게 쓸모 있음!
  - 1:N 관계?
  - 느슨한 결합?

- 이번장 컨셉
  - Weather-O-Rama(회사)의 차세대 `인터넷 기반 기상 스테이션 구축` 프로젝트
- 업무 계약 체결서
  - 차세대 인터넷 기반 기상 스테이션 구축 프로젝트
  - 기상 스테이션
    - WeatherData 객체를 바탕으로 만들어질 예정
    - 이 객체를 바탕으로 3개 항목을 화면에 표시하는 애플리케이션을 만들어주세요
    - 화면에 표시할 3개 항목
      - 현재 조건
      - 기상 통계
      - 기상 예보
    - 위 항목들은 모두 WeatherData 객체에서 최신 측정치를 수집할 때 마다 실시간으로 갱신 됨
  - 확장 가능해야 함 - 다른 개발자가 직접 날씨 디스플레이를 만들어서 넣을 수 있어야 함

## 기상 모니터링 애플리케이션 알아보기

- 만들거나 확장해야 하는 부분을 전부 파악하기
  - 기상 스테이션 : 실제 기상 정보를 수집하는 물리 장비 - 습도센서, 온도센서, 기압센서
  - WeatherData 객체 : 기상 스테이션으로 부터 오는 정보를 추적하는 객체
    - WeatherData 객체와 디스플레이를 통합하는 작업도 함
  - 사용자에게 현재 기상 조건을 보여주는 디스플레이 장비
    - 현재 조건, 기상 통계, 기상 예보 중에서 원하는 내용을 선택해서 표시할 수 있음

## WeatherData 클래스 살펴보기

```ts
class WeatherData {
  getTemperature() {
    // ...
  }
  getHumidity() {
    // ...
  }
  getPressure() {
    // ...
  }
  measurementsChanged() {
    //...
  }
}
```

- 가장 최근에 측정된 온도, 습도, 기압 값을 리턴하는 메소드
- 기상 스테이션에서 갱신된 정보를 가져오는 일은 WeatherData객체가 알아서 해줌
- 갱신된 값을 가져올 때마다 measurementsChanged() 메소드가 호출된다

## 구현 목표

- WeatherData 클래스에서는 3가지 측정값(온도, 습도, 기압)의 게터 메소드가 있다
- 새로운 기상 측정 데이터가 들어올 때 마다 measurementsChanged() 메소드가 호출된다
- 기상 데이터를 사용하는 디스플레이 요소 3가지를 구현해야 한다
  - 현재 조건 디스플레이
    - 온도
    - 습도
    - 기압
  - 기상 통계 디스플레이
    - 평균 기운
    - 최저 기온
    - 최고 기온
  - 기상 예보 디스플레이
    - (기상 예보)
- 디스플레이를 업데이트하도록 measurementsChanged() 메소드에 코드를 추가해야 한다

### 추가 목표

- 미래를 생각해보자(확장 가능성, 변화)
- 확장성
  - 디스플레이 요소를 더하거나 뺄 수 있게 해주는 것

## 기상 스테이션용 코드 추가하기

- 쓰면서 제대로 공부하기
  - 현재까지 코드 설명
    - 인터페이스가 아닌 구체적인 구현을 바탕으로 코딩
    - 새로운 디스플레이 항목이 추가될 때마다 코드를 변경해야 함
    - 실행 중에 디스플레이 항목을 추가하거나 제거할 수 없음
    - 바뀌는 부분을 캡슐화하지 않음

## 원칙적으로 추가 코드 살펴보기

```ts
class WeatherData {
  // ...

  measurementsChanged() {
    const temp = this.getTemperature();
    const humidity = this.getHumidity();
    const pressure = this.getPressure();

    // 구체적인 구현에 맞춰서 코딩했으므로 디스플레이 항목을 추가하거나 제거할 수 없음
    this.conditionDisplay.update(temp, humidity, pressure); // 바뀔 수 있는 부분 => 캡슐화 필요
    this.statisticsDisplay.update(temp, humidity, pressure); // 바뀔 수 있는 부분 => 캡슐화 필요
    this.forecastDisplay.update(temp, humidity, pressure); // 바뀔 수 있는 부분 => 캡슐화 필요
  }
}
```

- 실행 중에 디스플레이를 더하거나 빼려면 어떻게 해야 할까요?
- update() 메소드를 공통적으로 가지고 있는 것으로 봐서 공통된 인터페이스를 사용하고 있는 것 같네요

- 2장 제목인 옵저버 패턴을 먼저 알아본 다음 모니터링 애플리케이션에 적용해봅시다 !

## 옵저버 패턴 이해하기

- 신문이나 잡지 구독 예시

  - 신문사가 신문을 발행
  - 독자가 특정 신문사에 구독 신청
    - 매번 새로운 신문이 나올 때 마다 배달을 받을 수 있음
  - 신문을 더 이상 보고 싶지 않으면 구독 해지 신청을 함

- 신문사(subject) + 구독자(observer) = 옵저버 패턴

- Subject : 주제 객체
  - 주제에서 중요한 데이터를 관리
  - 주제 데이터가 바뀌면 옵저버에게 그 소식이 전해짐
  - 데이터가 바뀌면 새로운 데이터 값이 어떤 방법으로든 옵저버에게 전달 됨
- Observer : 옵저버 객체
  - 주제(Subject)를 구독하고 있으며(주제 객체에 등록되어 있으며),
  - 주제 데이터가 바뀌면 갱신 내용을 전달 받습니다

## 옵저버 패턴의 작동 원리

- 구독 요청 : 바뀔 때 마다 전달 받음
- 구독 해제 : 바뀌어도 전달 받지 못 함

## 옵저버와 주제

> [자바스크립트로 옵저버패턴 흉내내기](https://stitchcoding.tistory.com/m/39)

## 옵저버 패턴의 정의

- 한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체에게 연락이 가고 자동으로 내용이 갱신되는 방식

  - 일대다(one-to-many) 관계

- 옵저버 패턴은 여러 방법으로 구현할 수 있지만,
  - 보통은 주제 인터페이스와 옵저버 인터페이스가 들어있는 클래스 디자인으로 구현합니다

## 옵저버 패턴의 구조

```ts
interface Subject {
  registerObserver(): void;
  removeObserver(): void;
  notifyObserver(): void;
}
```

- 주제를 나타내는 Subject 인터페이스
- 객체에서 옵저버로 등록하거나 옵저버 목록에서 탈퇴하고 싶을 때는 이 인터페이스에 있는 메소드를 사용합니다

```ts
interface Observer {
  update(): void;
}
```

- 옵저버가 될 가능성이 있는 객체는 반드시 Observer 인터페이스를 구현해야 함
- 나) 노티를 받는 입장 - 옵저버 안에 Subject가 composition으로 있어야 될 것 같다

```ts
class ConcreteSubject implements Subject {
  registerObserver() {
    // ...
  }
  removeObserver() {
    // ...
  }
  notifyObserver() {
    // ...
  }

  getState() {
    // ...
  }
  setState() {
    // ...
  }
}
```

- 주제 역할을 하는 구상 클래스에는 항상 Subject 인터페이스를 구현해야 한다
- 주제 클래스
  - Subject
    - 등록 메서드
    - 해지 메서드
    - 알림 메서드 : 상태가 바뀔 때 마다 모든 옵저버에게 연락
  - 상태
    - 상태를 설정하고 알아내는 getter/ setter가 있을 수 있음

```ts
class ConcreteObserver implements Observer {
  update() {}
}
```

- Observer 인터페이스를 구현
- 각 옵저버는 특정 주제(Subject)에 등록해서 연락받을 수 있음

## 무엇이든 물어보세요

#### 1. 일대다 관계

- 주제가 상태를 저장하고 제어 ~ Redux의 store
  - 상태가 들어있는 객체는 `하나`만 있을 수 있음
- 반면에 옵저버는 상태를 사용하지만 반드시 소유할 필요는 없습니다
  - 옵저버는 `여러개`가 있을 수 있다.(의존적)

#### 2. 의존성

- 데이터의 주인은 주제(Subject)
- 옵저버는 데이터가 변경되었을 때 주제에서 갱신해 주기를 기다리는 입장이기에 의존성을 가진다고 할 수 있음

#### 3. 출판-구독(Publish-Subscribe) 패턴도 옵저버 패턴의 다른 이름인가요?

- 출판-구독 패턴은 구독자가 서로 다른 유형의 메시지에 관심을 가질 수 있고,
- 출판사와 구독자를 더 세세하게 분리할 수 있는 복잡한 패턴입니다
- 미들웨어 시스템에서 종종 쓰입니다
- 찾아본 글 링크
  - https://jistol.github.io/software%20engineering/2018/04/11/observer-pubsub-pattern/
    - 옵저버 : 동기
    - 펍섭 : 비동기
  - https://velog.io/@minsuk/Publish-Subscribe-%ED%8C%A8%ED%84%B4%EC%95%8C%EB%A6%BC

## 스승과 제자

- 느슨한 결합
  - 서로 의존한 정도가 약한 것
  - 단단한 바구니 보다 유연한 바구니가 덜 부서진다

## 느슨한 결합의 위력

- 느슨한 결합 : 객체들이 상호작용할 수는 있지만, 서로를 잘 모르는 관계
  - 옵저버 패턴은 느슨한 결합을 보여주는 훌륭한 예입니다
- 주제는 옵저버가 특정 인터페이스(Observer 인터페이스)를 구현한다는 사실만 압니다
  - 옵저버의 구상 클래스가 무엇인지, 옵저버가 무엇을 하는지 알 필요도 없습니다
    - 옵저버의 특정 메서드만 호출
    - redux -> action만 알고 action에 대응되는 변화만 알려줌
- 옵저버는 언제든지 새로 추가할 수 있습니다
- 새로운 형식의 옵저버를 추가할 때도 주제를 변경할 필요가 전혀 없습니다
  - 나) 인터페이스로 연결하는 것이 느슨한 결합인 것 같다
    - 타입 에러나는 것을 인터페이스를 만들고 상속을 받은 것으로 구현해서 연결하면 잡을 수 있을 것 같다
- 주제와 옵저버는 서로 독립적으로 재사용할 수 있습니다
- 주제나 옵저버가 달라져도 서로에게 연향을 미치지는 않습니다

### 디자인 원칙 : 상호작용하는 객체 사이에는 가능하면 느슨한 결합을 사용해야 한다

- 느슨하게 결합하는 디자인을 사용하면 변경사항이 생겨도
  무난히 처리할 수 있는 유연한 객체지향 시스템을 구축할 수 있습니다.
  객체 사이의 상호 의존성을 최소화 할 수 있기 때문이죠

## 사무실 옆자리에서 들려온 이야기

- 옵저버 패턴
- 일대다(one-to-many) 의존성

## 기상 스테이션 설계하기

## 기상 스테이션 구현하기

## 디스플레이 요소 구현하기

## 기상 스테이션 테스트

## 방구석 토크

## 개인적인 생각

- 옵저버는 업데이트 + 보여주기 밖에 없다
- 그래서 옵저버엔 로컬 필드가 필요 없을 것 같다는 생각이 들지만
- 만약 옵저버에 상태를 없애버리면 Subject에 의존적이 된다
- 그래서 Subject에서 상태가 있지만 Observer의 update를 통해 옵저버 상태도 같이 업데이트를 해주게 되고
- 옵저버의 업데이트가 실행되면 업데이트 메서드 안에 있는 display가 실행되면서 옵저버에서도 상태가 변했다는 것을 보여주게 된다

## 라이브러리 속 옵저버 패턴 알아보기

- java 관련 내용

## 인생을 바꿀 애플리 케이션

- java 관련 내용

## 코딩 심화학습

- java 관련 내용

## 무엇이든 물어보세요

### 푸시를 풀로 바꾸는 건 정말 좋은 생각입니다

- 지금 만들어 놓은 WeatherData 디자인은 하나의 데이터만 갱신해도 되는 상황에서도 update() 메소드에 모든 데이터를 보내도록 되어 있습니다
- 나중에 Weather-O-Rama에서 풍속 같은 새로운 데이터 값을 추가한다면 어떨까요?
  - 대부분 update() 메소드에서 풍속 데이터를 쓰지 않더라도 모든 디스플레이에 있는 update 메소드를 바꿔야 하지 않을까요?
- 옵저버로 데이터를 보내는 push를 사용하거나 옵저버가 주제로부터 데이터를 당겨오는 pull을 사용하는 방법 중 어느 하나를 선택하는 일은 구현 방법의 문제라고 볼 수 있습니다
  - push : Subject -> Observer
  - pull : Observer <- Subject
- 하지만 대체로 옵저버가 필요한 데이터를 골라서 가져가도록 만드는 방법이 더 좋습니다
- 옵저버가 필요한 데이터를 당겨올 수 있도록 수정
  - 주제가 자신의 데이터에 관한 게터 메소드를 가지게 만들고
  - 필요한 데이터를 당겨올 때 해당 메소드를 호출할 수 있도록 옵저버를 고쳐주면 됩니다

## 풀 방식으로 코드 바꾸기

- 옵저버가 필요할 때 마다 주제로부터 데이터를 당겨오도록 해보자
  - 기존 : update()를 호출하면 옵저버에 새로운 온도, 습도, 기압 데이터를 보냄
  - 변경 : 필요할 때 마다 주제로 부터 데이터를 당겨오도록 함

### 주제에서 알림 보내기

- Observer의 update메서드 파라미터를 없애고 weatherData의 게터를 이용해서 가져옴

## 코드 자석

## 업데이트한 기상 스테이션 코드 테스트

## 디자인 도구상자 안에 들어가야 할 도구들

### 객체지향 기초

- 추상화
- 캡슐화
- 다형성
- 상속

### 객체지향 원칙

- 바뀌는 부분은 캡슐화한다
- 상속보다는 구성을 활용한다
- 구현보다는 인터페이스에 맞춰서 프로그래밍한다
- _상호작용하는 객체 사이에서는 가능하면 느슨한 결합을 사용해야 한다._

### 객체지향 패턴

- 전략 패턴
- _옵저버 패턴_
  - 한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체에게 연락이가고
    자동으로 내용이 갱신되는 방식으로 일대다(one-to-many) 의존성을 정의합니다
  - 어떤 객체의 상태를 느슨하게 결합된 다른 객체에 전달하는 패턴
  - 12장 MVC를 배울 때 마저 배워보자 !

### 핵심 정리

- 옵저버 패턴은 객체들 사이에 일대다 관계를 정의
- 주제는 동일한 인터페이스를 써서 옵저버에게 연락
- Observer 인터페이스를 구현하기만 하면 어떤 구상 클래스의 옵저버라도 패턴에 참여할 수 있음
- 주제는 옵저버들이 Observer 인터페이스를 구현한다는 것을 제외하면 옵저버에 관해 전혀 모름
  - 느슨한 결합
- 옵저버 패턴을 사용하면 주제가 데이터를 보내거나(푸시방식) 옵저버가 데이터를 가져올(풀 방식) 수 있습니다
  - 일반적으로 풀 방식이 더 옳은 방식이라 간주합니다
- 옵저버 패턴은 여러 개의 주제와 메세지 유형이 있는 복잡한 상황에서 사용하는 `출판-구독` 패턴과 `친척`입니다
- 옵저버 패턴은 자주 쓰이는 팬턴으로 모델-뷰-컨트롤러(MVC)를 배울 때 다시 만날 수 있습니다

## 디자인 원칙 경시대회

- 각 디자인 원칙을 보고, 옵저버 패턴에서 어떤 식으로 쓰이는지 설명

### 애플리케이션에서 달라지는 부분을 찾아내고, 달라지지 않는 부분과 분리한다

- 옵저버 패턴에서 변하는 것
  - 주제의 상태
  - 옵저버의 개수, 형식
- 옵저버 패턴에서는 주제를 바꾸지 않고도 주제의 상태에 의존하는 객체들을 바꿀 수 있습니다
- 나중에 바뀔 것을 대비해 두면 편하게 작업할 수 있음

### 구현보다는 인터페이스에 맞춰서 프로그래밍한다

- 주제와 옵저버에서 모두 인터페이스를 사용
- 주제

  - Subject 인터페이스

- 옵저버

  - Observer 인터페이스

- 느슨한 결합
  - 구현하는 객체들의 등록과 탈퇴를 관리하고, 그런 객체들에게 연락을 돌림

### 상속보다는 구성을 활용한다

- 구성을 활용해서 옵저버들을 관리
  - Subject의 register로 등록된 Observer들
- 주제와 옵저버 사이의 관계는 상속이 아니라 구성으로 이루어짐

## 낱말 퀴즈
