# 디자인 패턴 스터디

- 교재 : [헤드 퍼스트 디자인 패턴](http://www.yes24.com/Product/Goods/108192370)

## 진행

- 시간 : 매주 일요일 오후 4시
- 장소 : [사당역 근처 스터디 카페 - 셀 스터디 룸](https://map.naver.com/v5/entry/place/1089708963?c=14134962.6748640,4506438.1445617,15.29,0,0,0,dh)
- 진행 : 매주 한명씩 발표
  - 발표 순서 : Tony -> 상민 -> 민지 -> 정희

## 규칙

- 모임 전 까지 각자 공부하고 정리한 내용 commit 하기
  - 해당 챕터 폴더에 본인명으로 폴더를 생성 후 그 안에 자유롭게 정리
  - 노션같은 곳에 정리했다면 링크 올리기

## 목차

- [x] 0. 들어가며 - 이 책을 읽는 방법
- [x] 1. 디자인 패턴 소개와 전략 패턴 - 2022.10.10 Tony
- [x] 2. 옵저버 패턴 - 객체들에게 연락 돌리기 - 2022.10.16 상민
- [x] 3. 데코레이터 패턴 - 객체 꾸미기 - 2022.10.23 민지
- [x] 4. 팩토리 패턴 - 객체지향 빵 굽기 - 2022.10.30 정희
- [x] 5. 싱글턴 패턴 - 하나뿐인 특별한 객체 만들기 - 2022.11.06 Tony
- [x] 6. 커맨드 패턴 - 호출 캡슐화하기 - 2022.11.13 상민
- [x] 7. 어댑터 패턴과 퍼사드 패턴 - 적응시키기 - 2022.11.20 민지
- [x] 8. 템플릿 메소드 패턴 - 알고리즘 캡슐화하기 - 2022.11.27 정현
- [x] 9. 반복자 패턴과 컴포지트 패턴 - 컬렉션 잘 관리하기 - 2022.12.04 Tony
- [x] 10. 상태 패턴 - 객체의 상태 바꾸기 - 2022.12.11 상민
- [x] 11. 프록시 패턴 - 객체 접근 제어하기 - 2022.12.18
- [x] 12. 복합 패턴 - 패턴을 모아 패턴 만들기 - 2022.12.25 정희
- [x] 13. 실전 디자인 패턴 - 패턴과 행복하게 살아가기 - 2023.01.08 Tony
- [x] 14. 기타 패턴 - 다양한 패턴 빠르게 알아보기 - 2023.01.18 Tony

## 디자인 패턴 범주 알아보기

### 패턴별 범주로 분류

#### 생성 패턴(Creational Pattern)

- 객체 인스턴스를 생성하는 패턴
- 클라이언트와 그 클라이언트가 생성해야 하는 객체 인스턴스 사이의 연결을 끊어주는 패턴
- 종류
  - 싱글턴, 빌더, 프로토 타입, 추상 팩토리, 팩토리 메소드, ...

#### 행동 패턴(Behavioral Pattern)

- 클래스와 객체들이 상호작용하는 방법과 역할을 분담하는 방법을 다루는 패턴
- 종류
  - 템플릿 메소드, 비지터, 중재자, 반복자, 인터프리터, 싱글턴, 메멘토, 역할 변경, 옵저저, 상태, 전략, ...

#### 구조 패턴(Structual Pattern)

- 클래스와 객체를 더 큰 구조로 만들 수 있게 구성을 사용하는 패턴
- 종류
  - 데코레이터, 컴포지트, 프록시, 퍼사드, 플라이웨이트, 브리지, 어댑터, ...

### 클래스를 다루는 패턴인지, 객체를 다루는 패턴인지에 따른 분류

#### 클래스 패턴(Class Pattern)

- 클래스 사이의 관계가 상속으로 어떻게 정의되는지를 다룹니다
- 클래스 사이의 관계는 대부분 컴파일할 때 결정됩니다
- 종류
  - 템플릿 메소드, 팩토리 메소드, 어댑터, 인터프리터, ...

#### 객체 패턴(Object Pattern)

- 객체 사이의 관계를 다루며, 객체 사이의 관계는 보통 `구성`으로 정의됩니다
- 일반적으로 실행 중에 관계가 결정되므로 보다 동적이고 유연합니다
- 종류
  - 컴포지트, 비지터, 데코레이터, 퍼사드, 커맨드, 반복자, 프록시, 옵저버, 메멘토, 전략, 책임 연쇄
    브리지, 중재자, 상태, 플라이웨이트, 프로토타입, 추상 팩토리, 빌더, 싱글턴, ...
