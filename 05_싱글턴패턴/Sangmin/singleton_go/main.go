package main

import (
	"fmt"
	"time"

	"github.com/sangmin4208/design-pattern/singleton/singleton"
)

func main() {
	// make List to store singleton
	var list []*singleton.Single

	// make 10 singleton with goroutine
	for i := 0; i < 10; i++ {
		go func(index int) {
			// wait for 500ms
			time.Sleep(500 * time.Millisecond)
			s := singleton.GetInstance()
			// set name with index
			s.SetName(fmt.Sprintf("name %d", index))

			list = append(list, s)
		}(i)
	}
	// wait for 3 seconds
	time.Sleep(3 * time.Second)

	//  print name of singleton
	for i, s := range list {
		fmt.Printf("index: %d, name: %s, address: %p", i, s.Name, s)
		fmt.Println()
	}

}
