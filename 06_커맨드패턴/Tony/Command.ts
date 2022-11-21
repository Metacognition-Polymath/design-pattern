interface Command {
  execute(): void;
}

class Light {
  on() {
    console.log("Light On");
  }
  off() {
    console.log("Light Off");
  }
}

// 조명을 켤 때 필요한 커맨드 클래스 구현
class LightOnCommand implements Command {
  light: Light; // 리시버

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.on();
  }
}
