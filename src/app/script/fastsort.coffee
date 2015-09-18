quicksort = (arr, i=0, j=arr.length-1)->
  k = arr[i]
  while i != j
    while i < j and arr[j] > k
      j--
    arr[i] = arr[j]
    arr[j] = k
    while i < j and arr[i] < k
      i++
    arr[j] = arr[i]
    arr[i] = k

  quicksort arr, 0, i - 1 if i > 1
  quicksort arr, i + 1, arr.length - 1 if i < arr.length - 2

  arr
