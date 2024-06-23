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
        bool findElement(int arr[], int n, int key)
        {
            for (int i = 0; i < n; i++) {
                if (arr[i] == key) {
                    return true;
                }
            }
            return false;
        }
    Time:O(N)|Space:(N)

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
    Time:O(log(N))|Space:(N)

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
    Time:O(N**2)|Space:(N)

    Example4:
        void iterateLoop(){
        for (int i = 1; i < n; i++) {
            i *= k;
        }
        }
    
    Time:O(log(N) base K)|Space:(1)

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
