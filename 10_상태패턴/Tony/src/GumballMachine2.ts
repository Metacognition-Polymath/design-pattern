// 상태 별로 클래스를 나눠서 각 메소드를 구현한다.

enum MachineState {
  SOLD_OUT,
  NO_QUARTER,
  HAS_QUARTER,
  SOLD,
}

interface State {
  insertQuarter(): void;
  ejectQuarter(): void;
  turnCrank(): void;
  dispense(): void;
}

class GumballMachine {
  private state: State;
  private count: number;

  constructor(count: number) {
    this.count = count;
    if (count > 0) {
      this.state = new NoQuarterState(this);
    }
  }

  insertQuarter() {
    this.state.insertQuarter();
  }

  ejectQuarter() {
    this.state.ejectQuarter();
  }

  turnCrank() {
    this.state.turnCrank();
    this.state.dispense();
  }

  releaseBall() {
    console.log("알맹이가 나갑니다.");
    if (this.count !== 0) {
      this.count -= 1;
    }
  }

  getCount() {
    return this.count;
  }

  setState(state: State) {
    this.state = state;
  }

  getNoQuarterState() {
    return new NoQuarterState(this);
  }

  getHasQuarterState() {
    return new HasQuarterState(this);
  }

  getSoldState() {
    return new SoldState(this);
  }

  getSoldOutState() {
    return new SoldOutState(this);
  }
}

class NoQuarterState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log("동전을 넣으셨습니다.");
    this.gumballMachine.setState(this.gumballMachine.getHasQuarterState());
  }

  ejectQuarter() {
    console.log("동전을 넣어주세요.");
  }

  turnCrank() {
    console.log("동전을 넣어주세요.");
  }

  dispense() {
    console.log("동전을 넣어주세요.");
  }
}

class HasQuarterState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log("이미 동전이 있습니다.");
  }

  ejectQuarter() {
    console.log("동전이 반환됩니다.");
    this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
  }

  turnCrank() {
    console.log("손잡이를 돌리셨습니다.");
    this.gumballMachine.setState(this.gumballMachine.getSoldState());
  }

  dispense() {
    console.log("알맹이가 나갈 수 없습니다.");
  }
}

class SoldState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log("잠깐만 기다려 주세요. 알맹이가 나가고 있습니다.");
  }

  ejectQuarter() {
    console.log("이미 알맹이를 뽑으셨습니다.");
  }

  turnCrank() {
    console.log("손잡이는 한 번만 돌려주세요.");
  }

  dispense() {
    this.gumballMachine.releaseBall();
    if (this.gumballMachine.getCount() > 0) {
      this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
    } else {
      console.log("Oops, out of gumballs!");
      this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
    }
  }
}

class SoldOutState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log("매진되었습니다. 다음 기회에 이용해주세요.");
  }

  ejectQuarter() {
    console.log("동전을 반환할 수 없습니다. 동전을 넣지 않았습니다.");
  }

  turnCrank() {
    console.log("매진되었습니다. 다음 기회에 이용해주세요.");
  }

  dispense() {
    console.log("알맹이를 내보낼 수 없습니다.");
  }
}
