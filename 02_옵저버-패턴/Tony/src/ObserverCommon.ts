/**
 * Observer 인터페이스는 모든 옵저버 클래스에서 구현해야 함
 */
export interface Observer {
  update: (temp: number, humidity: number, pressure: number) => void;
}

/**
 * registerObserver, removeObserver는 Observer를 인자로 받아서 각각 옵저버를 등록, 제거하는 역할을 함
 * notifyObservers는 Subject의 상태가 변경되었을 때 모든 옵저버에게 변경 내용을 알리려고 호출되는 메소드
 */
export interface Subject {
  /**
   * Observer를 인자로 받아서 각각 옵저버를 제거하는 역할을 함
   */
  registerObserver(o: Observer): void;
  /**
   * Observer를 인자로 받아서 각각 옵저버를 제거하는 역할을 함
   */
  removeObserver(o: Observer): void;
  /**
   * Subject의 상태가 변경되었을 때 모든 옵저버에게 변경 내용을 알리려고 호출되는 메소드
   */
  notifyObservers(): void;
}

/**
 * display : 항목을 화면에 표시해야 하면 이 메소드를 호출
 */
export interface DisplayElement {
  display(): void;
}
