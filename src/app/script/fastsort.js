
  var quicksort;

  quicksort = function(arr, i, j) {
    var k;
    if (i == null) {
      i = 0;
    }
    if (j == null) {
      j = arr.length - 1;
    }
    k = arr[i];
    while (i !== j) {
      while (i < j && arr[j] > k) {
        j--;
      }
      arr[i] = arr[j];
      arr[j] = k;
      while (i < j && arr[i] < k) {
        i++;
      }
      arr[j] = arr[i];
      arr[i] = k;
    }
    if (i > 1) {
      quicksort(arr, 0, i - 1);
    }
    if (i < arr.length - 2) {
      quicksort(arr, i + 1, arr.length - 1);
    }
    return arr;
  };