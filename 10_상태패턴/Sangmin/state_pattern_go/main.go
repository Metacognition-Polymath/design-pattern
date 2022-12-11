package main

import "fmt"

type Switch struct {
	State State
}

func (s *Switch) On() {
	s.State.On(s)
}

func (s *Switch) Off() {
	s.State.Off(s)
}

type State interface {
	On(sw *Switch)
	Off(sw *Switch)
}

func NewSwitch() *Switch {
	return &Switch{
		State: NewOffState(),
	}
}

type BaseState struct{}

func (b *BaseState) On(sw *Switch) {
	println("Light is already on")
}

func (b *BaseState) Off(sw *Switch) {
	println("Light is already off")
}

type OnState struct {
	BaseState
}

func (o *OnState) Off(sw *Switch) {
	fmt.Println("Turning the light off...")
	sw.State = NewOffState()
}

func NewOnState() *OnState {
	fmt.Println("Light Turned on")
	return &OnState{}
}

type OffState struct {
	BaseState
}

func (o *OffState) On(sw *Switch) {
	fmt.Println("Turning the light on...")
	sw.State = NewOnState()
}

func NewOffState() *OffState {
	fmt.Println("Light Turned Off")
	return &OffState{}
}

func main() {
	sw := NewSwitch()
	sw.On()
	sw.Off()
	sw.Off()
}
