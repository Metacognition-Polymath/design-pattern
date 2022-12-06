{
  enum State {
    SOLD_OUT,
    NO_QUARTER,
    HAS_QUARTER,
    SOLD,
  }

  class GumballMachine {
    private state: State = State.SOLD_OUT;
    private count: number = 0;

    constructor(count: number) {
      this.count = count;
      if (count > 0) {
        this.state = State.NO_QUARTER;
      }
    }

    /**
     * 행동을 메소드로 구현합니다
     */
    // 동전이 투입 된 경우
    insertQuarter() {
      if (this.state === State.HAS_QUARTER) {
        console.log("동전은 한 개만 넣어주세요.");
      } else if (this.state === State.NO_QUARTER) {
        this.state = State.HAS_QUARTER;
        console.log("동전을 넣으셨습니다.");
      } else if (this.state === State.SOLD_OUT) {
        console.log("매진되었습니다. 다음 기회에 이용해주세요.");
      } else if (this.state === State.SOLD) {
        console.log("잠깐만 기다려 주세요. 알맹이가 나가고 있습니다.");
      }
    }

    // 동전이 반환 된 경우
    ejectQuarter() {
      if (this.state === State.HAS_QUARTER) {
        // 사용자가 동전을 반환 받으려고 하는 경우
        console.log("동전이 반환됩니다.");
        this.state = State.NO_QUARTER;
      } else if (this.state === State.NO_QUARTER) {
        // 동전이 있으면 반환하고 NO_QUARTER 상태로 전환합니다
        console.log("동전을 넣어주세요.");
      } else if (this.state === State.SOLD) {
        // 동전이 없담녀 돌려줄 수도 없습니다
        console.log("이미 알맹이를 뽑으셨습니다.");
      } else if (this.state === State.SOLD_OUT) {
        // 매진 상태에서는 동전을 투입할 수가 없기에 동전을 돌려줄 일도 없습니다
        console.log("동전을 넣지 않으셨습니다. 동전이 반환되지 않습니다.");
      }
    }

    // 손잡이를 돌리는 경우
    turnCrank() {
      if (this.state === State.SOLD) {
        // 누군가 장난을 치고 있군요
        console.log("손잡이는 한 번만 돌려주세요.");
      } else if (this.state === State.NO_QUARTER) {
        // 동전을 먼저 넣어야 합니다
        console.log("동전을 넣어주세요.");
      } else if (this.state === State.SOLD_OUT) {
        // 알맹이가 없으므로 아무것도 줄 수가 없습니다
        console.log("매진되었습니다.");
      } else if (this.state === State.HAS_QUARTER) {
        // 성공! 사용자가 알맹이를 받을 수 있습니다.
        console.log("손잡이를 돌리셨습니다.");
        this.state = State.SOLD;
        this.dispense(); // 알맹이 내보내기
      }
    }

    // 알맹이를 내보내는 경우
    dispense() {
      if (this.state === State.SOLD) {
        // SOLD 상태 : 알맹이를 내보내고, 알맹이가 없으면 SOLD_OUT 상태로 전환합니다
        console.log("알맹이가 나가고 있습니다.");
        this.count = this.count - 1;
        if (this.count === 0) {
          console.log("Oops, out of gumballs!");
          this.state = State.SOLD_OUT;
        } else {
          // 알맹이가 남아있으면 NO_QUARTER 상태로 전환합니다
          this.state = State.NO_QUARTER;
        }
      } else if (this.state === State.NO_QUARTER) {
        // 오류가 나는 상황
        console.log("동전을 넣어주세요.");
      } else if (this.state === State.SOLD_OUT) {
        // 오류가 나는 상황
        console.log("매진되었습니다.");
      } else if (this.state === State.HAS_QUARTER) {
        // 오류가 나는 상황
        console.log("알맹이가 나갈 수 없습니다.");
      }
    }
  }

  const gumballMachine = new GumballMachine(5); // 알맹이가 5개 있는 기계
  console.log(gumballMachine); // GumballMachine { count: 5, state: 'NO_QUARTER' }
  gumballMachine.insertQuarter(); // 동전을 넣습니다
  gumballMachine.turnCrank(); // 손잡이를 돌립니다

  console.log(gumballMachine); // GumballMachine { count: 4, state: 'NO_QUARTER' }

  gumballMachine.insertQuarter(); // 동전을 넣습니다
  gumballMachine.ejectQuarter(); // 동전을 반환합니다
  gumballMachine.turnCrank(); // 손잡이를 돌립니다 - 알맹이가 나오면 안됨

  console.log(gumballMachine); // GumballMachine { count: 4, state: 'NO_QUARTER' }

  gumballMachine.insertQuarter(); // 동전을 넣습니다
  gumballMachine.turnCrank(); // 손잡이를 돌립니다
  gumballMachine.insertQuarter(); // 동전을 넣습니다
  gumballMachine.turnCrank(); // 손잡이를 돌립니다
  gumballMachine.ejectQuarter(); // 동전을 반환합니다 - 동전을 넣지 않은 상태에서 반환 요청

  console.log(gumballMachine); // GumballMachine { count: 2, state: 'NO_QUARTER' }

  gumballMachine.insertQuarter(); // 동전을 넣습니다
  gumballMachine.insertQuarter(); // 동전을 넣습니다 - 동전을 한개만 넣어주세요
  gumballMachine.turnCrank(); // 손잡이를 돌립니다
  gumballMachine.turnCrank(); // 손잡이를 돌립니다 - 동전을 넣어주세요

  console.log(gumballMachine); // GumballMachine { count: 1, state: 'NO_QUARTER' }

  gumballMachine.insertQuarter(); // 동전을 넣습니다
  gumballMachine.turnCrank(); // 손잡이를 돌립니다
  gumballMachine.insertQuarter(); // 동전을 넣습니다 - 매진되었습니다. 다음 기회에 이용해주세요
  gumballMachine.turnCrank(); // 손잡이를 돌립니다 - 매진되었습니다.
  gumballMachine.insertQuarter(); // 동전을 넣습니다 - 매진되었습니다. 다음 기회에 이용해주세요
  gumballMachine.turnCrank(); // 손잡이를 돌립니다 - 매진되었습니다.
}
