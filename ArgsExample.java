class ArgsExample {
    public static int sum(int... nums) {
        int res = 0;
        for (int num : nums)
            res += num;
        return res;
    }

    public static void main(String[] args) {
        System.out.println(12);
        System.out.println(ArgsExample.sum(1, 2, 3, 4, 5, 5));
    }
}