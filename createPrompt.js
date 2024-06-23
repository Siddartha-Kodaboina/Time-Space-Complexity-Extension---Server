const createPrompt = (selectedText) => {
    return `
    var selected_text value is in between <selected> tags
    <selected>${selectedText}</selected>

    The task is to check selected_text is code or not, if it is code analyze and generate complexities otherwise error in specified formats
    You should generate context in of the below two formats, not both, and you do not give any explanation, code, statement or anything
    1. <Error> literal or 
    2. the context as <output-format> format with time and space complexities of the code

    1. Check whether selected text is code or not.
    if it is not code print context inside the <Error> lateral and exit, in this case do not analyze time and space or anything else 
    <Error>::selected text is not code</Error> and exit


    2. Otherwise follow the below examples to do analyze the var selected_text and provide the time and \n
    complexity of the code just like below in the same format, please do not explain anything

    Example1:
    CODE: 
        bool linearSearch(int arr[], int n, int key) {
            for (int i = 0; i < n; i++) {
                if (arr[i] == key) {
                    return true;
                }
            }
            return false;
        }
    Time:O(N)|Space:(1)

    Example2:
    CODE: 
        int binarySearch(int arr[], int l, int r, int x)
        {
            if (r >= l) {
                int mid = l + (r - l) / 2;
                if (arr[mid] == x)
                    return mid;
                if (arr[mid] > x)
                    return binarySearch(arr, l, mid - 1, x);
                return binarySearch(arr, mid + 1, r, x);
            }
            return -1;
        }
    Time:O(log N)|Space:(1)

    Example3:
    CODE: 
        void bubbleSort(int arr[], int n)
        {
            for (int i = 0; i < n - 1; i++) {
                for (int j = 0; j < n - i - 1; j++) {
                    if (arr[j] > arr[j + 1]) {
                        swap(&arr[j], &arr[j + 1]);
                    }
                }
            }
        }
    Time:O(N**2)|Space:(1)

    Example4:
    Code:
        void merge(int arr[], int l, int m, int r) {
            int n1 = m - l + 1;
            int n2 = r - m;
            int L[n1], R[n2];
            for (int i = 0; i < n1; i++)
                L[i] = arr[l + i];
            for (int j = 0; j < n2; j++)
                R[j] = arr[m + 1 + j];
            int i = 0, j = 0, k = l;
            while (i < n1 && j < n2) {
                if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    i++;
                } else {
                    arr[k] = R[j];
                    j++;
                }
                k++;
            }
            while (i < n1) {
                arr[k] = L[i];
                i++;
                k++;
            }
            while (j < n2) {
                arr[k] = R[j];
                j++;
                k++;
            }
        }

        void mergeSort(int arr[], int l, int r) {
            if (l >= r)
                return;
            int m = l + (r - l) / 2;
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    
    Time:O(N log(N))|Space:O(N)

    Example 5:
    Code:
        int fibonacci(int n) {
            if (n <= 1)
                return n;
            return fibonacci(n - 1) + fibonacci(n - 2);
        }
    Time:O(2**N)|Space:O(N)

    Example 6:
    Code:
        int tsp(int graph[][4], vector<int> &path, int pos, int n, int count, int cost, int &ans) {
            if (count == n && graph[pos][0]) {
                ans = min(ans, cost + graph[pos][0]);
                return ans;
            }

            for (int i = 0; i < n; i++) {
                if (!path[i] && graph[pos][i]) {
                    path[i] = true;
                    tsp(graph, path, i, n, count + 1, cost + graph[pos][i], ans);
                    path[i] = false;
                }
            }

            return ans;
        }

        int main() {
            int n = 4;
            int graph[][4] = {
                {0, 10, 15, 20},
                {10, 0, 35, 25},
                {15, 35, 0, 30},
                {20, 25, 30, 0}
            };

            vector<int> path(n, 0);
            path[0] = true;
            int ans = INT_MAX;

            cout << tsp(graph, path, 0, n, 1, 0, ans) << endl;

            return 0;
        }
    Time:O(N!)|Space:O(N)

    Here are some tricky cases
    Tricky Example 1:
    Code:
        void trickyLoop(int n) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (i + j == n - 1)
                        break;
                }
            }
        }
    Time:O(N**2)|Space:O(1)

    Tricky Example 2:
    Code:
        int trickyRecursion(int n) {
            if (n <= 1)
                return n;
            return trickyRecursion(n - 1) + trickyRecursion(n - 3);
        }

    Time:O(2**(N/3))|Space:O(N)

    Tricky Example 3:
    Code:
        void decrementIncrementLoop(int n) {
            for (int i = n; i > 0; i /= 2) {
                for (int j = 0; j < i; j++) {
                    // Some operation
                }
            }
        }
    Time:O(N)|Space:O(1)

    Tricky Example 4:
    Code:
        void multipleRecursion(int n) {
            if (n <= 0)
                return;
            if (n % 2 == 0)
                multipleRecursion(n / 2);
            else
                multipleRecursion(n - 1);
        }
    Time:O(log N)|Space:O(log N)

    Tricky Example 5:
    Code:
        void changingStepsLoop(int n) {
            for (int i = 1; i < n; i *= 3) {
                for (int j = 0; j < i; j++) {
                    // Some operation
                }
            }
        }
    Time:O(N)|Space:O(1)

    

    Please generate time snad space complexities as the format mentioned inside the  <output-format> laterals, please do not print any other context

    <output-format>
    Time: O(<time-complexity>)|Space: O(<space-complexity>)
    </output-format>   
    `;
}

// {
//     "result": "<output-format>\nTime: O(N)|Space: O(N)\n</output-format>"
// }

export default createPrompt;
