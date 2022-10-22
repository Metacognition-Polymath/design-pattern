package main

// ConcreteComponent
type VeggieMania struct{}

func (v *VeggieMania) getPrice() int {
	return 15
}
