# 12. 복합 패턴 - 패턴을 모아 패턴 만들기

## 패턴 섞어 쓰기

- 패턴을 잘 활용하는 방법 가운데 하나는 서로 다른 패턴을 섞어쓰는 것입니다
- 여러 패턴을 함께 사용해서 다양한 디자인 문제를 해결하는 방법을 복합 패턴이라고 부릅니다
- 실전에선 다양한 복합 패턴을 볼 수 있습니다
- 패턴을 몇 개를 결합한다고 해서 무조건 복합 패턴이 되는 것은 아닙니다
- 복합 패턴이라고 불리려면 여러가지 문제의 일반적인 해결법을 제시해야 합니다
- 여러 복합 패턴을 먼저 살펴본 다음, 복합 패턴의 왕이라고 할 수 있는 모델-뷰-컨트롤러(MVC) 패턴을 알아보겠습니다
- 하나의 디자인 문제를 해결하려고 여러 패턴을 함께 사용하는 경우가 종종 있습니다
- 복합 패턴이란 반복적으로 생길 수 있는 일반적인 문제를 해결하는 용도로 2개 이상의 패턴을 결합해서 사용하는 것을 뜻합니다

## 오리 시뮬레이션 게임에 다양한 패턴 적용하기

- 오리 시뮬레이션 게임을 처음부터 다시 만들며서 몇 가지 기능을 추가해 봅시다
- 이 과정에서 하나의 문제를 해결할 때 여러 패턴이 어떻게 공존하고 협력하는지 배울 수 있습니다

### 뇌단련

- 오리를 넣을 수 있는 곳이라면 거위도 넣을 수 있어야 합니다
- 사실 거위들도 소리를 내고 날기도 하고 헤엄도 치는데 시뮬레이션 게임에 넣지 못할 이유가 없죠
- 어떤 패턴을 활용하면 거위와 오리가 잘 어울려 놀 수 있을까요?

### 어댑터 추가하기

- 시뮬레이터는 Quackable 인터페이스를 원하지만, 거위는 quack()이 아닌 honk() 메소드가 들어있습니다

### 꽥꽥학

- 꽥꽥학자들은 오래전 부터 하나의 무리가 몇 번의 꽥꽥 소리를 내는지 연구하고 싶어했습니다
- 오리 클래스는 그대로 두면서 오리가 꽥꽥 소리를 낸 횟수를 세려면 어떤 패턴을 써야 할까요?

### 데코레이터로 감싸기

### 팩토리 메소드

- 오리 객체를 생성하는 작업을 한 군데에서 몰아서 해보자
- 오리를 생성하고 데코레이터로 감싸는 부분을 따로 빼내서 캡슐화해보자

### 추상 팩토리

- 조금 나아지긴 했지만 거위를 만들 때는 여전히 구상 클래스에 의존해서 직접 만들어야 합니다
- 거위를 생성하는 추상 팩토리를 추가해봅시다
- 책에서도 생략 됨

### 오리 무리를 관리하는 기능 - 컴포지트 패턴

- 오리 무리(정확하게 말하자면 Quackable 무리)를 만들어 봅시다
- 객체들로 구성된 컬렉션을 개별 객체와 같은 방식으로 다룰 수 있게 해주는 컴포지트 패턴

### 안전성 vs. 투명성

- 9장에서 컴포지트 패턴을 배웠을 때, 복합 객체(Menu)와 객체(MenuItem)에 똑같은 메소드가 있었습니다.
- 똑같은 메소드를 넣다보니 MenuItem 객체에 사용 되지 않는 add() 메소드도 똑같이 들어있었죠
- 이러면 잎과 복합 객체 사이의 차이점을 투명하게 만들 수 있다는 장점이 있습니다
- 클라이언트는 잎 객체를 다루고 있는지, 아니면 복합 객체를 다루고 있는지를 전혀 신경 쓸 필요가 없죠
- 그냥 무조건 같은 메소드를 호출하면 됩니다
- 여기에서는 복합 객체에서 자식을 관리하는 메소드를 복합 객체에만 넣었습니다
- add() 메소드는 Flock 클래스에만 있죠
- 어차피 오리 객체는 add()에게 아무 쓸모 없는 메소드니까요
- 심지어 아예 오리를 add() 메소드를 호출할 수 없고 오로지 Flock만 호출할 수 있죠
- 이런 디자인은(구성요소에서 어떤 의미도 갖지 못하는 메소드는 아예 호출할 수 없으므로) 더 안전하긴 합니다만,
- 대신 투명성은 떨어집니다
- 클라이언트가 어떤 객체에 Quackable을 추가하려면 그 객체가 Flock인지 아닌지를 확실하게 알고 있어야 하니까요
- 언제나 그렇듯이 객체지향 디자인을 할 때는 장점과 단점을 잘 따져봐야 합니다
- 복합 객체를 만들 때도 상황에 따라서 안정성과 투명성을 적당히 조절해야 합니다

### 14. 옵저버 패턴

- 꽥꽥학자가 개별 오리의 행동을 관찰하고 싶어합니다
- 옵저버 패턴을 적용해서 꽥꽥학자가 개별 오리의 행동을 관찰할 수 있게 해보겠습니다

- 2장과에서는 모든 클래스에 일일이 등록하고, 연락용 메소드를 구현했습니다
- 이번에는 등록 및 연락용 코드를 Observable 클래스에 캡슐화하고, 구성으로 QuackObservable에 포함시키겠습니다
  - 이러면 실제 코드는 한 군데에만 작성해 놓고, QuackObservable이 필요한 작업을 Observable 보조 클래스에 전부 위임하게 만들 수 있습니다

### QuackObservable을 확장한 Quackable에 맞는 Flock

- TODO: 해보기

## 무엇이든 물어보세요

- 여기에서 쓰인 게 복합 패턴인가요?

  - 복합 패턴이라고 할 순 없습니다.
  - 그냥 여러 패턴을 섞어서 썼을 뿐이죠.
  - 복합 패턴은 몇 개의 패턴을 복합적으로 사용해서 일반적인 문제를 해결할 수 있어야 합니다
  - 잠시 후에 모델-뷰-컨트롤러를 살펴볼텐데, 그 패턴은 다양한 디자인 문제를 해결하는 데 적용할 수 있으므로 복합 패턴입니다

- 디자인 패턴의 진정한 매력은 어떤 문제가 닥쳤을 때 패턴을 적용하다 보면 문제가 해결된다는 거죠?
  - 그렇진 않습니다.
  - 오리 시뮬레이션 게임을 만드는 데 여러 가지 패턴을 사용한 이유는 그냥 여러 패턴을 함께 사용할 수 있다는 사실을 보여주려고 했던 것뿐입니다
  - 실전에서 방금까지 했던 방식으로 디자인을 적용하는 일은 없을 것입니다
  - 오리 시뮬레이션 게임에 적용된 패턴 중에는 조금 과하다 싶은 것들도 있었죠
  - 상황에 따라 올바른 객체지향 디자인 원칙을 적용하는 것만으로도 문제가 해결되기도 합니다
  - 이와 관련된 내용은 13장에서 좀 더 알아보겠습니다
  - 일단 지금은 패턴은 반드시 상황에 맞게 써야 한다라는 사실만 기억하세요
  - 이 패턴을 써봐야지라고 생각하고 억지로 패턴을 적용해서는 안 됩니다
  - 방금까지 살펴본 디자인은 상당히 부자연스럽고, 억지스러운 부분이 많다는 사실을 명심합시다
  - 하지만 재밌었지 않았나요? 한 문제를 해결하는 데 여러 패턴을 적용할 수 있다는 사실을 배울 수 있었잖아요?

## 바뀐 내용 되돌아 보기

- 처음에 수 많은 Quackable들이 있었습니다
- 갑자기 거위가 나타나서 자기도 Quackable이 되고 싶다고 했죠
  - 그래서 어댑터 패턴을 써서 Quackable에 맞게 만들어 줬습니다
- 꽥꽥학자들이 등장해서 꽥꽥 소리가 난 횟수를 세고 싶다고 했습니다
  - 그래서 데코레이터 패턴을 적용해서, QuackCounter 데코레이터를 추가하고 quack()이 호출된 회수를 셀 수 있게 만들었습니다
  - quack() 메소드 호출 자체는 그 데코레이터로 싸여 있는 Quackable 객체가 처리합니다
- 하지만 꽥꽥학자들이 QuackCounter로 장식되지 않은 Quackable 객체가 있을까 봐 걱정된다고 하더군요
  - 그래서 추상 팩토리 패턴을 써서 팩토리가 객체를 만들도록 했습니다
  - 오리객체를 만들 때는 항상 팩토리에 요청을 하게 되니까, 팩토리가 데코레이터로 싸여 있는 오리를 리턴하게 해서 문제를 해결했습니다
  - 그리고 데코레이터로 장식되지 않은 오리를 원한다면 다른 팩토리를 쓰면 된다는 것도 기억해 둡시다
- 모든 오리와 거위, Quackable 객체를 관리하기가 힘들어지기 시작했습니다
  - 그래서 컴포지트 패턴을 써서 오리들을 모아서 오리 무리 단위로 관리하기로 했습니다
  - 이 패턴을 사용하면 꽥꽥학자들은 수 많은 오리를 종별로 나눠서 관리할 수도 있습니다
  - 그 패턴을 구현하는 과정에서 반복자를 사용해서 반복자 패턴까지 적용했죠
- 꽥꽥학자들은 Quackable에서 소리르 냈을 때 바로 연락받고 싶어 했습니다
  - 그래서 옵저버 패턴을 써서 Quackologist를 Quackable의 옵저버로 등록했죠
  - 이제 Quackable에서 소리를 낼 때 마다 연락을 받을 수 있습니다
  - 여기에서도 반복자 패턴이 적용되었습니다
  - 옵저버 패턴은 복합 객체 내에서도 전혀 문제 없이 잘 작동했습니다

## 복합 패턴의 왕 알현하기

- MVC는 코드를 기능에 따라 나눠주는 패러다임
- 재사용을 하려면 깔끔하게 나눠 줘야 한다
- 한 쪽에는 모델이, 다른 쪽에는 뷰, 그 사이에는 컨트롤러가 있다
  - 모델 - 컨트롤러 - 뷰
- 모델 객체 : 애플리케이션 존재의 의미

  - 데이터, 놀리 같은 게 전부 들어있는 객체
  - 그 클래스는 애플리케이션의 문제를 해결하는 클래스
  - 어떤 뷰에서도 재사용할 수 있다
  - 뷰가 바뀌어도 모델 객체는 그대로 남는다

- 뷰 객체 : 표시하고 편집하는 컨트롤에는 훌륭한 컨트롤이 가득하다

  - 사용자가 조작할 수 있고, 거의 무엇이든 담을 수 있다
  - 하지만 뷰는 모델을 모른다
  - 그 문자열은 전화번호일 수도 있고 아리스토텔레스의 작품일 수도 있다
  - 연결은 느슨하게 재사용을 최고로 끌어올리자

- 데이터는 모델과 뷰 사이에서 움직인다

  - 컨트롤러는 둘 사이의 중계자
  - 각 계층의 상태가 바뀌면 그 둘의 데이터를 동기화한다
  - 바뀐 값을 부지런히 날라다 준다

### 모델-뷰-컨트롤러의 핵심은 디자인 패턴입니다

- MVC는 여러 패턴을 합쳐놓았다는 사실을 먼저 이해해야 합니다
- 패턴을 바라보는 눈으로 MVC를 공부하다 보면 어느 순간 깨달음을 얻을 겁니다

## 모델-뷰-컨트롤러 알아보기

- iTunes 같은 음악 소프트웨어를 사용하고 있다고 가정해 봅시다.
- 소프트웨어에서 제공하는 인터페이스를 사용해서

  - 새로운 곡을 추가하거나
  - 재생목록을 관리하거나
  - 트랙이름을 바꿀 수 있습니다

- 그 플레이어는 모든 곡의 정보, 그 곡과 관련된 모든 이름과 데이터를 담고 있는 조그만 데이터베이스를 관리합니다
- 곡을 재생하고, 재생하는 동안에 현재 곡 제목, 재생시간과 같은 다양한 정보를 사용자 인터페이스 상에서 갱신해 주는 일도 플레이어에서 처리해주죠
- 플레이어 뒤에서 일을 해 주고 있는 게 모델-뷰-컨트롤러 입니다

- e.g.
  - `사용자`가 인터페이스를 건드리면 그 행동이 `컨트롤러`에게 전달됩니다
    - 새로운 노래 재생
  - `컨트롤러`에서 `모델`을 조작
    - 컨트롤러에서 Player 모델에게 음악 재생을 요청합니다
  - 모델
    - MP3 파일을 관리하고 재생하는 데 필요한 모든 상태, 데이터, 애플리케이션 로직 등은 모델에 들어있습니다
  - 상태 변화 통지
    - 모델은 뷰에게 상태가 변경되었음을 알립니다
  - 뷰 디스플레이 갱신
    - 디스플레이가 생신되는 것을 볼 수 있고, 음악이 재생되는 것을 들을 수 있습니다

## 모델-뷰-컨트롤러 조금 더 알아보기

- 모델, 뷰, 컨트롤러의 관계를 살펴본 다음 디자인 패턴의 관점으로 다시 한번 바라보겠습니다

![](./images/MVC%ED%8C%A8%ED%84%B4.jpeg)

### 뷰

- 모델을 표현하는 방법을 제공합니다
- 일반적으로 화면에 표시할 때 필요한 상태와 데이터는 모델에서 직접 가져옵니다

### 컨트롤러

- 사용자로부터 입력을 받으며 입력받은 내용이 모델에게 어떤 의미가 있는지 파악합니다

### 모델

- 모델에는 모든 데이터, 상태와 애플리케이션 로직이 들어있습니다
- 뷰와 컨트롤러에서 모델의 상태를 조작하거나 가져올 때 필요한 인터페이스를 제공하고,
  - 모델이 자신의 상태 변화를 옵저버들에게 연락해 주긴 하지만,
  - 기본적으로 모델은 뷰와 컨트롤러에 별 관심이 없습니다

### MVC 동작 방식

1. `사용자`는 `뷰`에만 접촉할 수 있습니다

   - 뷰는 모델을 보여주는 창이라고 할 수 있씁니다
   - 자용자가 뷰에서 (재생 버튼을 누른다든가 하는 식으로) 뭔가를 하면 뷰는 무슨 일이 일어났는지 `컨트롤러에게 알려 줍니다`
   - 그러면 컨트롤러가 상황에 맞게 작업을 처리합니다

2. `컨트롤러`가 `모델`에게 `상태를 변경`하라고 요청합니다

   - 컨트롤러는 사용자의 행동을 받아서 해석합니다
   - 사용자가 버튼을 클릭하면 컨트롤러는 그것이 무엇을 의미하는지 해석하고, 모델을 어떤 식으로 조작해야 하는지 결정합니다

3. `컨트롤러`가 `뷰`를 변경해 달라고 요청할 수도 있습니다

   - 컨트롤러는 뷰로부터 어떤 행동을 받았을 때, 그 행동의 결과로 뷰에게 뭔가를 바꿔 달라고 할 수도 있습니다
   - 예를 들어, 컨트롤러는 인터페이스에 있는 어떤 버튼이나 메뉴를 활성화하거나 비활성화할 수 있습니다

4. 상태가 변경되면 `모델`이 `뷰`에게 그 사실을 알립니다

   - 사용자가 한 행동(버튼 클릭 등)이나 다른 내부적인 변화(재생목록에서 다음 곡이 재생되는 것 등) 등으로 모델에서 뭔가가 바뀌면 모델은 뷰에게 상태가 변경되었다고 알립니다

5. `뷰`가 `모델`에게 `상태를 요청`합니다
   - 뷰는 화면에 표시할 `상태를 모델로부터 직접 가져옵니다`
   - 예를 들어, 모델이 뷰에게 새로운 곡이 재생되었다고 알려 주면 뷰는 모델에게 곡 제목을 요청하고,
     - 그것을 받아서 화면에 표시합니다
     - 컨트롤러가 뷰에게 뭔가를 바꾸라고 요청을 했을 때도 뷰는 모델에게 상태를 알려 달라고 요청할 수도 있겠죠

## 무엇이든 물어보세요

- Q1) 컨트롤러가 모델의 옵저버가 되는 경우는 없나요?
- A1) 옵저버가 되는 경우도 있습니다

  - 디자인에 따라 컨트롤러도 모델에 옵저버로 등록하고, 상태가 변경될 때 모델로부터 연락을 받을 수 있습니다
  - 모델에 있는 뭔가에 의해서 사용자 인터페이스 컨트롤이 직접 변경된다면 이렇게 해야겠죠
  - 예를들어,
    - 모델이 있는 어떤 상태에 따라서 인터페이스 항목이 활성화되거나 비활성화되는 경우를 생각할 수 있습니다
    - 그런 경우에는 컨트롤러가 뷰에게 상황에 맞게 화면을 갱신해 달라고 요청합니다

- Q2) 그러면 컨트롤러는 뷰로부터 사용자 입력을 받아 오고 모델에게 보내는 일만 하는 거죠?
  - 그 일밖에 하지 않는다면 왜 굳이 컨트롤러를 쓰는 거죠?
  - 뷰에 그 코드를 넣어도 되잖아요
  - 어차피 컨트롤러가 하는 일이라고는 모델에 있는 메소드를 호출하는 것뿐이잖아요
- A2) 컨트롤러가 그냥 '모델한테 전달하는' 일만 하는 것은 아닙니다
  - 컨트롤러는 사용자가 입력한 내용을 해석해서 모델을 조작하는 임무를 맡고 있습니다
  - 하지만 "왜 뷰에 그런 기능을 바로 넣지 않았을까?"라는 질문을 따로 대답을 해야 할 것 같군요
  - 물론 뷰에 그런 기능을 직접 넣어도 되지만, 2가지 이유로 그렇게 하지 않는 것이 좋습니다
    - 우선 2가지 역할을 하게 되면 뷰 코드가 복잡해진다는 문제가 있죠
      - 사용자 인터페이스도 관리해야 하고, 모델을 제어하는 로직도 처리해야 하니까요
    - 다른 이유로는 뷰를 모델에 너무 밀접하게 연관시켜야 한다는 문제가 있습니다
      - 이러면 뷰를 다른 모델과 연결해서 재사용하기가 아주 힘들어집니다
      - 컨트롤러는 제어로직을 뷰로부터 분리해서 뷰와 모델의 결합을 끊어 주는 역할을 합니다
      - 뷰와 컨트롤러를 느슨하게 결합하면 더 유연하고 확장하기 좋은 디자인을 만들 수 있죠
      - 결국 나중에 뭔가를 바꿔야 할 때도 더 쉽게 바꿀 수 있고요

## 모델-뷰-컨트롤러에 사용되는 패턴 알아보기 - 560p ~ 561p

- MVC를 이해하는 가장 좋은 방법은 MVC를 여러개의 패턴이 함께 적용되어서 완성된 하나의 디자인으로 생각하기입니다
- 모델
  - 옵저버 패턴을 써서 상태가 바뀔 때마다 뷰와 컨트롤러에게 연락합니다
- 뷰와 컨트롤러는 전략 패턴을 사용하죠
- 컨트롤러는 뷰의 행동에 해당하며, 다른 행동이 필요하면 그냥 다른 컨트롤러로 바뀌면 됩니다
- 그리고 뷰 안에는 내부적으로 컴포지트 패턴을 써서 윈도우, 버튼 같은 다양한 구성요소를 관리합니다

### 전략 패턴

- 뷰와 컨트롤러는 고전적인 전략패턴으로 구현되어 있습니다
- 뷰 객체를 여러 전략을 써서 설정할 수 있죠
- 컨트롤러가 전략을 제공하고요
- 뷰는 애플리케이션의 겉모습에만 신경을 쓰고, 인터페이스의 행동을 결정하는 일은 모두 컨트롤러에게 맡깁니다
- 전략 패턴을 사용하면 뷰를 모델로부터 분리하는 데에도 도움이 됩니다
- 사용자가 요청한 내역을 처리하려고 모델과 얘기하는 일을 컨트롤러가 맡고 있으니까요
- 뷰는 그 방법을 전혀 알지 못합니다

### 컴포지트 패턴

- `디스플레이`는 여러 단계로 겹쳐 있는 `윈도우, 패널, 버튼, 텍스트 테이블 등`으로 구성됩니다
- 각 `디스플레이` 항목은 `복합객체(윈도우 등)` 나 `잎(버튼)`이 될 수 있습니다
- `컨트롤러`가 `뷰`에게 `화면을 갱신`해 달라고 요청하면 최상위 뷰 구성 요소에게만 화면을 갱신하라고 얘기하면 됩니다
  - 나머지는 컴포지트 패턴이 알아서 처리해 주죠

### 옵저버 패턴

- `모델`은 `옵저버 패턴`을 써서 상태가 변경되었을 때 그 모델과 연관된 객체들에게 연락합니다
- `옵저버 패턴`을 사용하면 `모델을` `뷰와 컨트롤러로부터 완전히 독립`시킬 수 있습니다
- 한 모델에서 서로 다른 뷰를 사용할 수도 있고, 심지어 여러 개의 뷰를 동시에 사용하는 것도 가능합니다

## 모델-뷰-컨트롤러로 BPM 제어 도구 만들기

- 기획
  - 막대가 튀면서 실시간 BPM을 보여줍니다
  - 현재 BPM이 표시되면 BPM이 바뀌면 표시된 내용도 자동으로 바뀝니다
  - 이 뷰는 모델의 상태를 보여주는과 제어하는 부분 이렇게 2개의 부분으로 구성됩니다
  - BPM을 1을 늘리는 버튼, 줄이는 버튼이 있습니다
  - BPM을 직접 입력할 수 있는 텍스트 필드가 있습니다
  - DJ Control 메뉴에서 start를 선택하면 연주를 시작할 수 있습니다
  - start를 선택해서 연주를 시작하기 전까지는 stop을 선택할 수 없ㅅ브니다
  - stop 을 선택해서 연주를 중지할 수 있습니다
  - 연주가 시작되면 start는 선택할 수 없습니다
  - 모든 사용자의 행동은 컨트롤러로 전달됩니다
  - 모델과 뷰 사이의 컨트롤러
  - 컨트롤러느 뷰와 모델 사잉에 있습니다
  - 사용자가 start를 선택하면 그 입력을 모델이 해야 하는 적절한 행동으로 바꾸는 작업을 처리합니다
  - 컨트롤러는 사용자로부터 받은 입력을 바탕으로 모델에게 적절한 요청을 전달합니다
  - 그 뒤에 떡하니 버티고 있는 모델
    - 모델을 직접 볼 순 없겠지만, 적어도 들을 수는 있습니다
    - 모델은 일찌감치 뒤에서 비트를 조절하고 스피커로 내보내는 작업을 처리합니다

## 모델, 뷰, 컨트롤러 합쳐서 보기

## 모델, 뷰, 컨트롤러 만들기

```java

public interface BeatModelInterface {
    void initialize(); // BeatMode의 인스턴스가 만들어 질 때 호출되는 메소드
    void on(); // 비트 생성기를 켜고 끄는 메소드
    void off(); // 비트 생성기를 켜고 끄는 메소드
    void setBPM(int bpm);// BPM을 설정하는 메소드, 이 메소드가 호출되면 BPM이 바로 바뀝니다
    int getBPM(); // 현재 BPM을 반환하는 메소드, 꺼져있으면 0을 리턴합니다
    // 뷰와 컨트롤러가 상태를 알아내거나 옵저버로 등록할 때 사용하는 메소드 - 시작
    void registerObserver(BeatObserver o); // 연락받을 옵저버와 BPM이 바뀔 때만 연락받을 옵저버, 이렇게 두개의 옵저버를 비트마다 만듭니다
    void removeObserver(BeatObserver o); // 옵저버 등록/해제용 메소드
    void registerObserver(BPMObserver o);
    void removeObserver(BPMObserver o);
    // 뷰와 컨트롤러가 상태를 알아내거나 옵저버로 등록할 때 사용하는 메소드 - 끝
}

```

## 모델 만들기

```java
package headfirst.designpatterns.combined.djview;

import java.util.*;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import java.io.*;
import javax.sound.sampled.Line;

public class BeatModel implements BeatModelInterface, Runnable {
	List<BeatObserver> beatObservers = new ArrayList<BeatObserver>();
	List<BPMObserver> bpmObservers = new ArrayList<BPMObserver>();
	int bpm = 90;
	Thread thread;
	boolean stop = false; // 비트 스레드를 시작하고 멈춥니다
	Clip clip; // 비트용으로 재생하는 오디오 클립

	public void initialize() {
		try {
			File resource = new File("clap.wav");
			clip = (Clip) AudioSystem.getLine(new Line.Info(Clip.class));
			clip.open(AudioSystem.getAudioInputStream(resource));
		}
		catch(Exception ex) {
			System.out.println("Error: Can't load clip");
			System.out.println(ex);
		}
	}

	public void on() {
		bpm = 90;
		//notifyBPMObservers();
		thread = new Thread(this);
		stop = false;
		thread.start();
	}

	public void off() {
		stopBeat();
		stop = true;
	}

	public void run() {
		while (!stop) {
			playBeat();
			notifyBeatObservers();
			try {
				Thread.sleep(60000/getBPM());
			} catch (Exception e) {}
		}
	}

	public void setBPM(int bpm) {
		this.bpm = bpm;
		notifyBPMObservers();
	}

	public int getBPM() {
		return bpm;
	}

	public void registerObserver(BeatObserver o) {
		beatObservers.add(o);
	}

	public void notifyBeatObservers() {
		for(int i = 0; i < beatObservers.size(); i++) {
			BeatObserver observer = (BeatObserver)beatObservers.get(i);
			observer.updateBeat();
		}
	}

	public void registerObserver(BPMObserver o) {
		bpmObservers.add(o);
	}

	public void notifyBPMObservers() {
		for(int i = 0; i < bpmObservers.size(); i++) {
			BPMObserver observer = (BPMObserver)bpmObservers.get(i);
			observer.updateBPM();
		}
	}

	public void removeObserver(BeatObserver o) {
		int i = beatObservers.indexOf(o);
		if (i >= 0) {
			beatObservers.remove(i);
		}
	}

	public void removeObserver(BPMObserver o) {
		int i = bpmObservers.indexOf(o);
		if (i >= 0) {
			bpmObservers.remove(i);
		}
	}

	public void playBeat() {
		clip.setFramePosition(0);
		clip.start();
	}
	public void stopBeat() {
		clip.setFramePosition(0);
		clip.stop();
	}

}
```

## 뷰 알아보기

- 2개의 뷰
  - BPM마다 통통 튀는 모습을 보여주는 막대
  - 제어용 인터페이스

## 뷰 만들기

```java
package headfirst.designpatterns.combined.djview;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class DJView implements ActionListener,  BeatObserver, BPMObserver {
	BeatModelInterface model; // 뷰에는 모델과 컨트롤러 레퍼런스가 들어 있습니다
	ControllerInterface controller; // 컨트롤러의 레퍼런스는 제어용 인터페이스 코드에서만 쓰입니다
  JFrame viewFrame;
  JPanel viewPanel;
	BeatBar beatBar;
	JLabel bpmOutputLabel;
  JFrame controlFrame;
  JPanel controlPanel;
  JLabel bpmLabel;
  JTextField bpmTextField;
  JButton setBPMButton;
  JButton increaseBPMButton;
  JButton decreaseBPMButton;
  JMenuBar menuBar;
  JMenu menu;
  JMenuItem startMenuItem;
  JMenuItem stopMenuItem;

  public DJView(ControllerInterface controller, BeatModelInterface model) {
		this.controller = controller;
		this.model = model;
		model.registerObserver((BeatObserver)this);
		model.registerObserver((BPMObserver)this);
  }

  public void createView() {
		// Create all Swing components here
    viewPanel = new JPanel(new GridLayout(1, 2));
    viewFrame = new JFrame("View");
    viewFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    viewFrame.setSize(new Dimension(100, 80));
    bpmOutputLabel = new JLabel("offline", SwingConstants.CENTER);
		beatBar = new BeatBar();
		beatBar.setValue(0);
    JPanel bpmPanel = new JPanel(new GridLayout(2, 1));
		bpmPanel.add(beatBar);
    bpmPanel.add(bpmOutputLabel);
    viewPanel.add(bpmPanel);
    viewFrame.getContentPane().add(viewPanel, BorderLayout.CENTER);
    viewFrame.pack();
    viewFrame.setVisible(true);
	}


  public void createControls() {
		// Create all Swing components here
    JFrame.setDefaultLookAndFeelDecorated(true);
    controlFrame = new JFrame("Control");
    controlFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    controlFrame.setSize(new Dimension(100, 80));

    controlPanel = new JPanel(new GridLayout(1, 2));

    menuBar = new JMenuBar();
    menu = new JMenu("DJ Control");
    startMenuItem = new JMenuItem("Start");
    menu.add(startMenuItem);
    startMenuItem.addActionListener((event) -> controller.start());
    // was....
    /*
    startMenuItem.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent event) {
            controller.start();
        }
    });
    */
    stopMenuItem = new JMenuItem("Stop");
    menu.add(stopMenuItem);
    stopMenuItem.addActionListener((event) -> controller.stop());
    // was...
    /*
    stopMenuItem.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent event) {
            controller.stop();
        }
    });
    */
    JMenuItem exit = new JMenuItem("Quit");
    exit.addActionListener((event) -> System.exit(0));
    // was...
    /*
    exit.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent event) {
            System.exit(0);
        }
    });
    */

    menu.add(exit);
    menuBar.add(menu);
    controlFrame.setJMenuBar(menuBar);

    bpmTextField = new JTextField(2);
    bpmLabel = new JLabel("Enter BPM:", SwingConstants.RIGHT);
    setBPMButton = new JButton("Set");
    setBPMButton.setSize(new Dimension(10,40));
    increaseBPMButton = new JButton(">>");
    decreaseBPMButton = new JButton("<<");
    setBPMButton.addActionListener(this);
    increaseBPMButton.addActionListener(this);
    decreaseBPMButton.addActionListener(this);

    JPanel buttonPanel = new JPanel(new GridLayout(1, 2));

		buttonPanel.add(decreaseBPMButton);
		buttonPanel.add(increaseBPMButton);

    JPanel enterPanel = new JPanel(new GridLayout(1, 2));
    enterPanel.add(bpmLabel);
    enterPanel.add(bpmTextField);
    JPanel insideControlPanel = new JPanel(new GridLayout(3, 1));
    insideControlPanel.add(enterPanel);
    insideControlPanel.add(setBPMButton);
    insideControlPanel.add(buttonPanel);
    controlPanel.add(insideControlPanel);

    bpmLabel.setBorder(BorderFactory.createEmptyBorder(5,5,5,5));
    bpmOutputLabel.setBorder(BorderFactory.createEmptyBorder(5,5,5,5));

    controlFrame.getRootPane().setDefaultButton(setBPMButton);
    controlFrame.getContentPane().add(controlPanel, BorderLayout.CENTER);

    controlFrame.pack();
    controlFrame.setVisible(true);
  }

	public void enableStopMenuItem() {
    	stopMenuItem.setEnabled(true);
	}

	public void disableStopMenuItem() {
    	stopMenuItem.setEnabled(false);
	}

	public void enableStartMenuItem() {
    	startMenuItem.setEnabled(true);
	}

	public void disableStartMenuItem() {
    	startMenuItem.setEnabled(false);
	}

  /**
   * 사용자가 버튼을 클릭했을 때 호출되는 메소드
   */
  public void actionPerformed(ActionEvent event) {
		if (event.getSource() == setBPMButton) {
			int bpm = 90;
			String bpmText = bpmTextField.getText();
      if (bpmText == null || bpmText.contentEquals("")) {
          bpm = 90;
      } else {
          bpm = Integer.parseInt(bpmTextField.getText());
      }
      controller.setBPM(bpm);
		} else if (event.getSource() == increaseBPMButton) {
			controller.increaseBPM();
		} else if (event.getSource() == decreaseBPMButton) {
			controller.decreaseBPM();
		}
  }

	public void updateBPM() { // 모델의 상태가 변경되면 updateBPM() 메소드가 호출됩니다
		if (model != null) {
			int bpm = model.getBPM();
			if (bpm == 0) {
				if (bpmOutputLabel != null) {
        			bpmOutputLabel.setText("offline");
				}
			} else {
				if (bpmOutputLabel != null) {
        			bpmOutputLabel.setText("Current BPM: " + model.getBPM());
				}
			}
		}
	}

	public void updateBeat() {
		if (beatBar != null) {
			 beatBar.setValue(100);
		}
	}
}

```

## 컨트롤러 만들기

- 컨트롤러는 뷰에서 쓰이는 전략
- 전략 패턴을 구현하려면 DJ뷰에 넣을 전략 객체의 인터페이스를 먼저 만들어야 합니다

```java

public interface ControllerInterface {
  void start();
  void stop();
  void increaseBPM();
  void decreaseBPM();
  void setBPM(int bpm);
}

```

## 컨트롤러 코드 살펴보기

```java
package headfirst.designpatterns.combined.djview;

public class BeatController implements ControllerInterface {
	BeatModelInterface model;
	DJView view;

	public BeatController(BeatModelInterface model) {
		this.model = model; // 컨트롤러의 생성자에는 모델이 인자로 전달되며,
		view = new DJView(this, model); // 생성자에서 뷰도 생성해야 합니다
    view.createView();
    view.createControls();
		view.disableStopMenuItem();
		view.enableStartMenuItem();
		model.initialize();
	}

	public void start() {
		model.on();
		view.disableStartMenuItem();
		view.enableStopMenuItem();
	}

	public void stop() {
		model.off();
		view.disableStopMenuItem();
		view.enableStartMenuItem();
	}

	public void increaseBPM() {
        int bpm = model.getBPM();
        model.setBPM(bpm + 1);
	}

	public void decreaseBPM() {
        int bpm = model.getBPM();
        model.setBPM(bpm - 1);
  	}

 	public void setBPM(int bpm) {
		model.setBPM(bpm);
	}
}

```

- 컨트롤러는 뷰와 연관된 결정을 내리는 역할도 맡습니다
  - 뷰는 메뉴 항목을 활성 또는 비활성 상태로 바꾸는 방법만 알고 있을 뿐,
  - 어떤 상황에서 활성화하거나 비활성화해야 할지 결정을 내리는 기능은 없습니다

## 모델, 뷰, 컨트롤러 코드 합치기

```java

public class DJTestDrive {
  public static void main (String[] args) {
    BeatModelInterface model = new BeatModel(); // 우선 모델을 생성합니다
    ControllerInterface controller = new BeatController(model); // 그리고 컨트롤러를 생성할 때 모델을 인자로 전달합니다
  }
}

```

### 해야할 일

1. 메뉴에서 Start를 선택해서 비트 연주를 시작합시다.
   - 일단 연주가 시작되면 Start는 비활성 상태로 바뀝니다
2. BPM을 직접 입력하거나 >>, << 버튼을 클릭해서 BPM을 바꿔봅시다.
   - View창과 Control 창은 논리적으로 전혀 연결되어 있지 않지만 Control 창에서 어떤 내용을 바꾸면 바로 View 창의 내용도 바뀝니다
3. 비트 막대가 항상 비트에 맞게 움직인다는 점도 눈여겨 봅시다
   - 모델의 옵저버로 만들었으니까 그럴 수 있는 거겠죠?
4. 여러분이 제일 좋아하는 곡을 틀어 놓고, BPM이 얼마인지 맞춰 봅시다.
   - `>>`와 `<<` 버튼을 클릭하다 보면 비트를 맞출 수 있겠죠?
5. 비트 생성지를 중지해 봅시다.
   - Stop을 선택하고 나면 Stop은 비활성 상태로 바뀌고 Start가 다시 활성화 됩니다

## MVC 속 전략 패턴 자세히 알아보기

- MVC에서 종종 쓰이는 어댑터 패턴도 만나게 됩니다
  - BPM 막대 움직임 대신 심장 박동을 보여주는 용도로 쓸 수도 있겠죠?

## 심박 모터 모델 적응시키기

- 심박 모델을 BeatModel에 적응 시키기 위해 어댑터 패턴을 사용
- 심박 모델은 심박 조정, on, off, initialize 메소드는 동작을 하지 않게 설정

## 심박 모니터 컨트롤러 만들기

## 무엇이든 물어보세요 (Q&A)

- Q1) 솔직히 말해서 MVC에 컴포지트 패턴이 쓰인다고 말한 부분은 조금 받아들이기 힘든데요
  - 정말로 컴포지트 패턴이 쓰인다고 할 수 있는 건가요?
- A1) 네, MVC에는 분명히 컴포지트 패턴이 들어있습니다. 하지만 질문한 내요을 생각해 볼 만한 문제긴 합니다

  - GUI 패키지는 워낙 복잡해서 그 내부 구조를 한눈에 알아보기 힘들다 보니 디스플레이를 마늗ㄹ고 갱신하는 데 컴포지트 패턴이 쓰인다는 사실을 알기 힘듭니다
  - 마크업 언어를 받아서 사용자 인터페이스로 바꿔주느 웹 브라우저라면 더 어렵죠
  - MVC가 처음 만들어 질 무렵에는 GUI를 만들 때 직접 건드려야 할 부분이 지금보다 훨씬 더 맣ㄴ았습니다
  - 그 시절에는 컴포지트 패턴이 MVC의 일부분이라는 점을 꽤 분명하게 알 수 있었죠

- Q2) 컨트롤러에서 애플리케이션 로직을 구현하는 경우는 없나요?
- A2) 네, 없습니다. 컨트롤러는 뷰를 대상으로 하는 행동만 구현합니다.

  - 사용자가 뷰를 대상으로 취한 행동을 모델로의 요청으로 바꿔주는 것이 바로 컨트롤러의 역할이죠.
  - 모델은 그러한 요청을 받아서 필요한 작업을 처리하는 애플리케이션 로직을 구현합니다
  - 컨트롤러에서 모델의 어떤 메소드를 호출해야 할지 결정하려고 어느 정도 간단한 작업을 처리할 수는 있지만
    그렇다고 그런 부분을 '애플리케이션 로직'이라고 할 수는 없습니다.
  - 애플리케이션 로직이란 데이터를 관리하고 조작하는 코드로, 그런 코드는 모델에 들어가야 합니다

- Q3) '모델'이라는 용어를 이해하는 게 항상 어려웠는데요, 이제 모델이 애플리케이션의 알맹이라고 생각하게 되었습니다.
  - 그런데 MVC는 왜 그런 애매모호한 단어를 사용하게 된 걸까요?
- A3) MVC라는 이름을 일단 정한 다음 'M'으로 시작하는 단어를 찾다보니 모델(model)이라는 단어를 사용하게 됐다는 얘기도 있습니다.

  - 사실 진지하게 얘기하자면, 저희도 모델이란 용어를 이해하기 어렵습니다. 하지만 모델이란 용어가 자리를 잡고 나니 더 나은 용어를 생각하기도 힘들어진 것 같습니다.

- Q4) '모델의 상태'에 관한 이야기가 많이 나왔는데요. 그러면 혹시 상태 패턴도 적용된 건가요?
- A4) 그건 아닙니다. 여기에서 쓰인 '상태'라는 용어는 말 그대로 그냥 일반적인 상태를 일컫는 말입니다.

  - 하지만 모델을 디자인하기에 따라 실제로 상태 패턴을 사용할 수도 있죠

- Q5) MVC 패턴을 설명할 때 컨트롤러를 뷰와 모델 사이의 '중재자(mediator)'로 설명하는 경우를 종종 봤습니다.
  - 혹시 컨트롤러가 중재자 패턴을 구현한 건가요?
- A5) (14장에서 간단하게 설명되어있지만) 여기서 간단하게 중재자 패턴을 설명하자면

  - 중재자 패턴에서의 중재자는 객체 사이의 상호작용을 캡슐화해서 두 객체 사이의 연결을 느슨하게 만드는 역할을 합니다.
  - 그러니 컨트롤러가 어느정도 중재자 역할을 한다고 할 수 있습니다.
  - 뷰에서 모델의 상태를 직접 설정하지 않고 항상 컨트롤러로 모델을 건드리게 되어 있으니까요.
  - 하지만 뷰에서 모델의 상태를 알아내는 작업은 해야 하므로 뷰에도 모델의 레퍼런스가 들어있습니다.
  - 만약 컨트롤러가 진정한 중재자라면 모델의 상태를 알아낼 때도 반드시 컨트롤러를 거치도록 해야겠죠

- Q6) 뷰에서 꼭 모델에게 요청해서 상태를 알아내야 하나요?
  - 그냥 푸시 방식을 써서 모델이 갱신되었다는 연락을 할 때 모델의 상태도 같이 전달하면 안 되나요?
- A6) 물론 전달해도 됩니다. 그리고 JSP나 HTML 뷰에서는 실제로 그런 방식을 사용하고 있죠. 모델 자체를 빈으로 보내면 뷰에서 빈 속성을 사용해서 필요한 상태를 알아냅니다.

  - BeatModel도 마찬가지 방식으로 상태가 변경되었다는 연락을 전달할 때 뷰에서 필요한 상태를 같이 보내도 됩니다.
  - 하지만 2장에서 배웠던 내용을 떠올려 보면 이런 방법에 몇 가지 단점이 있다는 사실이 기억날 것입니다.
    - 2장의 푸시방식을 설명하는 부분을 다시 읽어 보세요

- Q7) 뷰가 2개 이사 있으면 컨트롤러도 2개 이상 있어야 하나요?
- A7) 하나의 뷰에 하나의 컨트롤러를 만드는 게 일반적이지만 하나의 컨트롤러 클래스에서 여러 개의 뷰를 관리하는 것도 가능합니다

- Q8) 뷰에서는 원래 모델을 조작하지 않도록 되어 있는데, 아까 구현한 코드를 보면 뷰에서도 모델의 상태를 변경하는 메소드에 접근할 수 있게 되어 있던데요. 그러면 위험하진 않나요?
- A8) 예, 올바른 지적입니다. 아까 구현한 코드에서는 뷰가 모델로 접근 하는 일을 제한하지 않았습니다.
  - 코드를 간단하게 만들려고 그렇게 했지만 뷰 모델의 API 중 일부분에만 접근하도록 만들어야 할 때도 있을 것입니다.
  - 이때는 일부 메소드에만 접근할 수 있도록 인터페이스를 고치도록 하면 되죠.
  - 어떤 패턴을 쓰면 좋을지 생각해 보세요

## 디자인 도구 상자 안에 들어가야 할 도구들

### 객체지향 원칙

- 바뀌는 부분은 캡슐화한다
- 상속보다는 구성을 활용한다
- 구현보다는 인터페이스에 맞춰서 프로그래밍한다
- 상호작용하는 객체 사이에는 가능하면 느슨한 결합을 사용해야 한다
- 클래스는 확장에는 열려 있지만 변경에는 닫혀 있어야 한다(OCP).
- 추상화된 것에 의존하게 만들고 구상 클래스에 의존하지 않게 만든다
- 진짜 절친에게만 이야기 한다
- 먼저 연락하지 마세요. 저희가 연락드리겠습니다.
- 어떤 클래스가 바뀌는 이유는 하나뿐이어야만 한다

### 객체 지향 기초

- 추상화
- 캡슐화
- 다형성
- 상속

### 객체지향 패턴

- 복합 패턴
  - 2개 이상의 패턴을 결합해서 일반적으로 자주 등장하는 문제들의 해법을 제공합니다
  - MVC

## 핵심 정리

- 모델-뷰-컨트롤러(MVC)는 옵저버, 전략, 컴포지트 패턴으로 이루어진 복합 패턴입니다
- 모델은 옵저버 패턴을 사용해서 의존성을 없애면서도 옵저버들에게 자신의 상태가 변경되었음을 알릴 수 있습니다
- 컨트롤러는 뷰의 전략 객체입니다
  - 뷰는 컨트롤러를 바꿔서 또 다른 행동을 할 수 있습니다
- 뷰는 컴포지트 패턴을 사용해서 사용자 인터페이스를 구현합니다
  - 보통 패널이나 프레임, 버튼과 같은 중첩된 구성 요소로 이루어집니다
- 모델, 뷰, 컨트롤러는 방금 말한 3가지 패턴으로 서로 느슨하게 결합되므로 깔끔하면서도 유연한 구현이 가능합니다
- 새로운 모델을 기존의 뷰와 컨트롤러에 연결해서 쓸 때는 어댑터 패턴을 활용하면 됩니다
- MVC는 웹에도 적용됩니다
- 클라이언트-서버 애플리케이션 구조에 MVCㅡㄹㄹ 적응시켜 주는 다양한 웹 MVC 프레임워크가 있습니다

## 웹 MVC

- 모델

  - 비즈니스 로직
  - 데이터 관리
  - 옵저버(뷰)에게 상태 변경을 알림

- 뷰

  - 사용자 인터페이스
  - 옵저버를 상속받아서 구현
    - 옵저버의 update()를 구현해서 모델의 상태가 변경되면 호출되도록 함
    - update()에선 사용자 인터페이스의 변화를 줌
      - 필요시 뷰에 포함된 모델로 부터 데이터를 가져와서 사용자 인터페이스를 표시
  - 모델의 registerObserver()를 호출해서 자신을 옵저버로 등록
  - 사용자로 부터 액션을 받으면 컨트롤러에게 전달
    - 컨트롤러의 특정 메소드 호출

- 컨트롤러
  - 모델의 메소드들을 호출하고 뷰의 메소드들을 호출
  - 모델의 setter를 통해 값을 변경
    - 모델의 값이 변경되면 모델에선 notifyObservers()를 호출해서 옵저버(뷰)들에게 변경을 알림
