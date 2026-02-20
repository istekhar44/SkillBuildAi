// 100 Days of Code - DSA Problems (Day 1-100)
// Each day maps to a coding problem with test cases

const dsaProblems = {
    1: {
        title: "Two Sum",
        difficulty: "Easy",
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume each input has exactly one solution.",
        examples: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
        ],
        starterCode: `function twoSum(nums, target) {\n  // Write your code here\n  \n}`,
        testCases: [
            { input: [[2, 7, 11, 15], 9], expected: [0, 1], label: "Basic case" },
            { input: [[3, 2, 4], 6], expected: [1, 2], label: "Middle elements" },
            { input: [[3, 3], 6], expected: [0, 1], label: "Duplicate values" }
        ],
        functionName: "twoSum"
    },
    2: {
        title: "Reverse String",
        difficulty: "Easy",
        description: "Write a function that reverses a string. The input string is given as an array of characters `s`. Modify the array in-place.",
        examples: [
            { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' }
        ],
        starterCode: `function reverseString(s) {\n  // Write your code here\n  \n}`,
        testCases: [
            { input: [["h", "e", "l", "l", "o"]], expected: ["o", "l", "l", "e", "h"], label: "Hello reversed" },
            { input: [["H", "a", "n", "n", "a", "h"]], expected: ["h", "a", "n", "n", "a", "H"], label: "Hannah reversed" }
        ],
        functionName: "reverseString"
    },
    3: {
        title: "Palindrome Number",
        difficulty: "Easy",
        description: "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.",
        examples: [
            { input: "x = 121", output: "true" },
            { input: "x = -121", output: "false" }
        ],
        starterCode: `function isPalindrome(x) {\n  // Write your code here\n  \n}`,
        testCases: [
            { input: [121], expected: true, label: "121 is palindrome" },
            { input: [-121], expected: false, label: "Negative not palindrome" },
            { input: [10], expected: false, label: "10 is not palindrome" }
        ],
        functionName: "isPalindrome"
    },
    4: {
        title: "FizzBuzz",
        difficulty: "Easy",
        description: "Given an integer `n`, return a string array where: for multiples of 3 use 'Fizz', for multiples of 5 use 'Buzz', for both use 'FizzBuzz', otherwise the number.",
        examples: [{ input: "n = 5", output: '["1","2","Fizz","4","Buzz"]' }],
        starterCode: `function fizzBuzz(n) {\n  // Write your code here\n  \n}`,
        testCases: [
            { input: [5], expected: ["1", "2", "Fizz", "4", "Buzz"], label: "n = 5" },
            { input: [3], expected: ["1", "2", "Fizz"], label: "n = 3" },
            { input: [15], expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"], label: "n = 15" }
        ],
        functionName: "fizzBuzz"
    },
    5: {
        title: "Maximum Subarray",
        difficulty: "Medium",
        description: "Given an integer array `nums`, find the subarray with the largest sum and return its sum.",
        examples: [{ input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "Subarray [4,-1,2,1] has the largest sum 6." }],
        starterCode: `function maxSubArray(nums) {\n  // Write your code here\n  \n}`,
        testCases: [
            { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6, label: "Mixed array" },
            { input: [[1]], expected: 1, label: "Single element" },
            { input: [[5, 4, -1, 7, 8]], expected: 23, label: "Mostly positive" }
        ],
        functionName: "maxSubArray"
    },
    6: {
        title: "Valid Parentheses",
        difficulty: "Easy",
        description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        examples: [{ input: 's = "()"', output: "true" }, { input: 's = "(]"', output: "false" }],
        starterCode: `function isValid(s) {\n  // Write your code here\n  \n}`,
        testCases: [
            { input: ["()"], expected: true, label: "Simple valid" },
            { input: ["()[]{}"], expected: true, label: "All types" },
            { input: ["(]"], expected: false, label: "Mismatch" }
        ],
        functionName: "isValid"
    },
    7: {
        title: "Merge Sorted Arrays",
        difficulty: "Easy",
        description: "Given two sorted arrays `nums1` and `nums2`, merge them into a single sorted array and return it.",
        examples: [{ input: "nums1 = [1,2,3], nums2 = [2,5,6]", output: "[1,2,2,3,5,6]" }],
        starterCode: `function mergeSorted(nums1, nums2) {\n  // Write your code here\n  \n}`,
        testCases: [
            { input: [[1, 2, 3], [2, 5, 6]], expected: [1, 2, 2, 3, 5, 6], label: "Basic merge" },
            { input: [[1], []], expected: [1], label: "One empty" },
            { input: [[], []], expected: [], label: "Both empty" }
        ],
        functionName: "mergeSorted"
    },
    8: {
        title: "Remove Duplicates",
        difficulty: "Easy",
        description: "Given a sorted array `nums`, remove duplicates in-place and return the new array with unique elements.",
        examples: [{ input: "nums = [1,1,2]", output: "[1,2]" }],
        starterCode: `function removeDuplicates(nums) {\n  // Write your code here\n  \n}`,
        testCases: [
            { input: [[1, 1, 2]], expected: [1, 2], label: "Simple duplicates" },
            { input: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expected: [0, 1, 2, 3, 4], label: "Many duplicates" }
        ],
        functionName: "removeDuplicates"
    },
    9: {
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        description: "Given array `prices` where `prices[i]` is the stock price on day `i`, return the maximum profit. If no profit is possible, return 0.",
        examples: [{ input: "prices = [7,1,5,3,6,4]", output: "5" }],
        starterCode: `function maxProfit(prices) {\n  // Write your code here\n  \n}`,
        testCases: [
            { input: [[7, 1, 5, 3, 6, 4]], expected: 5, label: "Buy at 1, sell at 6" },
            { input: [[7, 6, 4, 3, 1]], expected: 0, label: "Decreasing prices" }
        ],
        functionName: "maxProfit"
    },
    10: {
        title: "Contains Duplicate",
        difficulty: "Easy",
        description: "Given an integer array `nums`, return `true` if any value appears at least twice, and `false` if every element is distinct.",
        examples: [{ input: "nums = [1,2,3,1]", output: "true" }],
        starterCode: `function containsDuplicate(nums) {\n  // Write your code here\n  \n}`,
        testCases: [
            { input: [[1, 2, 3, 1]], expected: true, label: "Has duplicate" },
            { input: [[1, 2, 3, 4]], expected: false, label: "All unique" }
        ],
        functionName: "containsDuplicate"
    },
    11: { title: "Single Number", difficulty: "Easy", description: "Given a non-empty array where every element appears twice except for one, find that single one.", examples: [{ input: "nums = [2,2,1]", output: "1" }], starterCode: `function singleNumber(nums) {\n  // Write your code here\n  \n}`, testCases: [{ input: [[2, 2, 1]], expected: 1, label: "Basic" }, { input: [[4, 1, 2, 1, 2]], expected: 4, label: "Multiple pairs" }], functionName: "singleNumber" },
    12: { title: "Move Zeroes", difficulty: "Easy", description: "Move all 0's to the end of array while maintaining relative order of non-zero elements. Return the modified array.", examples: [{ input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]" }], starterCode: `function moveZeroes(nums) {\n  // Write your code here\n  \n}`, testCases: [{ input: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0], label: "Mixed" }, { input: [[0]], expected: [0], label: "Single zero" }], functionName: "moveZeroes" },
    13: { title: "Plus One", difficulty: "Easy", description: "Given an array of digits representing a non-negative integer, increment the integer by one and return the result array.", examples: [{ input: "digits = [1,2,3]", output: "[1,2,4]" }], starterCode: `function plusOne(digits) {\n  // Write your code here\n  \n}`, testCases: [{ input: [[1, 2, 3]], expected: [1, 2, 4], label: "No carry" }, { input: [[9, 9]], expected: [1, 0, 0], label: "Carry over" }], functionName: "plusOne" },
    14: { title: "Roman to Integer", difficulty: "Easy", description: "Convert a roman numeral string to an integer. (I=1, V=5, X=10, L=50, C=100, D=500, M=1000)", examples: [{ input: 's = "III"', output: "3" }, { input: 's = "IV"', output: "4" }], starterCode: `function romanToInt(s) {\n  // Write your code here\n  \n}`, testCases: [{ input: ["III"], expected: 3, label: "Three" }, { input: ["IV"], expected: 4, label: "Four" }, { input: ["MCMXCIV"], expected: 1994, label: "1994" }], functionName: "romanToInt" },
    15: { title: "Longest Common Prefix", difficulty: "Easy", description: "Find the longest common prefix string amongst an array of strings. Return '' if none.", examples: [{ input: 'strs = ["flower","flow","flight"]', output: '"fl"' }], starterCode: `function longestCommonPrefix(strs) {\n  // Write your code here\n  \n}`, testCases: [{ input: [["flower", "flow", "flight"]], expected: "fl", label: "Common fl" }, { input: [["dog", "racecar", "car"]], expected: "", label: "No common" }], functionName: "longestCommonPrefix" },
    16: { title: "Valid Anagram", difficulty: "Easy", description: "Given two strings `s` and `t`, return true if `t` is an anagram of `s`.", examples: [{ input: 's = "anagram", t = "nagaram"', output: "true" }], starterCode: `function isAnagram(s, t) {\n  // Write your code here\n  \n}`, testCases: [{ input: ["anagram", "nagaram"], expected: true, label: "Valid anagram" }, { input: ["rat", "car"], expected: false, label: "Not anagram" }], functionName: "isAnagram" },
    17: { title: "Intersection of Two Arrays", difficulty: "Easy", description: "Return an array of the intersection of two arrays (unique elements present in both).", examples: [{ input: "nums1 = [1,2,2,1], nums2 = [2,2]", output: "[2]" }], starterCode: `function intersection(nums1, nums2) {\n  // Write your code here\n  \n}`, testCases: [{ input: [[1, 2, 2, 1], [2, 2]], expected: [2], label: "Single intersect" }, { input: [[4, 9, 5], [9, 4, 9, 8, 4]], expected: [4, 9], label: "Multiple" }], functionName: "intersection" },
    18: { title: "Missing Number", difficulty: "Easy", description: "Given an array containing `n` distinct numbers in range [0, n], find the one missing.", examples: [{ input: "nums = [3,0,1]", output: "2" }], starterCode: `function missingNumber(nums) {\n  // Write your code here\n  \n}`, testCases: [{ input: [[3, 0, 1]], expected: 2, label: "Missing 2" }, { input: [[0, 1]], expected: 2, label: "Missing end" }], functionName: "missingNumber" },
    19: { title: "Climbing Stairs", difficulty: "Easy", description: "You are climbing `n` stairs. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?", examples: [{ input: "n = 3", output: "3" }], starterCode: `function climbStairs(n) {\n  // Write your code here\n  \n}`, testCases: [{ input: [2], expected: 2, label: "2 stairs" }, { input: [3], expected: 3, label: "3 stairs" }, { input: [5], expected: 8, label: "5 stairs" }], functionName: "climbStairs" },
    20: { title: "Power of Two", difficulty: "Easy", description: "Given an integer `n`, return `true` if it is a power of two.", examples: [{ input: "n = 16", output: "true" }], starterCode: `function isPowerOfTwo(n) {\n  // Write your code here\n  \n}`, testCases: [{ input: [1], expected: true, label: "2^0" }, { input: [16], expected: true, label: "2^4" }, { input: [3], expected: false, label: "Not power" }], functionName: "isPowerOfTwo" },
    21: { title: "Reverse Linked List (Array)", difficulty: "Medium", description: "Given an array representing linked list values, reverse it and return.", examples: [{ input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" }], starterCode: `function reverseList(arr) {\n  // Write your code here\n  \n}`, testCases: [{ input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1], label: "Reverse 5" }, { input: [[1, 2]], expected: [2, 1], label: "Reverse 2" }], functionName: "reverseList" },
    22: { title: "Fibonacci Number", difficulty: "Easy", description: "Return the nth Fibonacci number. F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2).", examples: [{ input: "n = 4", output: "3" }], starterCode: `function fib(n) {\n  // Write your code here\n  \n}`, testCases: [{ input: [0], expected: 0, label: "F(0)" }, { input: [4], expected: 3, label: "F(4)" }, { input: [10], expected: 55, label: "F(10)" }], functionName: "fib" },
    23: { title: "Count Primes", difficulty: "Medium", description: "Count the number of prime numbers less than `n`.", examples: [{ input: "n = 10", output: "4" }], starterCode: `function countPrimes(n) {\n  // Write your code here\n  \n}`, testCases: [{ input: [10], expected: 4, label: "Primes < 10" }, { input: [0], expected: 0, label: "Zero" }, { input: [2], expected: 0, label: "Two" }], functionName: "countPrimes" },
    24: { title: "Majority Element", difficulty: "Easy", description: "Find the element that appears more than n/2 times in the array.", examples: [{ input: "nums = [3,2,3]", output: "3" }], starterCode: `function majorityElement(nums) {\n  // Write your code here\n  \n}`, testCases: [{ input: [[3, 2, 3]], expected: 3, label: "Basic" }, { input: [[2, 2, 1, 1, 1, 2, 2]], expected: 2, label: "Longer" }], functionName: "majorityElement" },
    25: { title: "Search Insert Position", difficulty: "Easy", description: "Given a sorted array and a target, return the index if found, or the index where it would be inserted.", examples: [{ input: "nums = [1,3,5,6], target = 5", output: "2" }], starterCode: `function searchInsert(nums, target) {\n  // Write your code here\n  \n}`, testCases: [{ input: [[1, 3, 5, 6], 5], expected: 2, label: "Found" }, { input: [[1, 3, 5, 6], 2], expected: 1, label: "Insert" }, { input: [[1, 3, 5, 6], 7], expected: 4, label: "End" }], functionName: "searchInsert" },
    26: { title: "Product of Array Except Self", difficulty: "Medium", description: "Return an array where each element is the product of all elements except itself, without using division.", examples: [{ input: "nums = [1,2,3,4]", output: "[24,12,8,6]" }], starterCode: `function productExceptSelf(nums) {\n  // Write your code here\n  \n}`, testCases: [{ input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6], label: "Basic" }, { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0], label: "With zero" }], functionName: "productExceptSelf" },
    27: { title: "Rotate Array", difficulty: "Medium", description: "Rotate array to the right by `k` steps and return it.", examples: [{ input: "nums = [1,2,3,4,5,6,7], k = 3", output: "[5,6,7,1,2,3,4]" }], starterCode: `function rotate(nums, k) {\n  // Write your code here\n  \n}`, testCases: [{ input: [[1, 2, 3, 4, 5, 6, 7], 3], expected: [5, 6, 7, 1, 2, 3, 4], label: "Rotate 3" }, { input: [[-1, -100, 3, 99], 2], expected: [3, 99, -1, -100], label: "Rotate 2" }], functionName: "rotate" },
    28: { title: "Find Peak Element", difficulty: "Medium", description: "Find a peak element (strictly greater than neighbors) and return its index. Array may have multiple peaks; return any.", examples: [{ input: "nums = [1,2,3,1]", output: "2" }], starterCode: `function findPeakElement(nums) {\n  // Write your code here\n  \n}`, testCases: [{ input: [[1, 2, 3, 1]], expected: 2, label: "Single peak" }, { input: [[1]], expected: 0, label: "One element" }], functionName: "findPeakElement" },
    29: { title: "First Unique Character", difficulty: "Easy", description: "Find the first non-repeating character in a string and return its index. Return -1 if none.", examples: [{ input: 's = "leetcode"', output: "0" }], starterCode: `function firstUniqChar(s) {\n  // Write your code here\n  \n}`, testCases: [{ input: ["leetcode"], expected: 0, label: "First char" }, { input: ["aabb"], expected: -1, label: "None unique" }], functionName: "firstUniqChar" },
    30: { title: "Group Anagrams", difficulty: "Medium", description: "Group an array of strings into anagram groups.", examples: [{ input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["eat","tea","ate"],["tan","nat"],["bat"]]' }], starterCode: `function groupAnagrams(strs) {\n  // Write your code here\n  \n}`, testCases: [{ input: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]], label: "Basic grouping" }, { input: [[""]], expected: [[""]], label: "Empty string" }], functionName: "groupAnagrams" },
};

// Generate remaining days (31-100) with progressive DSA problems
const additionalProblems = [
    { title: "Matrix Diagonal Sum", difficulty: "Easy", fn: "diagonalSum", desc: "Return the sum of the primary and secondary diagonal elements of a square matrix.", starter: `function diagonalSum(mat) {\n  // Write your code here\n}`, tc: [{ input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: 25, label: "3x3 matrix" }] },
    { title: "Spiral Matrix Print", difficulty: "Medium", fn: "spiralOrder", desc: "Return all elements of a matrix in spiral order.", starter: `function spiralOrder(matrix) {\n  // Write your code here\n}`, tc: [{ input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [1, 2, 3, 6, 9, 8, 7, 4, 5], label: "3x3 spiral" }] },
    { title: "Set Matrix Zeroes", difficulty: "Medium", fn: "setZeroes", desc: "If an element is 0, set its entire row and column to 0. Return modified matrix.", starter: `function setZeroes(matrix) {\n  // Write your code here\n}`, tc: [{ input: [[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], expected: [[1, 0, 1], [0, 0, 0], [1, 0, 1]], label: "Center zero" }] },
    { title: "String Compression", difficulty: "Medium", fn: "compress", desc: "Compress string: 'aabcccccaaa' → 'a2b1c5a3'. Return original if compressed isn't shorter.", starter: `function compress(s) {\n  // Write your code here\n}`, tc: [{ input: ["aabcccccaaa"], expected: "a2b1c5a3", label: "Basic" }] },
    { title: "Reverse Words", difficulty: "Medium", fn: "reverseWords", desc: "Reverse the order of words in a string.", starter: `function reverseWords(s) {\n  // Write your code here\n}`, tc: [{ input: ["the sky is blue"], expected: "blue is sky the", label: "Basic" }] },
    { title: "Max Consecutive Ones", difficulty: "Easy", fn: "findMaxConsecutiveOnes", desc: "Find max consecutive 1s in a binary array.", starter: `function findMaxConsecutiveOnes(nums) {\n  // Write your code here\n}`, tc: [{ input: [[1, 1, 0, 1, 1, 1]], expected: 3, label: "Basic" }] },
    { title: "Intersection of Arrays II", difficulty: "Easy", fn: "intersect", desc: "Return intersection of two arrays including duplicates.", starter: `function intersect(n1, n2) {\n  // Write your code here\n}`, tc: [{ input: [[1, 2, 2, 1], [2, 2]], expected: [2, 2], label: "With dupes" }] },
    { title: "Sort Colors", difficulty: "Medium", fn: "sortColors", desc: "Sort array containing only 0, 1, 2 in-place (Dutch flag).", starter: `function sortColors(nums) {\n  // Write your code here\n}`, tc: [{ input: [[2, 0, 2, 1, 1, 0]], expected: [0, 0, 1, 1, 2, 2], label: "Basic" }] },
    { title: "Three Sum Equals Zero", difficulty: "Medium", fn: "threeSum", desc: "Find all unique triplets that sum to zero.", starter: `function threeSum(nums) {\n  // Write your code here\n}`, tc: [{ input: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]], label: "Basic" }] },
    { title: "Container With Most Water", difficulty: "Medium", fn: "maxArea", desc: "Find two lines that form a container holding the most water.", starter: `function maxArea(height) {\n  // Write your code here\n}`, tc: [{ input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49, label: "Basic" }] },
    { title: "Trapping Rain Water", difficulty: "Hard", fn: "trap", desc: "Compute how much water can be trapped after raining.", starter: `function trap(height) {\n  // Write your code here\n}`, tc: [{ input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6, label: "Basic" }] },
    { title: "Longest Substring No Repeat", difficulty: "Medium", fn: "lengthOfLongestSubstring", desc: "Find length of the longest substring without repeating characters.", starter: `function lengthOfLongestSubstring(s) {\n  // Write your code here\n}`, tc: [{ input: ["abcabcbb"], expected: 3, label: "abc" }, { input: ["bbbbb"], expected: 1, label: "All same" }] },
    { title: "Valid Palindrome", difficulty: "Easy", fn: "isPalindromeStr", desc: "Check if a string is a palindrome considering only alphanumeric characters (case insensitive).", starter: `function isPalindromeStr(s) {\n  // Write your code here\n}`, tc: [{ input: ["A man, a plan, a canal: Panama"], expected: true, label: "Classic" }] },
    { title: "Implement strStr", difficulty: "Easy", fn: "strStr", desc: "Return index of first occurrence of needle in haystack, or -1.", starter: `function strStr(haystack, needle) {\n  // Write your code here\n}`, tc: [{ input: ["sadbutsad", "sad"], expected: 0, label: "Start" }, { input: ["hello", "ll"], expected: 2, label: "Middle" }] },
    { title: "Pow(x, n)", difficulty: "Medium", fn: "myPow", desc: "Implement pow(x, n) which calculates x raised to the power n.", starter: `function myPow(x, n) {\n  // Write your code here\n}`, tc: [{ input: [2, 10], expected: 1024, label: "2^10" }, { input: [2, -2], expected: 0.25, label: "Negative exp" }] },
    { title: "Sqrt(x)", difficulty: "Easy", fn: "mySqrt", desc: "Compute floor of square root of x.", starter: `function mySqrt(x) {\n  // Write your code here\n}`, tc: [{ input: [4], expected: 2, label: "Perfect" }, { input: [8], expected: 2, label: "Floor" }] },
    { title: "Merge Intervals", difficulty: "Medium", fn: "mergeIntervals", desc: "Merge overlapping intervals.", starter: `function mergeIntervals(intervals) {\n  // Write your code here\n}`, tc: [{ input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]], label: "Overlap" }] },
    { title: "Letter Combinations of Phone", difficulty: "Medium", fn: "letterCombinations", desc: "Return all letter combinations a phone number digits could represent.", starter: `function letterCombinations(digits) {\n  // Write your code here\n}`, tc: [{ input: ["23"], expected: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"], label: "2-3" }] },
    { title: "Generate Parentheses", difficulty: "Medium", fn: "generateParenthesis", desc: "Generate all valid combinations of n pairs of parentheses.", starter: `function generateParenthesis(n) {\n  // Write your code here\n}`, tc: [{ input: [3], expected: ["((()))", "(()())", "(())()", "()(())", "()()()"], label: "n=3" }] },
    { title: "Subsets", difficulty: "Medium", fn: "subsets", desc: "Return all possible subsets of an integer array (power set).", starter: `function subsets(nums) {\n  // Write your code here\n}`, tc: [{ input: [[1, 2, 3]], expected: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]], label: "3 elements" }] },
    { title: "Permutations", difficulty: "Medium", fn: "permute", desc: "Return all permutations of an array of distinct integers.", starter: `function permute(nums) {\n  // Write your code here\n}`, tc: [{ input: [[1, 2, 3]], expected: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]], label: "3 elements" }] },
    { title: "Combination Sum", difficulty: "Medium", fn: "combinationSum", desc: "Find all unique combinations that sum to target. Numbers can be reused.", starter: `function combinationSum(candidates, target) {\n  // Write your code here\n}`, tc: [{ input: [[2, 3, 6, 7], 7], expected: [[2, 2, 3], [7]], label: "Target 7" }] },
    { title: "Word Search", difficulty: "Medium", fn: "exist", desc: "Return true if a word exists in the grid by adjacent cells.", starter: `function exist(board, word) {\n  // Write your code here\n}`, tc: [{ input: [[["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED"], expected: true, label: "Exists" }] },
    { title: "Jump Game", difficulty: "Medium", fn: "canJump", desc: "Determine if you can reach the last index. Each element is max jump length.", starter: `function canJump(nums) {\n  // Write your code here\n}`, tc: [{ input: [[2, 3, 1, 1, 4]], expected: true, label: "Can reach" }, { input: [[3, 2, 1, 0, 4]], expected: false, label: "Stuck" }] },
    { title: "Unique Paths", difficulty: "Medium", fn: "uniquePaths", desc: "Find number of unique paths from top-left to bottom-right of m×n grid.", starter: `function uniquePaths(m, n) {\n  // Write your code here\n}`, tc: [{ input: [3, 7], expected: 28, label: "3x7" }, { input: [3, 2], expected: 3, label: "3x2" }] },
    { title: "Min Path Sum", difficulty: "Medium", fn: "minPathSum", desc: "Find path from top-left to bottom-right with minimum sum.", starter: `function minPathSum(grid) {\n  // Write your code here\n}`, tc: [{ input: [[[1, 3, 1], [1, 5, 1], [4, 2, 1]]], expected: 7, label: "3x3" }] },
    { title: "Decode Ways", difficulty: "Medium", fn: "numDecodings", desc: "Count ways to decode a digit string where A=1, B=2, ..., Z=26.", starter: `function numDecodings(s) {\n  // Write your code here\n}`, tc: [{ input: ["12"], expected: 2, label: "AB or L" }, { input: ["226"], expected: 3, label: "Three ways" }] },
    { title: "House Robber", difficulty: "Medium", fn: "rob", desc: "Max money you can rob from non-adjacent houses.", starter: `function rob(nums) {\n  // Write your code here\n}`, tc: [{ input: [[1, 2, 3, 1]], expected: 4, label: "Basic" }, { input: [[2, 7, 9, 3, 1]], expected: 12, label: "Longer" }] },
    { title: "Coin Change", difficulty: "Medium", fn: "coinChange", desc: "Fewest coins needed to make amount. Return -1 if impossible.", starter: `function coinChange(coins, amount) {\n  // Write your code here\n}`, tc: [{ input: [[1, 5, 10, 25], 30], expected: 2, label: "Two coins" }, { input: [[2], 3], expected: -1, label: "Impossible" }] },
    { title: "Longest Increasing Subsequence", difficulty: "Medium", fn: "lengthOfLIS", desc: "Find the length of the longest strictly increasing subsequence.", starter: `function lengthOfLIS(nums) {\n  // Write your code here\n}`, tc: [{ input: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4, label: "Basic" }] },
    { title: "Maximum Product Subarray", difficulty: "Medium", fn: "maxProduct", desc: "Find the contiguous subarray with the largest product.", starter: `function maxProduct(nums) {\n  // Write your code here\n}`, tc: [{ input: [[2, 3, -2, 4]], expected: 6, label: "Basic" }, { input: [[-2, 0, -1]], expected: 0, label: "With zero" }] },
    { title: "Partition Equal Subset Sum", difficulty: "Medium", fn: "canPartition", desc: "Can the array be partitioned into two subsets with equal sum?", starter: `function canPartition(nums) {\n  // Write your code here\n}`, tc: [{ input: [[1, 5, 11, 5]], expected: true, label: "Can partition" }, { input: [[1, 2, 3, 5]], expected: false, label: "Cannot" }] },
    { title: "Valid Sudoku", difficulty: "Medium", fn: "isValidSudoku", desc: "Determine if a 9x9 Sudoku board is valid (rows, cols, boxes have no repeats).", starter: `function isValidSudoku(board) {\n  // Write your code here\n}`, tc: [{ input: [[["5", "3", ".", ".", "7", ".", ".", ".", "."], ["6", ".", ".", "1", "9", "5", ".", ".", "."], [".", "9", "8", ".", ".", ".", ".", "6", "."], ["8", ".", ".", ".", "6", ".", ".", ".", "3"], ["4", ".", ".", "8", ".", "3", ".", ".", "1"], ["7", ".", ".", ".", "2", ".", ".", ".", "6"], [".", "6", ".", ".", ".", ".", "2", "8", "."], [".", ".", ".", "4", "1", "9", ".", ".", "5"], [".", ".", ".", ".", "8", ".", ".", "7", "9"]]], expected: true, label: "Valid board" }] },
    { title: "Kth Largest Element", difficulty: "Medium", fn: "findKthLargest", desc: "Find the kth largest element in an unsorted array.", starter: `function findKthLargest(nums, k) {\n  // Write your code here\n}`, tc: [{ input: [[3, 2, 1, 5, 6, 4], 2], expected: 5, label: "2nd largest" }] },
    { title: "Top K Frequent Elements", difficulty: "Medium", fn: "topKFrequent", desc: "Return the k most frequent elements.", starter: `function topKFrequent(nums, k) {\n  // Write your code here\n}`, tc: [{ input: [[1, 1, 1, 2, 2, 3], 2], expected: [1, 2], label: "Top 2" }] },
    { title: "Sort Array by Parity", difficulty: "Easy", fn: "sortByParity", desc: "Move all even numbers before odd numbers.", starter: `function sortByParity(nums) {\n  // Write your code here\n}`, tc: [{ input: [[3, 1, 2, 4]], expected: [2, 4, 3, 1], label: "Even first" }] },
    { title: "Find All Duplicates", difficulty: "Medium", fn: "findDuplicates", desc: "Find all elements that appear twice in array of [1,n].", starter: `function findDuplicates(nums) {\n  // Write your code here\n}`, tc: [{ input: [[4, 3, 2, 7, 8, 2, 3, 1]], expected: [2, 3], label: "Two dupes" }] },
    { title: "Flatten Nested Array", difficulty: "Medium", fn: "flatten", desc: "Flatten a nested array to a single-level array.", starter: `function flatten(arr) {\n  // Write your code here\n}`, tc: [{ input: [[[1, [2, [3, [4]], 5]]]], expected: [1, 2, 3, 4, 5], label: "Deep nested" }] },
    { title: "Implement Queue using Stacks", difficulty: "Easy", fn: "createQueue", desc: "Return [enqueue, dequeue, peek] functions using only arrays with push/pop.", starter: `function createQueue() {\n  // Return { enqueue, dequeue, peek }\n}`, tc: [{ input: [], expected: true, label: "Queue ops" }] },
    { title: "Min Stack", difficulty: "Medium", fn: "createMinStack", desc: "Design a stack that supports push, pop, and retrieving the minimum element in O(1).", starter: `function createMinStack() {\n  // Return { push, pop, getMin }\n}`, tc: [{ input: [], expected: true, label: "MinStack ops" }] },
    { title: "Binary Search", difficulty: "Easy", fn: "binarySearch", desc: "Implement binary search. Return index of target or -1.", starter: `function binarySearch(nums, target) {\n  // Write your code here\n}`, tc: [{ input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4, label: "Found" }, { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1, label: "Not found" }] },
    { title: "Search in Rotated Array", difficulty: "Medium", fn: "searchRotated", desc: "Search target in a rotated sorted array. Return index or -1.", starter: `function searchRotated(nums, target) {\n  // Write your code here\n}`, tc: [{ input: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4, label: "Found" }] },
    { title: "Find Min in Rotated Array", difficulty: "Medium", fn: "findMin", desc: "Find the minimum element in a rotated sorted array.", starter: `function findMin(nums) {\n  // Write your code here\n}`, tc: [{ input: [[3, 4, 5, 1, 2]], expected: 1, label: "Min is 1" }] },
    { title: "Level Order Traversal", difficulty: "Medium", fn: "levelOrder", desc: "Given a binary tree as array, return level-order traversal as 2D array.", starter: `function levelOrder(tree) {\n  // Write your code here\n}`, tc: [{ input: [[3, 9, 20, null, null, 15, 7]], expected: [[3], [9, 20], [15, 7]], label: "3 levels" }] },
    { title: "Max Depth of Binary Tree", difficulty: "Easy", fn: "maxDepth", desc: "Given a binary tree as array, return its maximum depth.", starter: `function maxDepth(tree) {\n  // Write your code here\n}`, tc: [{ input: [[3, 9, 20, null, null, 15, 7]], expected: 3, label: "Depth 3" }] },
    { title: "Symmetric Tree", difficulty: "Easy", fn: "isSymmetric", desc: "Check if a binary tree (given as array) is a mirror of itself.", starter: `function isSymmetric(tree) {\n  // Write your code here\n}`, tc: [{ input: [[1, 2, 2, 3, 4, 4, 3]], expected: true, label: "Symmetric" }] },
    { title: "Invert Binary Tree", difficulty: "Easy", fn: "invertTree", desc: "Invert a binary tree given as array (swap left and right children).", starter: `function invertTree(tree) {\n  // Write your code here\n}`, tc: [{ input: [[4, 2, 7, 1, 3, 6, 9]], expected: [4, 7, 2, 9, 6, 3, 1], label: "Basic" }] },
    { title: "Path Sum", difficulty: "Easy", fn: "hasPathSum", desc: "Check if binary tree (array) has root-to-leaf path summing to target.", starter: `function hasPathSum(tree, target) {\n  // Write your code here\n}`, tc: [{ input: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], 22], expected: true, label: "Path exists" }] },
    { title: "Number of Islands", difficulty: "Medium", fn: "numIslands", desc: "Count the number of islands in a 2D grid ('1' is land, '0' is water).", starter: `function numIslands(grid) {\n  // Write your code here\n}`, tc: [{ input: [[["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]]], expected: 3, label: "3 islands" }] },
    { title: "Course Schedule", difficulty: "Medium", fn: "canFinish", desc: "Given numCourses and prerequisites, determine if you can finish all courses.", starter: `function canFinish(numCourses, prerequisites) {\n  // Write your code here\n}`, tc: [{ input: [2, [[1, 0]]], expected: true, label: "Can finish" }, { input: [2, [[1, 0], [0, 1]]], expected: false, label: "Cycle" }] },
    { title: "Longest Palindromic Substring", difficulty: "Medium", fn: "longestPalindrome", desc: "Return the longest palindromic substring.", starter: `function longestPalindrome(s) {\n  // Write your code here\n}`, tc: [{ input: ["babad"], expected: "bab", label: "Basic" }] },
    { title: "Zigzag Conversion", difficulty: "Medium", fn: "convert", desc: "Convert string to zigzag pattern with numRows rows, then read line by line.", starter: `function convert(s, numRows) {\n  // Write your code here\n}`, tc: [{ input: ["PAYPALISHIRING", 3], expected: "PAHNAPLSIIGYIR", label: "3 rows" }] },
    { title: "Integer to Roman", difficulty: "Medium", fn: "intToRoman", desc: "Convert integer to Roman numeral string.", starter: `function intToRoman(num) {\n  // Write your code here\n}`, tc: [{ input: [3749], expected: "MMMDCCXLIX", label: "3749" }, { input: [58], expected: "LVIII", label: "58" }] },
    { title: "Spiral Matrix II", difficulty: "Medium", fn: "generateMatrix", desc: "Generate an n×n matrix filled with elements from 1 to n² in spiral order.", starter: `function generateMatrix(n) {\n  // Write your code here\n}`, tc: [{ input: [3], expected: [[1, 2, 3], [8, 9, 4], [7, 6, 5]], label: "3x3" }] },
    { title: "Minimum Window Substring", difficulty: "Hard", fn: "minWindow", desc: "Find the minimum window in s which contains all characters of t.", starter: `function minWindow(s, t) {\n  // Write your code here\n}`, tc: [{ input: ["ADOBECODEBANC", "ABC"], expected: "BANC", label: "Basic" }] },
    { title: "Median of Two Sorted Arrays", difficulty: "Hard", fn: "findMedianSortedArrays", desc: "Find the median of two sorted arrays.", starter: `function findMedianSortedArrays(nums1, nums2) {\n  // Write your code here\n}`, tc: [{ input: [[1, 3], [2]], expected: 2.0, label: "Odd total" }, { input: [[1, 2], [3, 4]], expected: 2.5, label: "Even total" }] },
    { title: "Edit Distance", difficulty: "Hard", fn: "minDistance", desc: "Find the minimum edit distance (insert/delete/replace) between two strings.", starter: `function minDistance(word1, word2) {\n  // Write your code here\n}`, tc: [{ input: ["horse", "ros"], expected: 3, label: "horse→ros" }] },
    { title: "Longest Valid Parentheses", difficulty: "Hard", fn: "longestValidParentheses", desc: "Find the length of the longest valid parentheses substring.", starter: `function longestValidParentheses(s) {\n  // Write your code here\n}`, tc: [{ input: ["(()"], expected: 2, label: "Basic" }, { input: [")()())"], expected: 4, label: "Middle" }] },
    { title: "Regular Expression Matching", difficulty: "Hard", fn: "isMatch", desc: "Implement regex matching with '.' (any char) and '*' (zero or more of preceding).", starter: `function isMatch(s, p) {\n  // Write your code here\n}`, tc: [{ input: ["aa", "a"], expected: false, label: "No match" }, { input: ["aa", "a*"], expected: true, label: "Star match" }] },
    { title: "Serialize and Deserialize Tree", difficulty: "Hard", fn: "serialize", desc: "Serialize array tree to string, then deserialize back. Return the serialized string.", starter: `function serialize(tree) {\n  // Write your code here\n}`, tc: [{ input: [[1, 2, 3, null, null, 4, 5]], expected: "1,2,3,null,null,4,5", label: "Basic" }] },
    { title: "LRU Cache Design", difficulty: "Hard", fn: "createLRU", desc: "Design an LRU cache with get and put operations. Return { get, put } object.", starter: `function createLRU(capacity) {\n  // Write your code here\n}`, tc: [{ input: [2], expected: true, label: "LRU ops" }] },
    { title: "Implement Trie", difficulty: "Medium", fn: "createTrie", desc: "Implement a trie with insert, search, and startsWith operations.", starter: `function createTrie() {\n  // Return { insert, search, startsWith }\n}`, tc: [{ input: [], expected: true, label: "Trie ops" }] },
    { title: "Word Break", difficulty: "Medium", fn: "wordBreak", desc: "Can string s be segmented into space-separated dictionary words?", starter: `function wordBreak(s, wordDict) {\n  // Write your code here\n}`, tc: [{ input: ["leetcode", ["leet", "code"]], expected: true, label: "Can break" }, { input: ["catsandog", ["cats", "dog", "sand", "and", "cat"]], expected: false, label: "Cannot" }] },
    { title: "Maximum Sliding Window", difficulty: "Hard", fn: "maxSlidingWindow", desc: "Return the max value in each sliding window of size k.", starter: `function maxSlidingWindow(nums, k) {\n  // Write your code here\n}`, tc: [{ input: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expected: [3, 3, 5, 5, 6, 7], label: "k=3" }] },
    { title: "Task Scheduler", difficulty: "Medium", fn: "leastInterval", desc: "Find minimum intervals to execute all tasks with cooldown n.", starter: `function leastInterval(tasks, n) {\n  // Write your code here\n}`, tc: [{ input: [["A", "A", "A", "B", "B", "B"], 2], expected: 8, label: "n=2" }] },
    { title: "Daily Temperatures", difficulty: "Medium", fn: "dailyTemperatures", desc: "For each day, find how many days until a warmer temperature. 0 if never.", starter: `function dailyTemperatures(temps) {\n  // Write your code here\n}`, tc: [{ input: [[73, 74, 75, 71, 69, 72, 76, 73]], expected: [1, 1, 4, 2, 1, 1, 0, 0], label: "Basic" }] },
    { title: "Asteroid Collision", difficulty: "Medium", fn: "asteroidCollision", desc: "Simulate asteroid collisions. Positive = right, negative = left.", starter: `function asteroidCollision(asteroids) {\n  // Write your code here\n}`, tc: [{ input: [[5, 10, -5]], expected: [5, 10], label: "Basic" }] },
    { title: "Decode String", difficulty: "Medium", fn: "decodeString", desc: "Decode encoded string like '3[a2[c]]' → 'accaccacc'.", starter: `function decodeString(s) {\n  // Write your code here\n}`, tc: [{ input: ["3[a]2[bc]"], expected: "aaabcbc", label: "Basic" }, { input: ["3[a2[c]]"], expected: "accaccacc", label: "Nested" }] },
    { title: "Next Greater Element", difficulty: "Easy", fn: "nextGreaterElement", desc: "For each element in nums1 (subset of nums2), find the next greater element in nums2.", starter: `function nextGreaterElement(nums1, nums2) {\n  // Write your code here\n}`, tc: [{ input: [[4, 1, 2], [1, 3, 4, 2]], expected: [-1, 3, -1], label: "Basic" }] },
    { title: "Stock Span Problem", difficulty: "Medium", fn: "stockSpan", desc: "Calculate the span of stock prices for each day.", starter: `function stockSpan(prices) {\n  // Write your code here\n}`, tc: [{ input: [[100, 80, 60, 70, 60, 75, 85]], expected: [1, 1, 1, 2, 1, 4, 6], label: "Basic" }] },
    { title: "Largest Rectangle in Histogram", difficulty: "Hard", fn: "largestRectangle", desc: "Find the area of the largest rectangle in histogram.", starter: `function largestRectangle(heights) {\n  // Write your code here\n}`, tc: [{ input: [[2, 1, 5, 6, 2, 3]], expected: 10, label: "Basic" }] },
];

// Map additional problems to days 31-100
additionalProblems.forEach((p, idx) => {
    const day = 31 + idx;
    if (day <= 100) {
        dsaProblems[day] = {
            title: p.title,
            difficulty: p.difficulty,
            description: p.desc,
            examples: [{ input: `See test cases`, output: `Expected output` }],
            starterCode: p.starter,
            testCases: p.tc,
            functionName: p.fn
        };
    }
});

export default dsaProblems;
