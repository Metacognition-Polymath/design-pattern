class GumballMachine {
  /// 상태 상수
  /// [soldOut] 매진
  static int soldOut = 0;

  /// [noQuarter] 동전 없음
  static int noQuarter = 1;

  /// [hasQuarter] 동전 있음
  static int hasQuarter = 2;

  /// [sold] 판매
  static int sold = 3;

  /// 현재 상태
  int state = soldOut;

  /// 자판기에 들어있는 구슬의 개수
  int count = 0;

  /// 생성자
  GumballMachine(this.count) {
    if (count > 0) {
      state = noQuarter;
    }
  }

  /// 동전 투입
  void insertQuarter() {
    if (state == hasQuarter) {
      print('동전은 한 개만 넣어주세요.');
    } else if (state == noQuarter) {
      state = hasQuarter;
      print('동전을 넣으셨습니다.');
    } else if (state == soldOut) {
      print('매진되었습니다. 다음 기회에 이용해주세요.');
    } else if (state == sold) {
      print('잠깐만 기다려 주세요. 알맹이가 나가고 있습니다.');
    }
  }

  /// 동전 반환
  void ejectQuarter() {
    if (state == hasQuarter) {
      print('동전이 반환됩니다.');
      state = noQuarter;
    } else if (state == noQuarter) {
      print('동전을 넣어주세요.');
    } else if (state == sold) {
      print('이미 알맹이를 뽑으셨습니다.');
    } else if (state == soldOut) {
      print('동전을 넣지 않으셨습니다. 동전이 반환되지 않습니다.');
    }
  }

  /// 손잡이 돌리기
  void turnCrank() {
    if (state == sold) {
      print('손잡이는 한 번만 돌려주세요.');
    } else if (state == noQuarter) {
      print('동전을 넣어주세요.');
    } else if (state == soldOut) {
      print('매진되었습니다.');
    } else if (state == hasQuarter) {
      print('손잡이를 돌리셨습니다.');
      state = sold;
      dispense();
    }
  }

  /// 알맹이 배출
  void dispense() {
    if (state == sold) {
      print('알맹이가 나가고 있습니다.');
      count = count - 1;
      if (count == 0) {
        print('더 이상 알맹이가 없습니다.');
        state = soldOut;
      } else {
        state = noQuarter;
      }
    }

    /// 아래의 코드는 일어나면 안되는 일이다.
    else if (state == noQuarter) {
      print('동전을 넣어주세요.');
    } else if (state == soldOut) {
      print('매진되었습니다.');
    } else if (state == hasQuarter) {
      print('알맹이가 나갈 수 없습니다.');
    }
  }

  /// 현재 상태 출력
  void printState() {
    print('남은 개수: $count개, 현재 상태: ${_stateToString()}');
  }

  _stateToString() {
    if (state == 0) {
      return '매진';
    } else if (state == 1) {
      return '동전 없음';
    } else if (state == 2) {
      return '동전 있음';
    } else if (state == 3) {
      return '판매';
    }
  }
}
