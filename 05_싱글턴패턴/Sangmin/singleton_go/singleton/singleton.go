package singleton

import (
	"fmt"
	// "sync"
)

// var lock = &sync.Mutex{}

type Single struct {
	Name string
}

var singleInstance *Single

func GetInstance() *Single {
	if singleInstance == nil {
		// lock.Lock()
		// defer lock.Unlock()
		if singleInstance == nil {
			fmt.Println("Creating single instance now.")
			singleInstance = &Single{}
		} else {
			fmt.Println("Single instance already created.")
		}
	} else {
		fmt.Println("Single instance already created.")
	}

	return singleInstance
}

func (s *Single) SetName(name string) {
	s.Name = name
}
