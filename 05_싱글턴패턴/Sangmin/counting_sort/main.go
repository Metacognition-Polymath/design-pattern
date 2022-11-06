package main

import (
	"fmt"
	"time"
)

func main() {
	// start time
	start := time.Now()
	arr := []int{1, 0, 0, 3, 2, 4, 3, 2, 5, 3, 1, 2, 3, 4, 4, 3, 5, 1, 2, 3, 5, 2, 3, 1, 4, 3, 5, 1, 2, 1, 1, 1}
	// end time
	sorted := countingSort2(arr)
	end := time.Now()

	// print time
	fmt.Println(end.Sub(start))
	// print sorted arr
	fmt.Println(sorted)

}

// O(n+k) time complexity
func countingSort1(arr []int) []int {
	// make count array
	count := make([]int, 6)

	// count the number of each element
	for _, v := range arr {
		count[v]++
	}

	// make sorted array
	sorted := make([]int, len(arr))

	// make index for sorted array
	index := 0

	// sort
	for i, v := range count {
		for j := 0; j < v; j++ {
			sorted[index] = i
			index++
		}
	}
	return sorted
}

func countingSort2(arr []int) []int {
	// make count array
	count := make([]int, 6)

	// count the number of each element
	for _, v := range arr {
		count[v]++
	}

	// count the number of elements less than or equal to each element
	for i := 1; i < len(count); i++ {
		count[i] += count[i-1]
	}

	sorted := make([]int, len(arr))

	// sort
	for i := len(arr) - 1; i >= 0; i-- {
		sorted[count[arr[i]]-1] = arr[i]
		count[arr[i]]--
	}
	return sorted

}
